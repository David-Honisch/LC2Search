var submit = document.getElementById("submitbutton");
var clear = document.getElementById("resetbutton");

var imdb = require('imdb-api');
//events
submit.addEventListener("click", function (event) {
  event.preventDefault();

  var title = document.getElementById("title");

  if (title.value != "") {
    // Fetch details
    imdb.get(title.value, {
      apiKey: 'ee83247c',
      timeout: 30000
    }, function (err, movie) {
      // print out details
      displayIMDBResults(movie);
    });
  } else {
    // highlight the form field if empty
    title.style.borderColor = "red";
  }
  return false;
});
//eof events
function displayIMDBResults(res) {
  document.getElementById("result--title").innerText = ifExists(res.title);
  document.getElementById("result--year").innerText = ifExists(res._year_data);
  document.getElementById("result--rated").innerText = ifExists(res.rated);
  document.getElementById("result--release").innerText = ifExists(res.release);
  document.getElementById("result--runtime").innerText = ifExists(res.runtime);
  document.getElementById("result--genres").innerText = ifExists(res.genres);
  document.getElementById("result--director").innerText = ifExists(res.director);
  document.getElementById("result--writer").innerText = ifExists(res.writer);
  document.getElementById("result--actors").innerText = ifExists(res.actors);
  document.getElementById("result--plot").innerText = ifExists(res.plot);
  document.getElementById("result--languages").innerText = ifExists(res.languages);
  document.getElementById("result--country").innerText = ifExists(res.country);
  document.getElementById("result--awards").innerText = ifExists(res.awards);
  document.getElementById("result--rating").innerText = ifExists(res.rating);
  document.getElementById("result--votes").innerText = ifExists(res.votes);
  document.getElementById("result--type").innerText = ifExists(res.type);
  document.getElementById("result--imdburl").innerText = ifExists(res.imdburl);
  document.getElementById("result--poster").src = ifExists(res.poster);
  document.getElementById("imdblink").innerHTML = "<a href=\"" + ifExists(res.imdburl) + "\">" + ifExists(res.imdburl) + "</a>";
  var tog = "toggle";
  toggle_visibility(tog);
}
function showErrorMessage(res) {
  document.getElementById("result--title").innerText = "error";
}
