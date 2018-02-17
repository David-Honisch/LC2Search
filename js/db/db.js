var extend = require('util')._extend;
var SQLite = require('./sqlite.js');

function DB()
{
    this.db;
    this.SQLite;
    this.MySQLLite;
}
DB.prototype.SQLite = function()
{
    this.db = new DB();
    this.SQLite = new SQLite();
    return extend(this.SQLite,this.db);  
}
DB.prototype.MySQL = function(options)
{
    this.db = new Server();
    this.SQLite = new SQLite();
    throw new Error('Not implemented yet !!');
    //return extend(this.SQLite,this.db); 
}
module.exports = DB;