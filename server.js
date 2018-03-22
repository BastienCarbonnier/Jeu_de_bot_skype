var restify = require('restify');
var builder = require('botbuilder');
var https = require("https");
var util = require("util");
var analyse =  require("./Traitement_de_bot/analyse.js");
var fs = require('fs');
var nodemailer = require('nodemailer');

// Setup Restify Server
var server = restify.createServer();
var session;
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
var bot = new builder.UniversalBot(connector, function (session_loc) {
    session = session_loc;

    var message = session_loc.message.text;
    if (message.substring(0,8)==="!sendlog"){
        sendLogToUser(message.substring(9));
    }
    else {
        analyse.parse(message,session_loc.message.user.name);
        console.log("User id : "+session_loc.message.user.id);
    }


});
function sendLogToUser(email){

    if (process.env.MAIL_PASSWORD){
        var res =email.match(/>(.*)</g);
        email = res[0].substring(1,res[0].length-1);
    }
    console.log(email);
    var password = "";
    if (process.env.MAIL_PASSWORD){
        password = process.env.MAIL_PASSWORD;
    }
    else {
        var config = require("./config.json");
        password = config.password;
    }
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'jdbter16@outlook.fr',
            pass: password
        }
    });

    var mailOptions = {
        from: 'jdbter16@outlook.fr',
        to: email,
        subject: 'Logs de Jeu de Bot Skype',
        text: 'Veuillez trouver ci-joint les logs de Jeu de Bot Skype.',
        attachments:[{   // file on disk as an attachment
            filename: 'logs.txt',
            path: "./logs.txt" // stream this file
        }]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            session.send("L'email a bien été envoyé à l'adresse suivante : "+email);
            console.log('Email sent: ' + info.response);
        }
    });
}
exports.sendMessage = function (message){
    session.send(message);
};
