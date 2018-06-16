

exports.handler =  (event, handler, callback) => {
    // require dependencies
    let mysql = require('mysql');
    let AWS = require('aws-sdk');
    // configure SNS
    let SNS = new AWS.SNS({
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    });
    //connect to database
    let connection = mysql.createConnection({
        host: process.env.dbHost,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });
    //template for response
    let response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: {},
    };

    try {
        //establish database connection
        connection.connect();
        // console.log(event);
        let {phoneNumber, email}= event.body;
        let sql =  "SELECT user_id, subscribtion_arn FROM User WHERE  phone_number=? AND email =?";
        // query database to find  user_id;
        connection.query(sql, [phoneNumber, email], (err, results, fields) => {
            console.log("checking if user excist= " + JSON.stringify(results));
            if(err) {
                connection.end();
                response.body = JSON.stringify(err);
                response.statusCode = 500;
                callback(null, response);
            }
            else if(results.length > 0){ // if account is found, delete it.
                let sql = "DELETE FROM User WHERE user_id =?";
                let user_id = results[0]["user_id"];
                let SubscriptionArn = results[0]["subscribtion_arn"];
                //delete user from database
                connection.query(sql, [user_id], (err, results, fields) => {
                    if(err) {
                        connection.end();
                        response.body = JSON.stringify(err);
                        response.statusCode = 500;
                        callback(null, response);
                    }
                    let param = {SubscriptionArn};
                    //unsubscribing user from topic
                    SNS.unsubscribe(param,(err, data) => {
                        if(err) {
                            connection.end();
                            response.body = JSON.stringify(err);
                            response.statusCode = 500;
                            callback(null, response);
                        }
                        connection.end();
                        // console.log("Account was deleted");
                        response.body = "Account was deleted";
                        callback(null, response);
                    });
                });
            }
            else { //account was not found
                connection.end();
                // console.log("Account does not excise");
                response.statusCode = 404;
                response.body = "Please confirm email and phone number used for your account";
                callback(null, response);
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

