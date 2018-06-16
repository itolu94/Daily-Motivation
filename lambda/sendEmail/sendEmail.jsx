
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
        headers: {
            "Access-Control-Allow-Origin": '*'
        },
        isBase64Encoded: false,
        statusCode: 200,
        body: {},
    };
    try{
        console.log("event is = " + JSON.stringify(event));
        let {message, email, option} = JSON.parse(event.body);
        let Subject = `${option} Request from  ${email}`;
        //configuring sns params
        let params = {
            Subject,
            Message: message,
            TopicArn: process.env.topicARN
        };
        //publishing user's message to admin SNS topic
        SNS.publish(params, (err, data) =>{
            if(err) {
                console.log(JSON.stringify(err));
                response.body = JSON.stringify(err);
                response.statusCode = 500;
                callback(null,response);
            }
            //message was sent.
            response.body = "Admin was contacted";
            callback(null, response);
        });
    }
    catch(err){
        console.log(err);
        response.body = JSON.stringify(err);
        response.statusCode = 500;
        callback(response);
    }
};
