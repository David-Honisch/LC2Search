var extend = require('util')._extend;


function AdvancedServer() {
    this.Simple = this.Simple;
}
AdvancedServer.prototype.Advanced = function () {
    var path = require('path');
    var cfg = require(path.join(__dirname, '../../../config/config.json'));
    console.log('Port:' + cfg.port + ' Title:' + cfg.title);
    var express = require("express");
    var app = express();

    //Creating Router() object

    var router = express.Router();

    // Provide all routes here, this is for Home page.
    router.use(function (req, res, next) {
        console.log("/"+JSON.stringify(req.query)+ "" + req.method);
        next();
    });

    router.get("/", function (req, res) {
        var IO = require(path.join(__dirname, '../../js/io/io.js'));
        var io = new IO();
        var text = io.readFileSync(path.join(__dirname, '../../html/index.html'));
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(text);
        res.end();
    });
    router.get("/info", function (req, res) {
        res.json({
            "message": "API Info"
        });
    });
    router.get("/api", function (req, res) {
        res.json([{
                "message": ["LetzteChance.Org"],
                "title": ["LetzteChance.Org"],
                "version": ["1.2"],
                "port": [cfg.port]

            },
            {
                "message": ["API"]

            },
            {
                "message": ["1.2"]

            }
        ]);
    });
    router.get("/restapi", function (req, res) {
        res.json([{
                "message": ["LetzteChance.Org"]

            },
            {
                "message": ["API"]

            },
            {
                "message": [""+ req.query.q]

            },
            {
                "message": [""+ req.body]

            },
            {
                "message": [""+ JSON.stringify( req.query)]

            }
        ]);
    });
    router.get("/kodi", function (req, res) {
        var IO = require(path.join(__dirname, '../../js/io/io.js'));
        var io = new IO();
        var text = io.readFileSync(path.join(__dirname, '../../html/index.html'));
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(text);
        res.end();
    });

    // Tell express to use this router with /api before.
    // You can put just '/' if you don't want any sub path before routes.
    app.use("/", router);
    app.use("/info", router);
    app.use("/api", router);
    app.use("/restapi", router);
    app.use("/kodi", router);

    // Listen to this Port

    app.listen(cfg.port, function () {
        console.log("Live at Port " + cfg.port);
    });

}
AdvancedServer.prototype.Simple = function () {
    var http = require('http');
    var path = require('path');
    var cfg = require(path.join(__dirname, '../../../config/config.json'));
    // var Adv = require('./AdvancedServer.js');    
    http.createServer(function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(cfg.title);
        res.end();
    }).listen(cfg.port);
}
module.exports = AdvancedServer;