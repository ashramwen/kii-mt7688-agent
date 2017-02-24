# kii-mt7688-agent

* [Creating a build] (#Build)
* [Deploy] (#Deploy)
* [Configuration] (#Configuration)
* [Serving] (#Serving)
* [MQTT] (#Mqtt)
* [Development] (#Development)

<a name="Build"></a>
## Creating a build
```sh
webpack
```
The build artifacts will be stored in the `dist/` directory.

<a name="Deploy"></a>
## Deploy
In the `dist/` directory,
```
├── main.js        # main js file
├── package.json   # specifics of npm's package.json handling
└── resource
    └── db.json    # configuration
```
All we need are in the `dist` folder.
Copy these files with their structure into the gateway.

Also We need to install some additional packages manually in the gateway.
```sh
npm install express
npm install jju
npm install ws@1.1.2
```
or we can just use
```
npm install  # will install the depedencies set in the package.json
```
All of them can be bundled into the dist.

<a name="Configuration"></a>
## Configuration
Before serving the service, we have to configure `resource/db.json` first.
```javascript
{
  "app": {
    "appID": "appID",
    "appKey": "appKey",
    "site": "https://api-sg.kii.com"
  },
  "user": {
    "ownerToken": "ownerToken",
    "userID": "userID"
  },
  ...
}
```
The `app` and `user` sections need to be set.

<a name="Serving"></a>
## Serving
After [deploy] (#Deploy) and [configuration] (#Configuration), we can run it.
```sh
node main.js
```

In some old node, we may need to force garbage collection manually.
Just add the option: `--expose-gc’
```sh
node --expose-gc main.js
```

<a name="Mqtt"></a>
## MQTT
Now the agent supports MQTT.
```sh
node main.js --mqtt
```
Also gc mode is
```sh
node --expose-gc main.js --mqtt
```

<a name="Development"></a>
## Development
```sh
# Install the dependencies
npm install
```
