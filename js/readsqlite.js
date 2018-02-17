function Read() {

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


  cli.print(urls);
  if (urls.length > 1) {
    url = urls[1];
    console.log('Parameter 1:' + url);

  }
  try {
    // require('child_process').spawnSync("read _ ", {shell: true, stdio: [0, 1, 2]});
    db.SQLite().getTable('./lc.db', 'SELECT DISTINCT url name FROM url ORDER BY url limit 10');
  } catch (error) {
    console.error('Exception:' + error + '\n' + error.stack);
  }
}
new Read();