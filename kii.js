var KiiGatewayAgent = require('kii-gateway-agent');
var kii = new KiiGatewayAgent();

var i = 0;

function onboardGateway(retry) {
    kii.onboardGatewayByOwner().then(function (res) {
        if (res.thingID) {
            console.log('Gateway onboarding is done.')
        } else {
            console.log('Gateway onboard failed. Retry in 5 secs: ' + ++i + ' times.')
            setTimeout(function () {
                onboardGateway();
            }, 5000);
        }
    }, function () {
        console.log('Gateway onboard failed. Retry in 5 secs.')
        setTimeout(function () {
            onboardGateway();
        }, 5000);
    });
}
onboardGateway();

module.exports = exports = kii;