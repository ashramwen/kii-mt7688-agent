var KiiGatewayAgent = require('kii-gateway-agent');

const appID = 'a333fe49';
const appKey = 'ddab3f01d0eda5b73051c660134359fc';
const site = 'https://api-sg.kii.com';
const ownerToken = 'h6QKPtb8S2THnUusf6xMCXUv2MWzmRbZY8TVf0_Mzxc';
const ownerID = '7c698b427320-f689-6e11-91ed-00c48d05';

const gatewayThingID = 'th.ba28b2d34b60-3deb-6e11-412e-0e56ca79';
const endnodeThingID = 'th.ba28b2d34b60-3deb-6e11-412e-0dad41ca';

var gatewayAgent = new KiiGatewayAgent();
gatewayAgent.setTemporaryApp(appID, appKey, site);
gatewayAgent.setTemporaryUser(ownerToken, ownerID);
gatewayAgent.onboardGatewayByOwner().then(function (chainOutput) {
    console.log('onboardGatewayByOwner', chainOutput);
    return gatewayAgent.onboardEndnodeByOwner(
        'Donkey', // endnode vendorThingID
        undefined // endnode properties
    );
}).then(function (chainOutput) {
    console.log('onboardEndnodeByOwner', chainOutput);
    return gatewayAgent.updateEndnodeState(
        endnodeThingID, // endnode thingID for Donkey
        {
            'batteryAlias': {
                'power': true
            },
            'lampAlias': {
                'power': true
            }
        } // endnode states
    )
}).then(function (res) {
    console.log('updateEndnodeState', res);
});