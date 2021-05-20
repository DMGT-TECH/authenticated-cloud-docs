const AWS = require('aws-sdk');
require('dotenv').config();
const env = process.env;
 var awscred = {
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY,
        region: env.AWS_REGION
    };

async function run() {
    AWS.config.update(awscred);
    var cloudformation = new AWS.CloudFormation();

    var params = {
        'StackName': env.CF_STACK_NAME
      };
    cloudformation.describeStacks(params, function(err, data) {
        if (err) {
            console.log('CF_STATUS_ERROR='+ err);
        } else {
            let currentStatus = data.Stacks[0].StackStatus
            if(currentStatus.includes('IN_PROGRESS'))
            {
                console.log('CF_STATUS=IN_PROGRESS')
            } else{
                console.log('CF_STATUS='+ currentStatus)
            }   
        }
    });
} 

run()