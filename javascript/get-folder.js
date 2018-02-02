const request = require('request-promise');

const clientid = process.argv[2];
const clientsecret = process.argv[3];
const username = process.argv[4];
const password = process.argv[5];
const path = process.argv[6];

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
        return body["access_token"];
    })
    .then((token) => {
        return request({
            uri: 'https://sandbox.xill.io/v2/entities' + path + '?scope=children',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true,
        })
    })
    .then((body) => {
        console.log(JSON.stringify(body, ' ', 2));
        body.children.forEach((child) => {
            console.log(child.original.name.systemName);
        })
    });
