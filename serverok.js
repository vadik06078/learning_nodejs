const http = require('http');
const fs = require('fs');
const chat = require('./chat.js');
const express = require('express');
const app = express();

/*app.get('/', function(req, res) {
    res.sendfile('index.html');
});
app.listen(3000);*/

http.createServer(function (req,res){



    switch (req.url){
        case '/':
            sendFile("index.html", res);
            break;
        case '/subscribe':
            chat.subscribe(req,res);
            break;
        case '/publish':
            chat.publish("...")
            break;

        default:
            res.statusCode = 404;
            res.end("Not FoUnD");
    }
}).listen(3000);


function sendFile(fileName, res) {

    var fileStream = fs.createReadStream(fileName);
    fileStream.on('error', function() {
        res.statusCode = 500;
        res.end("SeRvEr error");

    });
}