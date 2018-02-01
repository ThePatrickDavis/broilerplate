# Broilerplate

Broilerplate provides a CLI for generating boilerplate code. It was inspired by the ease to create components in angular, and the lack of a ClI for angular.js. 

## Getting Started

First install the tool using npm or yarn
```
npm install -g broilerplate
```

### Prerequisites

Node.js

### Installing

First install the tool using npm or yarn
```
npm install -g broilerplate
```
Create a `.broil` directory in the same directory your `.package.json' file resides.

## Create a broilerplate schematic

### Instructions

Create a directory in the `.broil` directory. 

Add at least one file to the directory

Use the broil command to create a new directory based on your schematic

### Example

```
cd .broil
mkdir foo
cd foo
touch component.js
echo "alert(\"this file is named [FileName]\");" >> component.js
cd ../..
broil foo bar
```

## Build With
* [node.js](https://nodejs.org/en/) 

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Patrick Davis** - *Initial work* - [ThePatrickDavis](https://github.com/ThePatrickDavis)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Zach Johnson, who's golfing is an inspiration.
