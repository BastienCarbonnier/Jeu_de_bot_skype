var restify = require('restify');
var builder = require('botbuilder');
var https = require("https");
var util = require("util");
var analyse =  require("./Traitement_de_bot/analyse.js");

var APPID = "df67dcdb-c37d-46af-88e1-8b97951ca1c2";//81fa9cdd-4a02-426f-a426-400ba180b9fd";
var APPKEY = "7cc98d8bea6b443e846ffb71579ef836";
/*
LUIS :
name : jdb_luis
keys1 : 6197088245d54b8ea25413e34fc08417 KO
keys2 : 22b25abf20324fb2b26a46331dbbabcd KO
keys3 : 7cc98d8bea6b443e846ffb71579ef836 OK
 */

// Setup Restify Server
var server = restify.createServer();

server.listen(process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("%s", analyse.parse(session.message.text));
    console.log("User id : "+session.message.user.id);
});
