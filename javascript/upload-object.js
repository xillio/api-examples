const utils = require('./utils');

const clientid = process.argv[2];
const clientsecret = process.argv[3];
const username = process.argv[4];
const password = process.argv[5];
const id = process.argv[6];
const fileName = process.argv[7];

var tenantRegEx = /^http[s]?:\/?\/?([^:\/\s]+).*?$/;
const tenant = id.match(tenantRegEx)[1];
utils
    .getToken(tenant, clientid, clientsecret, username, password)
    .then((token) => {
        utils.uploadContents(token, id, fileName)
            .then((data) => console.log(data));
    });


