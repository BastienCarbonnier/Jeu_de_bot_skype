/*jshint esversion: 6 */

var restify    = require('restify'),
    builder    = require('botbuilder'),
    analyse    = require("./Traitement_de_bot/analyse.js"),
    tools      = require("./Traitement_de_bot/tools.js"),
    fs         = require('fs'),
    nodemailer = require('nodemailer'),
    request    = require('./request.js');


// Setup Restify Server
var server = restify.createServer();


server.listen(process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
    sendTyping: true
});

var bot;
// Initialize open json files and create hashmap to compose words
tools.initialization(function(hashmap_mc){
    // Listen for messages from users
    server.post('/api/messages', connector.listen());

    bot = new builder.UniversalBot(connector, function (session_loc) {


        var pseudo = session_loc.message.user.name;
        var idBot  = session_loc.message.user.id;

        var json_adresse = JSON.stringify(session_loc.message.address);//JSON.stringify(session_loc);
        //json_session
            request.insertUserPost(pseudo,json_adresse,function(err, result){
                //console.log(json_session);
                if (result == "true"){
                    var debut = "";
                    debut += "Bonjour, \nJe suis un bot de gestion de connaissances, ";
                    debut += "heureux de faire votre connaissance "+pseudo+" !\n";
                    debut += "Vous pouvez me demander de l'aide en m'envoyant le message suivant \n!help\n";
                    debut += "Amusez-vous bien !\n";
                    sendMessage(debut,pseudo);
                }
                else {
                    var message = session_loc.message.text;
                    if (message.substring(0,8)==="!sendlog"){
                        sendLogToUser(message.substring(9),pseudo);
                    }
                    else if (message.substring(0,12)==="!activedebug"){
                        request.activeDebugMode(pseudo, function(){
                            sendMessage("Le mode debug a bien été activé, pour le désactiver veuillez m'envoyer le message suivant : '!desactive debug'",pseudo);
                        });
                    }
                    else if (message.substring(0,15)==="!desactivedebug"){
                        request.desactiveDebugMode(pseudo, function(){
                            sendMessage("Le mode debug a bien été désactivé",pseudo);
                        });
                    }
                    else if (message.substring(0,5)==="!help"){
                        var help = "Vous pouvez me poser des questions (ex : Une vache peut-elle brouter ?)\n";
                        help += "Ou enrichir ma base de connaissances (ex : Une vache peut brouter.)\n";
                        help += "Ou alors utiliser les commandes suivantes :\n";
                        help += "!sendlog \'email\' : Je vais envoyer mes logs à l'email donné,\n";
                        help += "!activedebug : Afin que je vous donne des informations suplémentaires lors de mes réponses,\n";
                        help += "!desactivedebug : Afin que je desactive le mode debug\n";
                        sendMessage(help,pseudo);
                    }
                    else {
                        analyse.parse(message,pseudo,hashmap_mc);
                    }
                }

            });




    });
});

function sendLogToUser(email,pseudo){

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
            sendMessage("L'email a bien été envoyé à l'adresse suivante : "+email,pseudo);
            console.log('Email sent: ' + info.response);
        }
    });
}
function sendMessage (message,pseudo){
    request.getUserAdresse(pseudo,function(err, adresse){
        if (!err){
            var msg = new builder.Message().address(JSON.parse(adresse));
            msg.text(message);
            msg.textFormat('xml');
            bot.send(msg);
        }

    });
}

module.exports.sendMessage = sendMessage;
