# authenticated-cloud-docs
A repository that deploys documents to the cloud for secured access via Azure Active Directory


## How to use

1. Clone this repo, choose a domain name for your site.
1. Set up Active Directory for your new site
  1. Register a new application. Note Application (client) id and Directory (tenant) id.
  1. Add a web client to the application. Note client id, client secret.
  1. Add a redirect URI of `$domain/_callback`
1. Edit the configuration in `.env` and `config/docusaurus.config.json` (you'll need to set your AWS/Route53 information there too.)
1. Set the required secrets in Github Secrets (see below).
1. Place your content in the `content` folder

Push everything, including `./.github/workflows/` and your site will be set up and deployed by Github Actions.

## Rendering locally

1. If you install docusaurus locally, copy the directories from ./content/ into your docusaurus prior to running `npm run start`.

## Configuration

The intent is for all non-secret configuration information, like the base domain/hosted zone information, to be specified in the top level .env file.

## Required Secrets

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AAD_SSO__CLIENT_SECRET`

The following two secrets should be specified if you want to prevent the cloudfront-auth tool from generating new keys on each update:

* `AAD_SSO__ID_RSA`
* `AAD_SSO__ID_RSA_PUB`

