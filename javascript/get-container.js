const utils = require('./utils');

const clientid = process.argv[2];
const clientsecret = process.argv[3];
const username = process.argv[4];
const password = process.argv[5];
const id = process.argv[6];

var tenantRegEx = /^http[s]?:\/?\/?([^:\/\s]+).*?$/;
const tenant = id.match(tenantRegEx)[1];
utils
    .getToken(tenant, clientid, clientsecret, username, password)
    .then((token) => {
        utils.getContainerById(token, id)
            .then((container) => {
                console.log(JSON.stringify(container.entity, ' ', 2));
                container.children.forEach((child) => {
                    if (child.original.container && child.original.container.hasChildren) {
                        console.log(child.original.name.systemName + '/ =>', child.id);
                    } else {
                        console.log(child.original.name.systemName);
                    }
                })
            })
    });
