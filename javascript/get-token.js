const request = require('request-promise');

const clientid = process.argv[2];
const clientsecret = process.argv[3];
const username = process.argv[4];
const password = process.argv[5];

auth = 'Basic ' + new Buffer(clientid + ':' + clientsecret).toString('base64');
request(
    { 
        method: 'POST',
        uri: 'https://sandbox.xill.io/oauth/token',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        json: true,
        body: 'grant_type=password&username=' + username + '&password=' + password
    })
    .then((body) => {
        console.log(JSON.stringify(body, ' ', 2));
    });
    
