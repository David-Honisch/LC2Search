var extend = require('util')._extend;

function Server()
{
    
}
Server.prototype.Simple = function()
{
    var http = require('http');
    var path = require('path');
    var cfg = require(path.join( __dirname, '../../../config/config.json'));
    console.log(cfg);
    // var cfg = require( ___dirname+'../../config/config.json');
    console.log('Port:'+cfg.port+' Title:'+cfg.title);
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(cfg.title);
    //   res.end();
    }).listen(cfg.port);
}
Server.prototype.FileServer = function()
{
    var http = require('http');
    var path = require('path');
    var cfg = require(path.join( __dirname, '../../../config/config.json'));
    var IO = require(path.join( __dirname, '../../js/io/io.js'));
    var io = new IO();
    var text = io.readFileSync(path.join( __dirname, '../../html/index.html'));    
    console.log('Port:'+cfg.port+' Title:'+cfg.title);
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(text);
      res.end();
    }).listen(cfg.port);
}
Server.prototype.Advanced = function()
{
    var http = require('http');
    var path = require('path');
    var cfg = require(path.join( __dirname, '../../../config/config.json'));
    var Adv = require('./AdvancedServer.js');
    var adv = new Adv();
    adv.Advanced([]);
}
module.exports = Server;