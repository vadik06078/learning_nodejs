const http =  require('http');

const server = new http.Server(); //EventEmitter

let counter = 0;

server.listen(1200, '127.0.0.1');

let emit = server.emit;

server.emit = function(event){
    console.log(event);
    emit.apply(server, arguments);
};

server.on('request', function(req, res){
    res.end("Hello world" + ++counter);
   // res.send("Hi peoples");
  //  req.send("HI");
});