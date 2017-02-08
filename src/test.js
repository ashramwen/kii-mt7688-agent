var KiiGatewayAgent = require('kii-gateway-agent');

console.log('test');

var appID = 'a333fe49';
var appKey = 'ddab3f01d0eda5b73051c660134359fc';
var site = 'https://api-sg.kii.com';
var ownerToken = 'h6QKPtb8S2THnUusf6xMCXUv2MWzmRbZY8TVf0_Mzxc';
var ownerID = '7c698b427320-f689-6e11-91ed-00c48d05';

var gatewayThingID = 'th.ba28b2d34b60-3deb-6e11-412e-0e56ca79';
var endnodeThingID = 'th.ba28b2d34b60-3deb-6e11-412e-0dad41ca';

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
        'Donkey', // endnode vendorThingID
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