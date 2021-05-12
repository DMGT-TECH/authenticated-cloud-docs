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

    let fullPublishedDomain = `${env}.${process.env.AUTHENTICATED_CLOUD_DOCS__HOSTED_ZONE_SUBDOMAIN}.${this.node.tryGetContext('domain')}`
    fs.writeFileSync('full_published_domain.txt', fullPublishedDomain)

    new MyStaticWebsite(this, id, {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: `${env}.${process.env.AUTHENTICATED_CLOUD_DOCS__HOSTED_ZONE_SUBDOMAIN}`,
    });
  }
}

const app = new cdk.App();

let env_name = process.env.AUTHENTICATED_CLOUD_DOCS__MAIN_BRANCH_TOP_SUBDOMAIN; // e.g., "main", "dev", or "www"
if (process.env.PULL_NUMBER && process.env.PULL_NUMBER !== "null") {
  env_name = "pr" + (process.env.PULL_NUMBER || "");
}
new MyStaticWebsiteStack(app, 'authdocstest-dev', { env: { region: 'us-east-1', account: '787198526106' } }, env_name);
