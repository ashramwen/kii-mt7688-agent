# kii-mt7688-agent

* [Bundle] (#Bundle)
* [Deploy] (#Deploy)
* [Development] (#Development)

<a name="Bundle"></a>
## Creating a build
```sh
webpack
```
The build artifacts will be stored in the `dist/` directory.

<a name="Deploy"></a>
## Deploy
In the `dist/` directory,
```
main.js # is the main file.
```
Copy `main.js` into the gateway.

Also you need to install 2 extra packages manually in the gateway.
```sh
npm install express
npm install jju
```
Both of them can not be bundled into the dist.

After then, you can run it.
```sh
node main.js
```

<a name="Development"></a>
## Installation
```sh
# Install the dependencies
npm install
```
