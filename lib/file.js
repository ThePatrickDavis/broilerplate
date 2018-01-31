var fs = require('fs');
var path = require('path');

module.exports = {
    directoryExists: function(filePath) {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },
    fileExists: function(filePath) {
        try {
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }     
    },
    getCssFriendlyName: function(name) {
        let newString = '';
        for (var i = 0; i < name.length; i++) {
            let curChar = name.charAt(i);
            if(i > 0 && curChar === curChar.toUpperCase()) {
                newString += '-';
            }
            newString += curChar.toLowerCase();
        }
        return newString;
    },
    getCurrentPath: function() {
        return process.cwd();
    },
    getParentDirectory: function(currentDirectoryName) {
        const sep = path.sep;
        const split = currentDirectoryName.split(sep);
        split.pop();
        return split.join(sep);
    }



}