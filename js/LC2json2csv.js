function JSON2CSV(options) {
  var result = "";
  try {
    var IO = require('./js/io/io.js');
    var io = new IO();
    var fileName = process.argv[2];
    var content = '';
    if (process.argv.length > 2) {
      fileName = process.argv[2];
      content = io.readFileSync(fileName);
      if (JSON.stringify(content).length > 0) {
        var data = JSON.parse(content);
        for (var v in data) {
          result += data[v] + ';\n';
        }
        io.writeFileSync('./save/import.csv', result);
      }
    }
    else {
      result = result !== undefined && result.length >0?result:'Bad Request';
    }
  } catch (error) {
    console.error('Exception:' + error + '\n' + error.stack);
  } finally {
    console.log((result !== undefined && result.length >0)?result:'Bad Request');
  }
}
new JSON2CSV();