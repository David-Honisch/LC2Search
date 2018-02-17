var btnSearch = document.getElementById("submitsearch");
var http = require('http');
new HttpRequest().getIndex();
new HttpRequest().getNews();
new HttpRequest().getGames();
new HttpRequest().getImprint();
//events
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("searchresults").innerHTML = "Initializing...";
  var query = document.getElementById("query");
  if (query.value != "") {
    alert(query.value);
    document.getElementById("searchresults").innerHTML = "Scanning...";
    new HttpRequest().getSearch(query.value);
  } else {
    query.style.borderColor = "red";
  }
  return false;
});