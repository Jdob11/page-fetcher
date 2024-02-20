const request = require('request');
const fs = require('fs');
const readline = require('readline');

// get command line arguments
const args = process.argv;
let content = "";

// function to request URL provided as command line argument
const fileRequest = function(cb) {
  request(args[2], (error, response, body) => {
    // checks to handle errors and invalid status codes
    if (error) {
      console.error("Error occurred while fetching the URL:", error);
      process.exit(1);
    }
    if (response.statusCode !== 200) {
      console.error("Invalid URL. Server responded with status code:", response.statusCode);
      process.exit(1);
    }
    // if request is successful, assign body to content variable
    content = body;
    // call callback to proceed with writing file
    cb();
  });
};

// function to confirm if file already exists and check if user wants to overwrite, before proceeding to fileWrite
const handleFileWrite = function() {
  // check to see if the file already exists
  if (!fs.existsSync(args[3])) {
    // if file doesn't exist, write file
    writeFile();
  } else {
    // if file exists, ask to overwrite
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`${args[3]} already exists. Do you want to overwrite it? (Y/N) `, (answer) => {
      // if yes, write the file
      if (answer.toLowerCase() === 'y') {
        writeFile();
      } else {
        // if no, exit without overwriting
        console.log("Exiting the application without overwriting the file.");
        process.exit(0);
      }
      rl.close();
    });
  }
};

// function to write content to file
const writeFile = function() {
  fs.writeFile(args[3], content, err => {
    // check for errors
    if (err) {
      console.error("Error occurred while writing the file:", err);
      process.exit(1);
    } else {
      // give success message using length the determine bytes if successful
      console.log(`Downloaded and saved ${content.length} bytes to ${args[3]}`);
    }
  });
};

// check that URL is given in command line
if (!args[2]) {
  console.error("Please provide a URL.");
  process.exit(1);
}

// check that file path is given in command line
if (!args[3]) {
  console.error("Please provide a file path.");
  process.exit(1);
}

// run nested callback to request and write file
fileRequest(handleFileWrite);
