let mysql = require('mysql');
let AWS = require('aws-sdk');

exports.handler =  (event, handler, callback ) => {
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
        database: process.env.database,
        multipleStatements: true
    });
    //create response template
    let response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: {},
    };
    //SNS publish params
    let  params = {
        Message: '',
        MessageAttributes: {
            'TopicArn': {
                DataType: 'String',
                StringValue: '',
            }
        },
        TopicArn: process.env.topicARN
    };
    try{
        //query to find unused quote
        let sql = "SELECT * FROM Quote WHERE used = false ORDER BY RAND() LIMIT 1;";
        connection.query(sql, (err, results, fields) => {
            if(err) {
                console.log(err);
                connection.end();
                response.body = JSON.stringify(err);
                response.statusCode = 500;
                callback(null, response);
            }
            if(results.length > 0) {
                console.log(results);
                let quote_id = results[0].quote_id;
                //configuring params for SNS.
                params.Message = results[0].quote;
                params.MessageAttributes['TopicArn'].StringValue = results[0].quote;
                console.log("param = " + JSON.stringify(params));
                //publish quote to SNS topic
                SNS.publish(params, (err, data) => {
                    if(err){
                        console.log(err);
                        connection.end();
                        response.body = JSON.stringify(err);
                        response.statusCode = 500;
                        callback(null, response);
                    }
                    //quote was published.  Updating quote used columne to true
                    let sql = "UPDATE Quote SET used = true WHERE quote_id=?";
                    connection.query(sql, [quote_id], (err, results, fields) =>{
                        if(err){
                            console.log(err);
                            connection.end();
                            response.body = JSON.stringify(err);
                            response.statusCode = 500;
                            callback(null, response);
                        }
                        //quote used column was updated.  end db connection and return 200 response
                        connection.end();
                        response.body = "message was delivered";
                        callback(null, response);
                    });
                });
            } else { //all quotes in db have been used.  reset used column for all quotes to false
                let sql = "SET SQL_SAFE_UPDATES=0; UPDATE Quote SET used = false; SET SQL_SAFE_UPDATES=1;";
                connection.query(sql, (err, results, fields) => {
                    if(err) {
                        console.log(err);
                        connection.end();
                        response.body = JSON.stringify(err);
                        response.statusCode = 500;
                        callback(null, response);
                    }
                    //query db for quote
                    let sql = "SELECT * FROM Quote WHERE used = false ORDER BY RAND() LIMIT 1;";
                    connection.query(sql, (err, results, fields) => {
                        if(err) {
                            console.log(err);
                            connection.end();
                            response.body = JSON.stringify(err);
                            response.statusCode = 500;
                            callback(null, response);
                        }
                        console.log(results);
                        let quote_id = results[0].quote_id;
                        //configuring params for SNS.
                        params.Message = results[0].quote;
                        params.MessageAttributes['TopicArn'].StringValue = results[0].quote;
                        console.log("param = " + JSON.stringify(params));
                        //publish quote to SNS topic
                        SNS.publish(params, (err, data) => {
                            if(err){
                                console.log(err);
                                connection.end();
                                response.body = JSON.stringify(err);
                                response.statusCode = 500;
                                callback(null, response);
                            }
                            //quote was published.  Updating quote used columne to true
                            let sql = "UPDATE Quote SET used = true WHERE quote_id=?";
                            connection.query(sql, [quote_id], (err, results, fields) =>{
                                if(err){
                                    console.log(err);
                                    connection.end();
                                    response.body = JSON.stringify(err);
                                    response.statusCode = 500;
                                    callback(null, response);
                                }
                                //quote used column was updated.  end db connection and return 200 response
                                connection.end();
                                response.body = "message was delivered";
                                callback(null, response);
                            });
                        });
                    });
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

