var KiiGatewayAgent = require('kii-gateway-agent');
var kii = new KiiGatewayAgent();

var INTERVAL = 300000; // 5 mins
var i = 0;

function onboardGateway(retry) {
    try {
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
    } catch (err) {
        console.log('Agent OnboardGateway Error - ' + new Date().valueOf() + ':', err);
    }
}
onboardGateway();
setInterval(function () {
    try {
        kii.updateEndnodeOnline();
    } catch (err) {
        console.log('Agent UpdateOnline Error - ' + new Date().valueOf() + ':', err);
    }
}, INTERVAL);

module.exports = exports = kii;