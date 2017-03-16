var kii = require('./kii');
kii.onboardGatewayByOwner().then(function (res) {
    update();
    setInterval(function () {
        update();
    }, 5000);
});

function update() {
    try {
        for (var i = 1; i < 11; i++) {
            var id = 'Donkey' + i;
            kii.updateEndnodeState(id, {
                'activeTotal': 60000 + Math.random().toFixed(2),
                'activeMD': Math.random().toFixed(2) * 2,
                'apparentTotal': 60000 + Math.random().toFixed(2),
                'apparentMD': Math.random().toFixed(2) * 2,
                'Timestamp': new Date().valueOf(),
                'deviceID': id
            });
        }
        for (var i = 1; i < 11; i++) {
            var id = 'Donkey' + i;
            kii.updateEndnodeState(id, {
                'activeTotal': 60000 + Math.random().toFixed(2),
                'activeMD': Math.random().toFixed(2) * 2,
                'apparentTotal': 60000 + Math.random().toFixed(2),
                'apparentMD': Math.random().toFixed(2) * 2,
                'Timestamp': new Date().valueOf(),
                'deviceID': id
            });
        }
    } catch (err) {
        console.log('TestError:', err);
    }
}