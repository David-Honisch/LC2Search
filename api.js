function HttpRequest() {
    this.url = 'http://letztechance.org/webservices/client.php?IsSort=0&cdate=2017-12-08%2014:07:52&subject=Your%20subject&body=Your%20content&query=.exe&user=&pass=&value1=1&value2=1&value3=15&startdate=1304200800&enddate=1306879199&q=getIndexJSON&u_id=undefined&sid=1&isPHPCode=1&&&isDebug=false&submit=Execute&submit=Execute';
}
HttpRequest.prototype.getIndex = function () {
    var request = require("request");
    var url = 'http://letztechance.org/webservices/client.php?IsSort=0&cdate=2017-12-08%2014:07:52&subject=Your%20subject&body=Your%20content&query=.exe&user=&pass=&value1=1&value2=1&value3=15&startdate=1304200800&enddate=1306879199&q=getIndexJSON&u_id=undefined&sid=1&isPHPCode=1&&&isDebug=false&submit=Execute&submit=Execute';
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var result = '';
            for (var v in body) {
                result += "<a href=\"./LC2Intro2.0/index.html?q=http://letztechance.org/list-"+ body[v].id + "-1.html\" target=\"_blank\">"+ body[v].name + "</a><br/>";
            }
            document.getElementById("indexresults").innerHTML = "" + result;
        }
    })
}
HttpRequest.prototype.getNews = function () {
    var request = require("request");
    var url = 'http://letztechance.org/webservices/client.php?value1=1&value2=1&value3=15&q=getListJSON';
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var result = '';
            for (var v in body) {
                result += "<a href=\"./LC2Intro2.0/index.html?q=http://letztechance.org/read-1-"+ body[v].id + ".html\" target=\"_blank\">"+ body[v].subject + "</a><br/>";
            }
            document.getElementById("newsresults").innerHTML = "" + result;
        }
    })
}
HttpRequest.prototype.getGames = function () {
    var request = require("request");
    var url = 'http://letztechance.org/webservices/client.php?q=getGames&value1=24&value2=1';
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var result = '';            
            for (var v in body) {
                result += "<a href=\"http://letztechance.org/games/"+ body[v] + "\" target=\"_blank\">"+ body[v] + "</a><br/>";
            }
            document.getElementById("gamesresults").innerHTML = "" + result;
        }
    })
}
HttpRequest.prototype.getSearch = function (pattern) {
    var request = require("request");
    document.getElementById("searchresults").innerHTML = "Reading:<br>" + url;
    var url = 'http://letztechance.org/webservices/client.php?value1=1&value2=1&value3=15&q=getSearch&query=' + pattern;
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var result = '';
            for (var v in body) {
                // result += body[v].subject + "<br/>";
                result += "<a href=\"./LC2Intro2.0/index.html?q=http://letztechance.org/read-1-"+ body[v].id + ".html\" target=\"_blank\">"+ body[v].subject + "</a><br/>";
            }
            document.getElementById("searchresults").innerHTML = "<hr>" + result;
        }
    })
}
HttpRequest.prototype.getImprint = function () {
    var request = require("request");
    var url = 'http://letztechance.org/webservices/client.php?q=getReadJSON&value1=76&value2=1';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            document.getElementById("imprintresult").innerHTML = "" + body.body;
        }
    })
}
HttpRequest.prototype.extractHTML = function (id) {
    var request = require("request");
    var url = 'http://letztechance.org/webservices/client.php?q=getReadJSON&value1=76&value2=1';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var Extrator = require("html-extractor");
            var myExtrator = new Extrator();
            var result = '';
            myExtrator.extract( body, function( err, data ){
                if( err ){
                    throw( err )
                } else {
                    console.log(JSON.stringify( data));
                    document.getElementById(id).innerHTML = "" + data.body;
                }
            });
 


        }
    })
}
function ifExists(obj) {
    return (obj !== "N/A" ? obj : "");
}
function toggle_visibility(className) {
    $('.' + className).toggle();
}