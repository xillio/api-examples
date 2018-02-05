const request = require('request-promise');
const fs = require('fs');

function createObject(token, parentId, name) {
    const object = {
        "kind": "File",
        "original": {
            "name": {
                "systemName": name,
                "displayName": name
            }
        },
        "modified": {
            "name": {
                "systemName": name,
                "displayName": name
            }
        }
    };
    return request(
        {
            method: 'POST',
            uri: parentId + "?scope=entity",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            json: object
        })
}

function getContents(token, id) {
    var entityRegEx = /^((http[s]?|ftp):\/?\/?[^:\/\s]+)\/v2\/entities((\/\w+)*\/[\w\-\.]+[^#?\s]+)$/;
    var matches = id.match(entityRegEx);
    var contentsId = matches[1] + '/v2/contents' + matches[3];
    return request({
        uri: contentsId,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
}

function uploadContents(token, entityId, fileName) {
    var entityRegEx = /^((http[s]?|ftp):\/?\/?[^:\/\s]+)\/v2\/entities((\/\w+)*\/[\w\-\.]+[^#?\s]+)$/;
    var matches = entityId.match(entityRegEx);
    var contentsId = matches[1] + '/v2/contents' + matches[3];
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                request({
                    method: 'PUT',
                    uri: contentsId,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    body: data
                }).then((data) => resolve(data));
            }
        });
    });
}

function createContainer(token, parentId, name) {
    const container = {
        "kind": "Folder",
        "original": {
            "container": {
                "hasChildren": true
            },
            "name": {
                "systemName": name,
                "displayName": name
            }
        },
        "modified": {
            "container": {
                "hasChildren": true
            },
            "name": {
                "systemName": name,
                "displayName": name
            }
        }
    };
    return request(
        {
            method: 'POST',
            uri: parentId + "?scope=entity,children",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            json: container
        })
}

function getContainerById(token, id) {
    return request({
        uri: id + '?scope=entity,children',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true,
    })
}

function getObjectById(token, id) {
    return request({
        uri: id,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true,
    });
}

function getConfigurations(tenant, token) {
    return request({
        uri: 'https://' + tenant + '/v2/entities?scope=children',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true,
    })
}

function getConfigurationIdByName(tenant, token, name) {
    return getConfigurations(tenant, token)
        .then((body) => {
            const configuration = body.children.find((c) => c.original.name.displayName === name);
            if (configuration) {
                return configuration.id;
            }
        });
}

function getToken(tenant, clientid, clientsecret, username, password) {
    return new Promise((resolve, reject) => {
        auth = 'Basic ' + new Buffer(clientid + ':' + clientsecret).toString('base64');
        request(
            {
                method: 'POST',
                uri: 'https://' + tenant + '/oauth/token',
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                json: true,
                body: 'grant_type=password&username=' + username + '&password=' + password
            })
            .then((body) => {
                resolve(body["access_token"]);
            });
    });
}

module.exports = {
    getToken: getToken,
    getConfigurations: getConfigurations,
    getConfigurationIdByName: getConfigurationIdByName,
    getContainerById: getContainerById,
    getObjectById: getObjectById,
    createContainer: createContainer,
    createObject: createObject,
    uploadContents: uploadContents,
    getContents: getContents
};