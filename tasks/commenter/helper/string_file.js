var fs = require("fs");
var libPath = require("path");

var Helper_StringFile = function(path, fileName){
    var allPath = libPath.join(path, fileName);
    return fs.readFileSync(allPath, 'utf8');
};

module.exports = Helper_StringFile;
