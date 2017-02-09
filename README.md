# kii-mt7688-agent

* [Creating a build] (#Build)
* [Deploy] (#Deploy)
* [Configuration] (#Configuration)
* [Serving] (#Serving)
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
├── main.js      # main js file
├── mt7688.js    # bundled with the original kii_mt7688_v11.js
└── resource
    └── db.json  # configuration
```
All we need are `main.js` and `resource/db.json`.
Copy these two files with their structure into the gateway.

Also We need to install 2 additional packages manually in the gateway.
```sh
npm install express
npm install jju
```
Neither of them can be bundled into the dist.

<a name="Configuration"></a>
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
After deploy and configuration, we can run it.
```sh
node main.js
```

<a name="Development"></a>
## Installation
```sh
# Install the dependencies
npm install
```
