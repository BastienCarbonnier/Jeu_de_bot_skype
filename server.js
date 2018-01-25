var restify = require('restify');
var builder = require('botbuilder');

// Get environment variable
var server_port = process.env.OPENSHIFT_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_IP || '127.0.0.1';

// Setup Restify Server
var server = restify.createServer();
server.listen(server_port,server_ip_address, function () {
   console.log( "Listening on " + server_ip_address + ", port " + server_port );
});
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
