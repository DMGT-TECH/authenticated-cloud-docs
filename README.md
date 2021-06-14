# authenticated-cloud-docs
A repository that deploys documents to the cloud for secured access via Azure Active Directory.

# Setup

## Prerequisites

* Azure: You need to register and configure an Azure Active Directory application+client for your site.
* AWS: You need control over a hosted zone in Route53, and the ability to create S3 buckets (AWS access key and secret).

## Simplest Setup (copy/fork this repo)

You can directly fork this repo and use it for your site.  Although this is simplest, you will need to manually pull to keep your repo up to date with any improvements we make.  If you'd like automatic updating see _Recommended Setup_ below.

1. Clone this repo, choose a domain name for your site.
1. Set up Active Directory for your new site.
    1. Register a new application. Note your `Application (client) id` and `Directory (tenant) id`.
    1. Add a **web client** to the application. Note its `Client id` and `Client secret`.
    1. To the web client, add a **redirect URI** with your domain with `/_callback` at the end.
1. Edit the configuration in `site/.env` and `site/config/docusaurus.config.json` (you'll need to set your AWS/Route53 information there too.)
1. Set the required secrets in Github Secrets (see below).
1. Edit your content in the `site/content` folder

Push everything, including `./.github/workflows/` and your site will be set up and deployed by Github Actions.

## Recommended Setup (install as submodule)

It is possible to install this repo as a submodule of your content/configuration repo. This allows your repository to be self-updating. Instructions and an example repo will be forthcoming.

# Usage

Some of the tool's behavior can be controlled by setting (or unsetting) Secrets in Github Actions as a user interface.

## Faster Publishing

Once the site has been deployed for the first time (5-8 minutes), a faster publishing method is available. To use this method, add:

* `FAST_JUST_COPY_FILES` with value `true` (in Secrets)

If you set this secret to `false`, or remove the secret entirely, the tool reverts to a full deploy on each change/push.

_When might I not want to use this faster method and instead do a full redeploy?_
* changes to the published site's domain name
* change to the AAD configuration (client secret, etc)
* need to regenerate new keys.


## Algolia Search Index Update

To have the Github workflow update an Algolia search index, set:
* `ALGOLIA_SEARCH_SECRET_API_KEY` (in Secrets) 

with your secret API key. If you unset this, the search index will not be automatically updated.


## Rendering locally

There is a script `localhost.sh` that takes care of copy the files necessary to run your docusaurus site locally.  In this mode, any changes you make to the content appear instantly on the local version of your site.

# Configuration

The intent is for all non-secret configuration information, like the base domain/hosted zone information, to be specified in the top level .env file.

See the .env file for configurable settings.

The `ALGOLIA_SEARCH_` keys are optional (don't set them if you don't wish to configure Algolia search for your site.)

## Required Secrets

The following are required:

* `AWS_ACCESS_KEY_ID` (in Secrets)
* `AWS_SECRET_ACCESS_KEY` (in Secrets)
* `AAD_SSO__CLIENT_SECRET` (in Secrets)

## Optional Secrets

**Keys.** Build time is faster if you specify the following two secrets, as this prevents the `cloudfront-auth` tool from generating new keys on each deploy:

* `AAD_SSO__ID_RSA`  (in Secrets)
* `AAD_SSO__ID_RSA_PUB`  (in Secrets)

**Algolia search index.** You can enable automating reindexing of the site with Algolia by setting the following key:

* `ALGOLIA_SEARCH_SECRET_API_KEY` (in Secrets)

Note: Algolia search also requires the following under `themeconfig` in `docusaurus.config`; these will get substituted from the site's `.env` in during indexing:

```
    algolia: {
      apiKey: '$ALGOLIA_SEARCH_PUBLIC_KEY',
      indexName: '$ALGOLIA_SEARCH_PUBLIC_INDEX_NAME',
      contextualSearch: false,
      appId: '$ALGOLIA_SEARCH_PUBLIC_APPLICATION_ID',
      searchParameters: {},
    }
```


You can generate these keys by running the last steps of the workflow locally on your station (`npm run cdk deploy -- --require-approval never`).

# Notes

## Alternative Authentication / Identity Providers

The `cloudfront-auth` library supports multiple providers aside from Azure Active Directory, e.g., Auth0.  The parameters passed in from the Github Action can be altered to use those providers instead.

