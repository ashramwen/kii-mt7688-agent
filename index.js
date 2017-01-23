var gatewayAgent = require('kii-gateway-agent');

const appID = 'a333fe49';
const appKey = 'ddab3f01d0eda5b73051c660134359fc';
const site = 'https://api-sg.kii.com';

const ownerToken = 'wZvqF-7S7WmvGmBu6WTN7_kB_DCtDke9yHbUNz3fEOc';
const ownerID = '7c698b427320-f689-6e11-91ed-00c48d05';

gatewayAgent.init(appID, appKey, site);
gatewayAgent.onboardGatewayByOwner(
        ownerToken, // owner token
        ownerID, //owner userid
        'BABY5', //gateway vendorThingID
        '123123', //gateway password
        'toy', // thing type
        undefined) // thing properties
    .then(function (chainOutput) {
        console.log('onboardGatewayByOwner', chainOutput);
        return gatewayAgent.onboardEndnodeByOwner(
            ownerToken, // owner token
            ownerID, //owner userid
            'Donkey', // endnode vendorThingID
            '123123', // endnode password
            'toy', // endnode type
            undefined // endnode properties
        );
    }).then(function(chainOutput) {
        console.log('onboardEndnodeByOwner', chainOutput);
        return gatewayAgent.updateEndnodeState(
            ownerToken, // owner token
            'th.ba28b2d34b60-270b-6e11-c1ed-0f4ff280', // endnode thingID for Donkey
            {
                'batteryAlias': {
                    'power': true
                },
                'lampAlias': {
                    'power': true
                }
            } // endnode states
        )
    }).then(function(res) {
        console.log('updateEndnodeState', res);
    });