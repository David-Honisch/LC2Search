function Read() {
  const uuidv4 = require('uuid/v4');
  var uuid = uuidv4();
  var urls = [];
  var counter = 0;
  var CLI = require('./js/cli.js');
  var cli = new CLI();
  var DB = require('./js/db/db.js');
  var db = new DB();
  var IO = require('./js/io/io.js');
  var io = new IO();
  var ScrapePage = require('./js/net/scrapePage.js');
  var scrapePage = new ScrapePage();

  try {
    urls = cli.getArguments();
    if (urls.length > 1) {
      urls.splice(0,2);
      // for (var url in urls)
      //   console.log(urls[url]);
      var path = require('path');
      var targetFile = path.join(__dirname, './save/_' + uuid + '_temp.html');
      if (io.exists(targetFile)) {
        io.delete(targetFile);
      }
      scrapePage.doScrape(targetFile, urls);
    }
  } catch (error) {
    console.error('Exception:' + error + '\n' + error.stack);
  }
}
new Read();