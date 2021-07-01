
exports.handler = (event, context, callback) => {
    
    // Extract the request from the CloudFront event that is sent to Lambda@Edge 
    let request = event.Records[0].cf.request;
    console.log("Test Request is: "+ request)
    // Extract the URI from the request
    
    
    let olduri = request.uri;
    let newuri = olduri

    if(olduri.endsWith('/')) {
        newuri = olduri.replace(/\/$/, '\/index.html');
    } else if(! olduri.split("/").pop().includes(".")){
        newuri = olduri + "/index.html"
    }

    // Log the URI as received by CloudFront and the new URI to be used to fetch from origin
    console.log("Old URI is: " + olduri);
    console.log("New URI is: " + newuri);
    
    // Replace the received URI with the URI that includes the index page
    request.uri = newuri;
    
    // Return to CloudFront
    return callback(null, request);

};