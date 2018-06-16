
exports.handler =  (event, handler, callback) => {
    // require dependencies
    let AWS = require('aws-sdk');
    // configure SNS
    let SNS = new AWS.SNS({
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    });
    //template for response
    let response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: {},
    };

    try{
        console.log("event is = " + JSON.stringify(event));
        let {message, email} = event;
        let Subject = 'Request from ' + email;
        let params = {
            Subject,
            Message: message,
            TopicArn: process.env.topicARN
        };
        SNS.publish(params, (err, data) =>{
            if(err) {
                response.body = JSON.stringify(err);
                response.statusCode = 500;
                callback(null, response);
            }
            response.body = "Admin was contacted";
            callback(null, response);
        });
    }
    catch(err){
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = 500;
        callback(null ,response);
    }
};
