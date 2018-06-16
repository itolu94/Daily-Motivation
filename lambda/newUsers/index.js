

exports.handler =  (event, handler, callback) => {
    let mysql = require('mysql');
    let AWS = require('aws-sdk');
    let SNS = new AWS.SNS({
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    });
    let connection = mysql.createConnection({
        host: process.env.dbHost,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });
    let response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: {},
    };
    try {
        //establish db connection
        connection.connect();
        let {userName, phoneNumber, email} = event.body;
        // console.log("user info is " + body);
        let sql =  "SELECT username, phone_number FROM User WHERE username=? or phone_number=?;";
        // query database to determine if user already exist
        connection.query(sql, [userName, phoneNumber], (err, results, fields) => {
            console.log("checking if user excist= " + JSON.stringify(results));
        if(err) {
            connection.end();
            response.body = JSON.stringify(err);
            response.statusCode = 500;
            callback(null, response);
        }
        else if(results.length > 0){ //if an account is found, return 409
            connection.end();
            console.log("Account already excised");
            response.statusCode = 409;
            response.body = "Email or phone number is already registered";
            callback(null, response);
        }
        else { // account will be created
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
                let subscribtionARN = data.SubscriptionArn;
                connection.query(sql, [userName, phoneNumber, email, subscribtionARN], (err,results,fields) => {
                    if(err) {
                        console.log("User was added to SNS topic");
                        connection.end();
                        response.body = JSON.stringify(err);
                        response.statusCode = 500;
                        callback(null, response);
                    }
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

