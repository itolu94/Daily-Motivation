import axios from 'axios';
let config =  { header:
    {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    method: 'HEAD',
    mode: 'no-cors',
};

exports.createAccount = (data, cb) => {
    axios.post("https://mnsmgf7dzi.execute-api.us-east-1.amazonaws.com/prod", data, config)
        .then((response) => {
            cb(response);
        });
}

exports.deleteAccount = (data, cb) => {
    axios.delete(`https://mnsmgf7dzi.execute-api.us-east-1.amazonaws.com/prod/?email=${data.email}&phone-number=${data.phoneNumber}`, config)
        .then((response) => {
            cb(response);
        });
}

exports.contact = (data, cb) => {
    axios.post("https://mnsmgf7dzi.execute-api.us-east-1.amazonaws.com/prod/contact", data, config)
        .then((response) => {
            cb(response);
        });
}

