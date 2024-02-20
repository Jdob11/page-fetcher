const request = require('request');
const fs = require('fs');
const args = process.argv;
let content = "";

//function to request url given in command line argument. assign to variable 'content' then run call back function ones file is returned
const fileRequest = function (cb) {
request(args[2], (error, response, body) => {
  content = body;
  cb();
});
}

//function to write requested file to location given as command line argument, which will be passed into fileRequest as callback to run asynchronously
const fileWrite = function () {
  fs.writeFile(args[3], content, err => {
  if (err) {
    console.error(err);
  } else {
    //console log using character length of body to determine bytes recieved
    console.log(`Downloaded and saved ${content.length} bytes to ${args[3]}`)
  }
});
}

fileRequest(fileWrite);
