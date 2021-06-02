---
id: SiteSetup
title: Setting up a New Site
---


## Prerequisites

* Azure: You need to register and configure an Azure Active Directory application+client for your site.
* AWS: You need control over a hosted zone in Route53, and the ability to create S3 buckets (AWS access key and secret).

## Simplest Setup and Usage (fork this repo)

You can directly fork this repo and use it for your site.  Although this is simplest, you will need to manually pull to keep your repo up to date with any improvements we make.  If you'd like automatic updating see _Self-Updating Usage_ below.

1. Clone this repo, choose a domain name for your site.
1. Set up Active Directory for your new site.
    1. Register a new application. Note `Application (client) id` and `Directory (tenant) id`.
    1. Add a web client to the application. Note `Client id` and `Client secret`.
    1. To the web client, add a redirect URI of your domain with `/_callback` at the end.
1. Edit the configuration in `site/.env` and `site/config/docusaurus.config.json` (you'll need to set your AWS/Route53 information there too.)
1. Set the required secrets in Github Secrets (see below).
1. Place your content in the `site/content` folder

Push everything, including `./.github/workflows/` and your site will be set up and deployed by Github Actions.

## Best Setup and Usage (use this repo as a submodule)

It is possible to install this repo as a submodule of your content/configuration repo. This allows your repository to be self-updating. Instructions and an example repo will be forthcoming.

## Rendering locally

1. If you install docusaurus locally, copy the directories from ./content/ into your docusaurus prior to running `npm run start`.  (Overwrite the directories in your docusaurus installation.)

## Configuration

The intent is for all non-secret configuration information, like the base domain/hosted zone information, to be specified in the top level .env file.

See the .env file for configurable settings.

### Required Secrets

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AAD_SSO__CLIENT_SECRET`

The following two secrets should be specified if you want to prevent the `cloudfront-auth` tool from generating new keys on each update:

* `AAD_SSO__ID_RSA`
* `AAD_SSO__ID_RSA_PUB`

You can generate these keys by running the last steps of the workflow locally on your station (`npm run cdk deploy -- --require-approval never`).

## Alternative Authentication / Identity Providers

The `cloudfront-auth` library supports multiple providers aside from Azure Active Directory, e.g., Auth0.  The parameters passed in from the Github Action can be altered to use those providers instead.

