import * as cdk from '@aws-cdk/core';
import { MyStaticWebsite } from './lib/s3/myStaticWebsite';
import { Tags } from '@aws-cdk/core';

export class MyStaticWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps, env: string) {
    super(scope, id, props);

    Tags.of(this).add('service', 'auth-docs-test');
    Tags.of(this).add('name', 'auth-docs-test-website');
    Tags.of(this).add('environment', env);
    Tags.of(this).add('product-owner', 'rob.chandhok@dmgt.com');

    new MyStaticWebsite(this, id, {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: `${env}.authdocstest`,
    });
  }
}

const app = new cdk.App();
new MyStaticWebsiteStack(app, 'authdocstest-dev', { env: { region: 'us-east-1', account: '787198526106' } }, 'dev');
