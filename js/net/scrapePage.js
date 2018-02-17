const https = require("https");
var extend = require('util')._extend;


function scrapePage() {
    this.counter = 0;
    this.scrape = require('website-scraper');
}
scrapePage.prototype.doScrape = function (targetFile, urls) {
    console.log(urls);
    var options = {
        urls: urls,
        directory: targetFile,
        //urlFilter: (url) => url.startsWith(url), // Filter links to other websites
        recursive: false,
        maxRecursiveDepth: 1,
        filenameGenerator: 'bySiteStructure',
        sources: [{
                selector: 'img',
                attr: 'src'
            },
            {
                selector: 'link[rel="stylesheet"]',
                attr: 'href'
            },
            {
                selector: 'link[rel="stylesheet"]',
                attr: 'href'
            },
            {
                selector: 'script',
                attr: 'src'
            }
        ]
    };
    // with promise
    return this.scrape(options).then((result) => {
        const line = '=====================';
        var list = {
            url: '',
            text: ''
        };
        var o = extend(result, {});
        list.url = o['0'].getUrl();
        list.text = o['0'].getText();
        var result = [];
        var list = this.getHyperLinks(list.url, list.text);
        var i = 0;
        for (var v in list) {
            result[i] = list[v].link;
            i++;
        }
        var IO = require('../../js/io/io.js');
        var io = new IO();
        io.writeFileSync(targetFile + '.json', JSON.stringify(result));
        console.log(JSON.stringify(result));
    }).catch((err) => {
        console.error(err);
        throw err;
    });
    // or with callback
    // this.scrape(options, (error, result) => {
    //     
    // });

}
scrapePage.prototype.doGetUrls = function (url) {
    var util = require("util"),
        http = require("http");
    var options = {
        url: url
    };
    console.log('URL:' + url);
    var content = "";

    var req = http.request(options, function (res) {
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
            content += chunk;
        });

        res.on("end", function () {
            util.log(content);
            console.log('Reading links:');
            // var links = getUrls(content);
            var links = this.getHyperLinks(content);
            // console.log('Printing links:'+links.length);
            // console.log(links);
            // console.log('Printing Loop links:');
            for (var l in links) {
                console.log('Element:');
                console.log(link);
                console.log(links[l].link);
            }
        });
    });
    req.end();
    return content;

}
scrapePage.prototype.getHyperLinks = function (url, text) {
    var result;
    var text;
    var linkscrape = require('linkscrape');
    linkscrape(url, text, function (links, $) {
        result = links;
        // console.log(links[0].href); //is 'http://google.com' 
        // for (var link in links)
        //     console.log(link.href);
    });
    return result;
}
scrapePage.prototype.scrapeIt = function (text) {
    scrapeIt("https://ionicabizau.net", {
        articles: {
            listItem: ".article",
            data: {
                createdAt: {
                    selector: ".date",
                    convert: x => new Date(x)
                },
                title: "a.article-title",
                tags: {
                    selector: ".tags",
                    convert: x => x.split("|").map(c => c.trim()).slice(1)
                },
                content: {
                    selector: ".article-content",
                    how: "html"
                }
            }
        }
    }, (err, page) => {
        console.log(err || page);
    });
}
module.exports = scrapePage;