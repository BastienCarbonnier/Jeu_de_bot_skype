/*jshint esversion: 6 */
var rp          = require('request-promise'),
    cheerio     = require('cheerio'),
    windows1252 = require('windows-1252'),
    fs 			= require("fs");


var url_ws = "https://2018hlin601ter16.proj.info-ufr.univ-montp2.fr/WebServiceBddTer16/requeteur.php?";

exports.insertUser = function(pseudo,idBot,callback){
    var url = windows1252.encode(url_ws+"cmd=insert_user&pseudo="+pseudo+"&idBot="+idBot);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
};

exports.insertRelation = function(fw_id,sw_id,rel_id,pseudo,callback){
    var url = windows1252.encode(url_ws+"cmd=insert_rel&n1="+fw_id+"&n2="+sw_id+"&t="+rel_id+"&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
};

exports.isRelationInBDD = function(fw,sw,rel_id,callback){
    var url = windows1252.encode(url_ws+"cmd=insert_rel&n1="+fw_id+"&n2="+sw_id+"&t="+rel_id+"&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
};

exports.activeDebugMode = function(pseudo,callback){
    var url = windows1252.encode(url_ws+"cmd=active_debug&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
};
exports.desactiveDebugMode = function(pseudo,callback){
    var url = windows1252.encode(url_ws+"cmd=desactive_debug&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
};

exports.isInDebugMode = function(pseudo,callback){
    var url = windows1252.encode(url_ws+"cmd=is_in_debug&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        if (result=="false"){
            callback(null,false);
        }
        else {
            callback(null,true);
        }
    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
};
