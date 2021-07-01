#!/usr/bin/env node
import * as lambda from '@aws-cdk/aws-lambda';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as core from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import cloudfront = require('@aws-cdk/aws-cloudfront');
import route53 = require('@aws-cdk/aws-route53');
import s3 = require('@aws-cdk/aws-s3');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import acm = require('@aws-cdk/aws-certificatemanager');
import cdk = require('@aws-cdk/core');
import targets = require('@aws-cdk/aws-route53-targets/lib');

export interface StaticSiteProps {
  domainName: string;
  siteSubDomain: string;
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class MyStaticWebsite extends Construct {
  constructor(parent: Construct, name: string, props: StaticSiteProps) {
    super(parent, name);

    const zone = route53.HostedZone.fromLookup(this as any, 'Zone', { domainName: props.domainName });
    const siteDomain = props.siteSubDomain + '.' + props.domainName;
    new cdk.CfnOutput(this, 'Site', { value: 'https://' + siteDomain });

    // Content bucket
    const siteBucket = new s3.Bucket(this as any, 'SiteBucket', {
      bucketName: `${siteDomain}-website`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
      // the new bucket, and it will remain in your account until manually deleted. By setting the policy to
      // DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });
    new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

    const oai = new cloudfront.OriginAccessIdentity(this as any, 'OriginAccessIdentity', {
        comment: `${siteDomain}-OAI`,
    });
    
    siteBucket.grantRead(oai);

    // TLS certificate
    const certificate = new acm.DnsValidatedCertificate(this as any, 'SiteCertificate', {
      domainName: siteDomain,
      hostedZone: zone,
      region: 'us-east-1', // Cloudfront only checks this region for certificates.
    });
    new cdk.CfnOutput(this, 'Certificate', { value: certificate.certificateArn });

    // CloudFront distribution that provides HTTPS

    const authLambda = new lambda.Function(this as any, 'AuthHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("resources/lambda/"+process.env.AAD_SSO__RESULT_NAME+".zip"),
      handler: "index.handler",
      role: new iam.Role(this as any, 'AllowLambdaServiceToAssumeRole', {
        assumedBy: new iam.CompositePrincipal(
          new iam.ServicePrincipal('lambda.amazonaws.com'),
          new iam.ServicePrincipal('edgelambda.amazonaws.com'),
        ),
        managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')]
      }),
    });

    // S3 Redirection lambda policy

    let s3RedirectLambdaPolicy = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [
            "arn:aws:logs:*:*:*",
          ],
          actions: [
            "logs:CreateLogStream",
            "logs:PutLogEvents",
            "logs:CreateLogGroup"
          ]
    })
    let roleName = props.siteSubDomain + "S3Redirect"
    let s3RedirectLambdaRole = new iam.Role(this, roleName, { assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")} )
    s3RedirectLambdaRole.addToPolicy(s3RedirectLambdaPolicy)

    // Deploy Lambda to perform redirections

    const s3RedirectLambda = new lambda.Function(this as any, 'RedirectHandler', { 
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("resources/lambda/redirectLambda.zip"),
        handler: "index.handler",
        role: s3RedirectLambdaRole,
        memorySize: 512,
        timeout: cdk.Duration.seconds(30)

    });

    const s3LambdaVersion = new lambda.Version(this as any, 'RedirectHandler', { 
        lambda: s3RedirectLambda
    })

    

    // const version = authLambda.addVersion(':sha256:' + sha256('./resources/lambda/auth.js'));

    new core.CfnOutput(this, 'MyStaticSiteAuth', {
      value: core.Fn.join(':', [
        authLambda.currentVersion.edgeArn,
        // version.version,
      ])
    });

    new core.CfnOutput(this, 'MyRedirector', {
        value: core.Fn.join(':', [
            s3RedirectLambda.currentVersion.edgeArn
        ])
      });
    

    const distribution = new cloudfront.Distribution(this as any, 'SiteDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(siteBucket, { originAccessIdentity: oai }),
        edgeLambdas: [
            {
                functionVersion: authLambda.currentVersion,
                eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            }
        
        ],
        lambdaFunctionAssociations: [{
            eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
            lambdaFunction: s3LambdaVersion,

        }]
      },
        certificate,
        domainNames: [siteDomain],
        defaultRootObject: 'index.html',
    });
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this as any, 'SiteAliasRecord', {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone
    });

    
    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this as any, 'DeployWithInvalidation', {
      sources: [ s3deploy.Source.asset('tmp/build') ],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    } );
  }
}
