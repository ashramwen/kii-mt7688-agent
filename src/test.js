var KiiGatewayAgent = require('kii-gateway-agent');
var numeral = require('numeral');

console.log('test');

var appID = 'hjeew9j3r825';
var appKey = 'e317ee63d147475aa0c349e844c35514';
var site = 'https://api-sg.kii.com';
var ownerToken = '6SVfo6P9bDQJGLQL_qLl7g2HDJm6RpmV3PM0n08VeqI';
var ownerID = 'ba28b2d34b60-f86a-7e11-0590-0c3a42df';

var gatewayThingID = 'th.ba28b2d34b60-f86a-7e11-7590-09a0bcdc';
var endnodeThingID = 'th.ba28b2d34b60-3deb-6e11-412e-0dad41ca';

var gatewayAgent = new KiiGatewayAgent();

gatewayAgent.setTemporaryApp(appID, appKey, site);
gatewayAgent.setTemporaryUser(ownerToken, ownerID);
gatewayAgent.loadGatewaySetting().then(function (o) {
    // console.log(o);
    for (var i = 0; i < 10; i++) {
        var id = '000' + i;
        var endnode = gatewayAgent.getEndnode(id);
        var thingStatus = {
            'activeTotal': 60000 + Math.random().toFixed(2),
            'activeMD': Math.random().toFixed(2) * 2,
            'apparentTotal': 60000 + Math.random().toFixed(2),
            'apparentMD': Math.random().toFixed(2) * 2,
            'Timestamp': new Date().valueOf(),
            'deviceID': id
        };
        if (endnode.state) {
            var state = endnode.state;
            thingStatus.activeTotalChange = numeral(thingStatus.activeTotal).subtract(state.activeTotal || 0).value();
            thingStatus.apparentTotalChange = numeral(thingStatus.apparentTotal).subtract(state.apparentTotal || 0).value();
        }
        // console.log(endnode);
        try {
            gatewayAgent.updateEndnodeState(endnode, thingStatus).then(function (res) {
                console.log(res);
            });
        } catch (err) {
            console.log(err);
        }
    }
});
// gatewayAgent.kii.bulkES();
// gatewayAgent.onboardGatewayByOwner().then(function (chainOutput) {
//     for (var i = 0; i < 10; i++) {
//         gatewayAgent.onboardEndnodeByOwner(
//             '000' + i, // endnode vendorThingID
//             undefined // endnode properties
//         ).then(function (res) {
//             console.log(res)
//         });;
//     }
// });
// gatewayAgent.onboardGatewayByOwner().then(function (chainOutput) {
//     console.log('onboardGatewayByOwner', chainOutput);
//     return gatewayAgent.onboardEndnodeByOwner(
//         'Donkey', // endnode vendorThingID
//         undefined // endnode properties
//     );
// }).then(function (chainOutput) {
//     console.log('onboardEndnodeByOwner', chainOutput);
//     return gatewayAgent.updateEndnodeState(
//         'Donkey', // endnode vendorThingID
//         {
//             'batteryAlias': {
//                 'power': true
//             },
//             'lampAlias': {
//                 'power': true
//             }
//         } // endnode states
//     )
// }).then(function (res) {
//     console.log('updateEndnodeState', res);
// });