# authenticated-cloud-docs
A repository that deploys documents to the cloud for secured access via Azure Active Directory


## Configuration

The intent is for all non-secret configuration information, like the base domain/hosted zone information, to be specified in the top level .env file.

## Required Secrets

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AAD_SSO__CLIENT_SECRET

The following two secrets should be specified if you want to prevent the cloudfront-auth tool from generating new keys on each update:

* AAD_SSO__ID_RSA
* AAD_SSO__ID_RSA_PUB

