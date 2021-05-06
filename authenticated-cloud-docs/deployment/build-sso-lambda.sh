source ../../.env
cd cloudfront-auth

npm run-script build -- --SESSION_DURATION=$AAD_SSO__SESSION_DURATION --method=2 --AUTHZ=1 --distribution=$AAD_SSO__RESULT_NAME --trailing_slash_redirects_enabled --simple_urls_enabled --TENANT=$AAD_SSO__TENANT --CLIENT_ID=$AAD_SSO__CLIENT_ID --CLIENT_SECRET=${{ secrets.AAD_SSO__CLIENT_SECRET }} --REDIRECT_URI=$AAD_SSO__REDIRECT_URI

cp distributions/$AAD_SSO__RESULT_NAME/$AAD_SSO__RESULT_NAME.zip ../resources/lambda/

# TODO, MOVE INTO A GITHUB ACTION
