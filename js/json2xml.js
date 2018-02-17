function Read() {
  const uuidv4 = require('uuid/v4');
  var uuid = uuidv4();  
  var url = 'https://www.exxoshost.co.uk/atari/games/automation/AUTOMATION2015A.htm';
  var url2 = 'https://www.cnn.com';
  var urls = [url, url2];
  var counter = 0;
  var CLI = require('./js/cli.js');
  var cli = new CLI();
  var DB = require('./js/db/db.js');
  var db = new DB();
  var IO = require('./js/io/io.js');
  var io = new IO();
  var ScrapePage = require('./js/net/scrapePage.js');
  var scrapePage = new ScrapePage();
  // cli.print(urls);
  if (urls.length > 1) {
    url = urls[1];
  }
  try {
    var path = require('path');
    var targetFile = path.join(__dirname, './save/_' + uuid + '_temp.html');
    if (io.exists(targetFile)) {
      io.delete(targetFile);
    }
    scrapePage.doScrape(targetFile, urls);
  } catch (error) {
    console.error('Exception:' + error + '\n' + error.stack);
  }
}
new Read();