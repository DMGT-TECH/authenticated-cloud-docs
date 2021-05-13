import * as cdk from '@aws-cdk/core';
import { MyStaticWebsite } from './lib/s3/myStaticWebsite';
import { Tags } from '@aws-cdk/core';
import * as fs from 'fs';


export class MyStaticWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps, env: string) {
    super(scope, id, props);

    Tags.of(this).add('service', 'auth-docs-test');
    Tags.of(this).add('name', 'auth-docs-test-website');
    Tags.of(this).add('environment', env);
    Tags.of(this).add('product-owner', 'rob.chandhok@dmgt.com');

    let publishedDomainName = `${env}.${process.env.AUTHENTICATED_CLOUD_DOCS__HOSTED_ZONE_SUBDOMAIN}.${this.node.tryGetContext('domain')}`
    fs.writeFileSync('published_domain_name.txt', publishedDomainName)

    new MyStaticWebsite(this, id, {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: `${env}.${process.env.AUTHENTICATED_CLOUD_DOCS__HOSTED_ZONE_SUBDOMAIN}`,
    });
  }
}

const app = new cdk.App();
new MyStaticWebsiteStack(app, 'authdocstest-dev', { env: { region: 'us-east-1', account: '787198526106' } }, 'dev');
