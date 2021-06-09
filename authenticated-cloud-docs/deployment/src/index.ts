import * as cdk from '@aws-cdk/core';
import { MyStaticWebsite } from './lib/s3/myStaticWebsite';
import { Tags } from '@aws-cdk/core';
import * as fs from 'fs';


export class MyStaticWebsiteStack extends cdk.Stack {
  public distributionId:string;

  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    Tags.of(this).add('service', 'auth-docs-test');
    Tags.of(this).add('name', 'auth-docs-test-website');
    Tags.of(this).add('product-owner', 'rob.chandhok@dmgt.com');

    let publishedDomainName = `${process.env.AUTHENTICATED_CLOUD_DOCS__HOSTED_ZONE_SUBDOMAIN}.${this.node.tryGetContext('domain')}`
    fs.writeFileSync('published_domain_name.txt', publishedDomainName)

    new MyStaticWebsite(this, id, {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: `${process.env.AUTHENTICATED_CLOUD_DOCS__HOSTED_ZONE_SUBDOMAIN}`,
    });

    new cdk.CfnOutput(this, "DistributionId", {
      description: "DistributionId of this stack",
      value: this.distributionId
    });


    console.log('deployed_cloudfront_distribution_id = '+ this.distributionId)
    fs.writeFileSync('deployed_cloudfront_distribution_id.txt', this.distributionId)
  }
}

const app = new cdk.App();
new MyStaticWebsiteStack(app, process.env.AUTHENTICATED_CLOUD_DOCS__HOSTED_ZONE_SUBDOMAIN+'-dev', { env: { region: 'us-east-1', account: process.env.AUTHENTICATED_CLOUD_DOCS__HOSTED_ZONE_AWS_ACCOUNT_ID } });
