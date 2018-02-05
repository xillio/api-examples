const utils = require('./utils');

const clientid = process.argv[2];
const clientsecret = process.argv[3];
const username = process.argv[4];
const password = process.argv[5];
const parentId = process.argv[6];
const name = process.argv[7];
const fileName = process.argv[8];

var tenantRegEx = /^http[s]?:\/?\/?([^:\/\s]+).*?$/;
const tenant = parentId.match(tenantRegEx)[1];
utils
    .getToken(tenant, clientid, clientsecret, username, password)
    .then((token) => {
        utils.createObject(token, parentId, name)
            .then((object) => {
                utils.uploadContents(token, object.entity.id, fileName)
                    .then((data) => console.log(data));
            })
    });


