

exports.handler =  (event, handler, callback) => {
    //require dependencies
    let mysql = require('mysql');
    let AWS = require('aws-sdk');
    //configure SNS
    let SNS = new AWS.SNS({
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    });
    //establish database connection
    let connection = mysql.createConnection({
        host: process.env.dbHost,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });
    //create response template
    let response = {
        headers: {
            "Access-Control-Allow-Origin": '*'
        },
        isBase64Encoded: false,
        statusCode: 200,
        body: {},
    };
    try {
        //establish db connection
        connection.connect();
        console.log(`event.body = ${JSON.stringify(event.body)}`);
        let body = JSON.parse(event.body);
        let {userName, phoneNumber, email} = body;
        phoneNumber = String(phoneNumber);
        console.log(`userName = ${userName}, phoneNumber = ${phoneNumber}, email=${email}`);
        // query database to determine if user already exist
        let sql =  "SELECT email, phone_number FROM User WHERE email=? or phone_number=?;";
        connection.query(sql, [email, phoneNumber], (err, results, fields) => {
            console.log("checking if user eexcise " + JSON.stringify(results));
            if(err) {
                connection.end();
                response.body = JSON.stringify(err);
                response.statusCode = 500;
                callback(null, response);
            }
            else if(results.length > 0){ // account was found. return 409 to user.
                connection.end();
                console.log("Account already excised");
                response.statusCode = 409;
                response.body = "Email or phone number is already registered";
                callback(null, response);
            }
            else {// account does not excist
                //configure SNS params
                let params = {
                    Protocol: 'sms',
                    TopicArn: process.env.topicARN,
                    Endpoint: phoneNumber,
                };
                // subscribing user to daily-motivation SNS topic
                SNS.subscribe(params, (err, data) => {
                    if (err) {
                        console.log(err);
                        response.body = JSON.stringify(err);
                        response.statusCode = 500;
                        callback(null, response);
                    }{
                        //saving user to database
                        let sql = "INSERT INTO User (username, phone_number, email, subscribtion_arn) VALUE (?,?,?,?)";
                        console.log("SNS.subscribe =  " + JSON.stringify(data));
                        console.log("User was added to SNS topic");
                        let subscribtionARN = data.SubscriptionArn;
                        connection.query(sql, [userName, phoneNumber, email, subscribtionARN], (err,results,fields) => {
                            if(err) {
                                connection.end();
                                response.body = JSON.stringify(err);
                                response.statusCode = 500;
                                callback(null, response);
                            }
                            //user was added to db. ending db connection and return 200
                            connection.end();
                            response.body = "Account was created";
                            callback(null, response);
                        });
                    }
                });
            }
        });
    }
    catch(err) {
        console.log(err);
        connection.end();
        response.body = JSON.stringify(err);
        response.statusCode = 500;
        callback(null ,response);
    }
};

