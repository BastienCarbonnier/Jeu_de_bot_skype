var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server_port = 8080;
var server_ip_address = '0.0.0.0';

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "cd7ddebd-7fb9-4be5-8bbd-96755ba02417",
    appPassword: "qngHH20!mqnnFHTMN715_)~"

});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Voici le message reçu : %s", session.message.text);
});
