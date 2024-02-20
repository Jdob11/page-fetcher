const request = require('request');
const args = process.argv;

request('http://www.example.edu', (error, response, body) => {
  console.log('\x1b[32m' + 'error: ' + '\x1b[33m' + error + '\x1b[0m'); // Print the error if one occurred
  console.log('\x1b[32m' + 'statusCode: ' + '\x1b[33m' + response.statusCode + '\x1b[0m');// Print the response status code if a response was received
  console.log('\x1b[32m' + 'body: ' + '\x1b[0m' + body); // Print the HTML for the Google homepage.
});
