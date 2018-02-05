const utils = require('./utils');

const tenant = process.argv[2];
const clientid = process.argv[3];
const clientsecret = process.argv[4];
const username = process.argv[5];
const password = process.argv[6];
const name = process.argv[7];

utils
    .getToken(tenant, clientid, clientsecret, username, password)
    .then((token) => {
        utils.getConfigurationIdByName(tenant, token, name)
            .then((configurationId) => {
                console.log(configurationId);
            });
    })

