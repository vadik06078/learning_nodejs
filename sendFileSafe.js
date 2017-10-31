const http = require("http");
const fs = require('fs');
const url = require("url");
const path = require('path');

const ROOT = __dirname + "/public";

http.createServer(function(req, res) {
   if (!checkAccess(req)){
       res.statusCode = 403;
       res.end("Tell me the secret to access");
       return;
   }

   sendFileSafe(url.parse(req.url).pathname, res);

}).listen(3000);

function checkAccess(req) {
    return url.parse(req.url, true).query.secret == '12345';
}

function sendFileSafe(filePath, res) {
    try{
        filePath = decodeURLComponent(filePath);
    } catch(e) {
        res.statusCode = 400;
        res.end("Bad Request1");
        return;
    }

    if(~filePath.indexOf('\0')){
        res.statusCode = 400;
        res.end("Bad Request2");
        return;
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) != 0) {
        res.statusCode = 404;
        res.end("File not found1");
        return;
    }

    fs.stat(filePath, function(err, stats) {
        if(err || !stats.isFile()){
            res.statusCode = 404;
            res.end("File not found2");
            return;
        }

        sendFile(filePath, res);
    });
}

function sendFile(filePath, res){
    fs.readFile(filePath, function (err, content) {
        if (err) throw err;

        const mime = require('mime').lookup(filePath);
        res.setHeader("Content-Type", mime + "; charset = utf-8");
        res.end(content);

    });
}



