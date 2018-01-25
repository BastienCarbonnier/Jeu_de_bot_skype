var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
// Get environment variable
var server_port = 8080;
var server_ip_address = '0.0.0.0';

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "4b9732bc-4088-40f3-99b7-8bf99bebe22a",
    appPassword: "hlTTFJ18;(zrpbaRJD691^}"

});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});
/*
// Create bot and add dialogs
var connector = new builder.ChatConnector({
    appId: "4b9732bc-4088-40f3-99b7-8bf99bebe22a",
    appPassword: "hlTTFJ18;(zrpbaRJD691^}"
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
*/
/*
var server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/
