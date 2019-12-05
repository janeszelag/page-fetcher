const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

let URL = args[0];
console.log(args[0]);
let path = args[1];
console.log(args[1]);
//fs.appendFile(path, data, function)



const fileFetcher = function(URL, path, callback) {

  request(URL, (error, response, body) => {
    
    console.log('error:', error); // Print the error if one occurred
    
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    let information = body;
    
    callback(path, information);
    
  });

}



const makeFile = (path, data) => {
  fs.appendFile(path, data, function(err) {
    if (err) throw err;
    let size = fs.statSync(path).size;
    console.log(`Downloaded and saved ${size} bytes to ${path}`);
  });
}


fileFetcher(URL, path, makeFile); 

//> node fetcher.js http://example.com/ ./index.html
//Downloaded and saved 3261 bytes to ./index.html