const request = require('request');
request.get(
    'https://sandbox.xill.io/v2/system/ping',
    (err, response, body) => {
        if (err) {
            throw err;
        }
        console.log(response.headers);
        console.log(body);
    });