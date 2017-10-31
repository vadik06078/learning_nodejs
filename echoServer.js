var http = require("http");
var url = require("url");

var server = new http.Server(function(req,res){
    console.log(req.method, req.url);

    let urlParsed = url.parse(req.url,true);
    console.log(urlParsed);

 

    if(urlParsed.pathname == '/echo' && urlParsed.query.message){
        //res.end('finish');
        res.end(urlParsed.query.message);

    } else {
        res.statusCode = 405;
        res.end('PAGE NoT FOUND');
    }


});

server.listen(1200, '127.0.0.1');