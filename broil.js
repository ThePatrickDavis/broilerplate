#! /usr/bin/env node
const file = require('./lib/file');
const fs = require('fs');
const path = require('path');

const  broilDirectory = '.broil';
let workingPath = file.getCurrentPath();
let currentPath = workingPath;
let templateName = null;
let fileName = null;

while(currentPath && !file.fileExists(path.join(currentPath, 'package.json'))) {
    currentPath = file.getParentDirectory(currentPath);
}

const broilPath = path.join(currentPath, broilDirectory);

if(!file.directoryExists(broilPath)) {
    console.error('.broil directory must exist to use the broil command');
} else {
    // Match the template with the command line input
    if(process.argv.length <= 2) {
        console.log('Please specify a template name');
    } else if(process.argv.length <= 3) {
        console.log('Please specify a file name');
    } else {
        templateName = process.argv[2];
        fileName = process.argv[3];

        let templatePath = path.join(broilPath, templateName);
        // Always add file name by defualt to replacement maps
        let replacementObject = {
            'fileName': fileName.charAt(0).toLowerCase() + fileName.slice(1), 
            'FileName': fileName.charAt(0).toUpperCase() + fileName.slice(1), 
            'file-name': file.getCssFriendlyName(fileName)
        };
        if(file.directoryExists(templatePath)) {
            let templateFiles = fs.readdirSync(templatePath);
            let newPath = path.join(workingPath, fileName.toLowerCase());
            fs.mkdirSync(newPath);
            templateFiles.forEach((file) => {
                let data = processTemplate(path.join(templatePath, file), fileName, replacementObject);
                // Write out files with new values
                let newFileName = path.join(newPath, fileName.toLowerCase() + '.' + file);
                console.log('Broiling up ' + fileName.toLowerCase() + '.' + file);
                fs.writeFile(newFileName, data, { encoding: 'utf8'}, (error) => handleWriteError(error));
            });
        } else if(file.fileExists(templatePath)) {

        } else {
            console.log('No template exists for \'' + templateName + '\'');
        }
    }
}

function handleWriteError(error) {
    if(error) {
        console.log('Error: ' + error);
    }
}

function processTemplate(templatePath, fileName, replacementDictionary) {
    let buffer = fs.readFileSync(templatePath, 'utf8');
    for(let property in replacementDictionary) {
        if(replacementDictionary.hasOwnProperty(property)) {
            let prop = '\\[' + property + '\\]';
            buffer = buffer.replace(new RegExp(prop, 'g'), replacementDictionary[property]);
        }
    }
    return buffer;
}

return;