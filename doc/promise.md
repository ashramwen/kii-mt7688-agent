gatewayAgent 的指令除了 init() 以外都是 http request，都是非同步 (async) 執行的

```javascript
gatewayAgent.onboardGatewayByOwner(
    ... // 傳遞給 server 的參數
).then(
    function (res) {
        /* 呼叫 onboardGatewayByOwner 成功的回應
         * 呼叫 onboardGatewayByOwner 成功，但是程式判斷失敗的話也有可能在這
         * 通常返回的 Status Code 2xx 的都會在這
         */
    }, function (error) {
        /* 呼叫 onboardGatewayByOwner 失敗的回應
         * 返回的 Status Code 4xx 和 5xx 的會在這
         */
    }
);
```

在 then 中有兩個 function

第一個是 http request 呼叫**成功**後會執行的程式

第二個是 http request 呼叫**失敗**時會執行的程式

由於是非同步 (async) 的執行，所以如果要按照順序執行 http request 的方法的話則要照此方式寫

```javascript
gatewayAgent.onboardGatewayByOwner( // 1. 執行 onboardGatewayByOwner
    ... // 傳遞給 server 的參數
).then(function (res) {
    // 這裡是 onboardGatewayByOwner 的 success callback
    return gatewayAgent.onboardEndnodeByOwner(...); // 2. 執行 onboardEndnodeByOwner
}, function (error) {
    // TODO onboardGatewayByOwner error handle
}).then(function (res) {
    // 這裡是 onboardEndnodeByOwner 的 success callback
    return gatewayAgent.updateEndnodeState(...); // 3. 執行 updateEndnodeState
}, function (error) {
    // TODO onboardEndnodeByOwner error handle
}).then(function (res) {
    // 這裡是 updateEndnodeState 的 success callback
}, function (error) {
    // TODO updateEndnodeState error handle
});
```

這是 javascript 的一種寫法，叫 promise chains

按照順序執行

1. 執行 onboardGatewayByOwner
2. onboardGatewayByOwner 呼叫成功後，執行 onboardEndnodeByOwner
3. onboardEndnodeByOwner 呼叫成功後，執行 updateEndnodeState

把要繼續呼叫的程式放在 then 的第一個 success function 中，注意前面要有 **return**
這樣才會繼續往下執行
