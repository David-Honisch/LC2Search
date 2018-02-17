'strict mode'
const fs = require("fs");
function IO() {

}
IO.prototype.Pause = function (func) {
    console.log('Press any key to continue.');
    process.stdin.once('data', function () {
        func();
    });
}
IO.prototype.exists = function (filePath) {
    var result = false;
    if (fs.existsSync(filePath)) {
        result = true;
    }
    return result;

}
IO.prototype.readFileSync = function (file) {
    var fs = require('fs');
    return fs.readFileSync(file).toString();
}
IO.prototype.writeFileSync = function (file, text) {
    var fs = require('fs');
    fs.writeFileSync(file, text);
}
IO.prototype.json2csv = function (data, fields) {
    try {
        var json2csv = require('json2csv');
        return json2csv({ data: data, fields: fields });
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}
IO.prototype.doGetFiles = function (url) {
    console.log('Get Table');
    const fs = require('fs');
    const { URL } = require('url');
    const fileUrl = new URL(url);
    var text = fs.readFileSync(fileUrl);
    var links = getUrls(text);
    console.log(links);

}
IO.prototype.delete = function (filePath) {
    var fs = require('fs-extra');
    var isDone = false;
    var isDir = fs.lstatSync(filePath).isDirectory();
    if (!isDir) {
        fs.unlinkSync(filePath);
    }
    else {
        fs.removeSync(filePath);
    }
}
IO.prototype.zipDir = function (file, dir) {
    var nodeJsZip = require("nodeJs-zip");
    nodeJsZip.zip([dir, file]);
}
module.exports = IO;
// function GoogleAPI() {
//     //const url = 'https://www.exxoshost.co.uk/atari/games/automation/AUTOMATION2015A.htm';
//     /* const url =
//       "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
//     console.log(url);
//     https.get(url, res => {
//       res.setEncoding("utf8");
//       let body = "";
//       res.on("data", data => {
//         body += data;
//       });
//       res.on("end", () => {
//         body = JSON.parse(body);
//         console.log(
//           `City: ${body.results[0].formatted_address} -`,
//           `Latitude: ${body.results[0].geometry.location.lat} -`,
//           `Longitude: ${body.results[0].geometry.location.lng}`
//         );
//       });
//     }); */
//   }
//   //
//   /* var readlineSync = require('readline-sync');
//   while(true) {
//     var input = readlineSync.question("What is your input?");
//     if(input === 'exit') {
//       process.exit();
//     } else {
//       console.log("Your input was " + input);
//     }
//   } */