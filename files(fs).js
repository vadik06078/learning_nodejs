const fs = require('fs');

fs.readFile(__filename, function(err, data){
    if(err){
        console.log(err);
    } else {
        console.log(data.toString('utf-8'));
        console.log(data[1]);
    }
});

console.log("hi");