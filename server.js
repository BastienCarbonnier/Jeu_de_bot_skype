var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server_port = 8080;
var server_ip_address = '0.0.0.0';

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Servicee
var connector = new builder.ChatConnector({
    appId: "0bee3af3-b276-4fc7-8533-b4b001136177",
    appPassword: "6*{5FsNr{Q{gIigZ"

});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Voici le message reçu : %s", session.message.text);
});
