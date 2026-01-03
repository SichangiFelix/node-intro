const logger = require("./logger.js")
const path = require("path");
const os = require("os");
const fs = require("fs");

// Path
// var pathObj = path.parse(__filename);
// console.log(pathObj);

// logger.log("This is a log message.");

// OS
// var memory = os.version();
// console.log("OS Version: " + memory);

// File System
fs.readdir("./", function(err, files){
    if(err) console.log("Error", err);
    else console.log("Result", files);
});

