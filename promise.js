gatewayAgent
    .onboardGatewayByOwner(
        ownerToken, // owner token
        ownerID, //owner userid
        'BABY5', //gateway vendorThingID
        '123123', //gateway password
        'toy', // thing type
        undefined // thing properties
    ).then(function (chainOutput) {
        console.log('onboardGatewayByOwner', chainOutput);
        return gatewayAgent.onboardEndnodeByOwner(
            ownerToken, // owner token
            ownerID, //owner userid
            'Donkey', // endnode vendorThingID
            '123123', // endnode password
            'toy', // endnode type
            undefined // endnode properties
        );
    }, function (error) {

    });