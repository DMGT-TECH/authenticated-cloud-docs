import * as cdk from '@aws-cdk/core';
import { MyStaticWebSite } from './lib/s3/myStaticWebsite';
import { Tags } from '@aws-cdk/core';

export class MyStaticSiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps, env: string) {
    super(scope, id, props);

    Tags.of(this).add('service', 'authed-docs-test');
    Tags.of(this).add('name', 'authed-docs-test-website');
    Tags.of(this).add('environment', env);
    Tags.of(this).add('product-owner', 'rob.chandhok@dmgt.com');

    new MyStaticWebSite(this, id, {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: `${env}.autheddocstest`,
    });
  }
}

const app = new cdk.App();
new MyStaticSiteStack(app, 'autheddoctestStaticSite-dev', { env: { region: 'us-east-1', account: '787198526106' } }, 'local-dev');
