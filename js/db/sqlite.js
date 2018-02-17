const sqlite3 = require('sqlite3').verbose();
var extend = require('util')._extend;
function SQLite()
{

}
SQLite.prototype.getArguments = function(index)
{
    // process.argv.forEach(function (val, index, array) {
    //     console.log(index + ': ' + val);
    //   });
}
SQLite.prototype.getTable = function (file, select) {
    // open the database
    // let db = new sqlite3.Database('./lc.db');
    let db = new sqlite3.Database(file);  
    // let sql = `SELECT DISTINCT url name FROM url
    //          ORDER BY url limit 10`;
    let sql = select;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log('Exception:' + err);
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.name);
      });
    });
  
    // close the database connection
    db.close();
    //
    console.log('DONE.');
  }
  
module.exports = SQLite;