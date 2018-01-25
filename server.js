var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');
/*
var hostname = '0.0.0.0';
var port = 8080;
// Get environment variable
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Setup Restify Server

var server = restify.createServer();
server.listen(server_port,server_ip_address, function () {
   console.log( "Listening on " + server_ip_address + ", port " + server_port );
});
*/


// Create bot and add dialogs
var connector = new builder.ChatConnector({
    appId: "1111",
    appPassword: "essai"
});
var bot = new builder.UniversalBot(connector);
bot.dialog('/', function (session) {
    session.send('Hello World');
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});

/*
var server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/


/*
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});
*/
