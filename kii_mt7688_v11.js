/**
  Author: 	Wei Ming
  Revision: 	V1.1
  Dated:	12/01/17

  Functionality:
  
  1)HTTP Server to receive http post from MT7687F remote nodes

  2)TCP Server to handle the socket commands from cloud

  3)Data received in a mixture of bytes & uint32 decimals

  4)2 Bytes will rep the Device ID, 1 byte will rep the Channel, Command, Status 
    while uint32 decimal will rep the 4 different real-time readings from Renesas MCU

  5)2 stage conversion process of the uint32 decimals are done first convert the decimal into binary bits,
    then the binary bits are converted to single-precision float 
    (to prevent any loss of data due to conversion)
 */


//Global Variables
global.node_address = "";
global.node_channel = "";
global.node_command = "";
global.node_status = "";
global.node_active_md = "";
global.node_app_md = "";
global.node_active_total = "";
global.node_app_total = "";

//Module dependency
const express = require("express");
const bodyParser = require("body-parser");
var net = require('net');
var LCD = require('jsupm_i2clcd');
var binaryString = require('math-uint32-to-binary-string');
var fromBits = require('math-float32-from-bits');
//var mcs			= require('mcsjs');

var kii = require('./kii');

var node_active_md_binary, node_active_total_binary, node_app_md_binary, node_app_total_binary; //binary variables
var node_active_md_float, node_active_total_float, node_app_md_float, node_app_total_float; //float value converted
var counter = 0;

//init MCS MQTT
/*var myApp = mcs.register({
	deviceId: 'DkSdHB3Y',
	deviceKey: 'qIk9PZxlwvUt2BdA',
	mqttHost: 'mqtt.mcs.mediatek.com',
	method: 'mqtt',
	port: 1883,
	qos: 0,
});*/

// Keep track of the chat clients
var clients = [];

/*** HTTP Server for the MT7687 Clients ***/
const app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//Process the client GET request
app.get('/', function (req, res) {
	res.sendFile("index.html");
});

app.listen(8080, function () {
	console.log("HTTP Server:PORT 8080");
})

//Process the client POST request.
app.post('/upload', function (req, res) {

	var ts = new Date().getTime();
	node_address = req.body.node_address;
	node_channel = req.body.node_channel;
	node_command = req.body.node_command;
	node_status = req.body.node_status;
	node_active_md = req.body.node_active_md;
	node_app_md = req.body.node_app_md;
	node_active_total = req.body.node_active_total;
	node_app_total = req.body.node_app_total;

	/* Converts uint32 variables to binary */
	node_active_total_binary = binaryString(node_active_total);
	node_active_md_binary = binaryString(node_active_md);
	node_app_md_binary = binaryString(node_app_md);
	node_app_total_binary = binaryString(node_app_total);

	/* Converts binary into single-point precision float */
	node_active_total_float = fromBits(node_active_total_binary);
	node_active_md_float = fromBits(node_active_md_binary);
	node_app_md_float = fromBits(node_app_md_binary);
	node_app_total_float = fromBits(node_app_total_binary);

	/* Display on log for users to see */
	console.log("Timestamp:" + ts + " Device:" + node_address + " Channel:" + node_channel + " Command:" + node_command + " Status:" + node_status + " ActiveMD:" + node_active_md_float + " ApparentMD:" + node_app_md_float + " ActiveTotal:" + node_active_total_float + " ApparentTotal:" + node_app_total_float + "\n");
	//counter++;

	/* Upload to MCS using MQTT, this is an sample code that worked*/
	/*switch(counter)
	{
		case 1:
		myApp.emit('rx610_node_01','',node_active_total_float);
		break;
		
		case 2:
		myApp.emit('rx610_node_02','',node_active_total_float);
		break;
		
		case 3:
		myApp.emit('rx610_node_03','',node_active_total_float);
		break;
		
		case 4:
		myApp.emit('rx610_node_04','',node_active_total_float);
		break;
		
		case 5:
		myApp.emit('rx610_node_05','',node_active_total_float);
		break;
		
		case 6:
		myApp.emit('rx610_node_06','',node_active_total_float);
		break;
		
		case 7:
		myApp.emit('rx610_node_07','',node_active_total_float);
		break;
		
		case 8:
		myApp.emit('rx610_node_08','',node_active_total_float);
		break;
		
		case 9:
		myApp.emit('rx610_node_09','',node_active_total_float);
		break;
		
		case 10:
		myApp.emit('rx610_node_10','',node_active_total_float);
		break;
		
		default:
		counter == 0;
		break;
	}*/

	/* this segment will the portion to call the upload to cloud API */
	//var sensor = {"sensor_guid":sensor_guid,"temperature":temperature,"pressure":pressure,"humidity":humidity,"ts":ts};
	//var sensor = {"sensor_guid":sensor_guid,"temperature":temperature,"pressure":pressure,"ts":ts};
	//device.publish('topic/iaproject',JSON.stringify(sensor));	
	//myLcd.updateInfo();
	res.end("done");
});


/*** TCP Server for 7687 Clinets ***/
/* for command which will not be in POC's phase */

net.createServer(function (socket) {

	// Identify this client
	socket.name = socket.remoteAddress + ":" + socket.remotePort

	// Put this new client in the list
	clients.push(socket);

	// Send a nice welcome message and announce
	socket.write(socket.name + " is connected to the 7688 IoT Gateway\n");
	console.log(socket.name + " is now connected!\n");

	// Handle incoming tcp heartbeat messages from clients.
	socket.on('data', function (data) {
		//broadcast(socket.name + "> " + data, socket);
		console.log(socket.name + " sent a heartbeat that is: " + data);
		socket.write("Acknowledged that heartbeat is received\n");
	});

	socket.on('end', function () {
		clients.splice(clients.indexOf(socket), 1);
		//broadcast(socket.name + " is disconnected\n");
		console.log('client disconnected.\r\n');
	});

	socket.on('stateChange', function () {
		clients.splice(clients.indexOf(socket), 1);
		//broadcast(socket.name + " is disconnected\n");
	});

	socket.on('error', function () {
		console.log('error handling...\r\n');
	});

	socket.write('Server Echo for connection\r\n');
}).listen(8081, '192.168.100.1');
console.log('TCP Server:PORT 8081');


/*** LCD for information display ***/
var myLcd = new LCD.Jhd1313m1(0, 0x3E, 0x62);

//Add the updateInfo function for future enhancement of product
/*myLcd.updateInfo = function(){	
	
	myLcd.setCursor(0,0);
	
    var rgbValues={ red: 0, green: 0, blue: 0 };   
    rgbValues.red   = Math.floor(Math.random() * 255);
    rgbValues.green = Math.floor(Math.random() * 255);
    rgbValues.blue  = Math.floor(Math.random() * 255);		
	myLcd.setColor(rgbValues.red, rgbValues.green, rgbValues.blue);
	
    myLcd.setCursor(0,0);
    myLcd.write(sensor_guid);
	myLcd.setCursor(0,7);
    myLcd.write(pressure);
	myLcd.setCursor(1,0);
	myLcd.write(temperature);	
	myLcd.setCursor(1,7);
	myLcd.write(humidity);
	
};*/