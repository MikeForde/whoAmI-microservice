// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  console.log(request);
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:tag", function (request, response) {
  // create return value
  var microResponse = {
    "unix": null,
    "natural": null
  };
  
  // find appended element
  var dateHopefully = request.params.tag;
  
  // See it is  a natural language date
  var natDate = new Date(dateHopefully);
  
  var bolNatdate = natDate.toString() === 'Invalid Date'? false: true;
  
  //  If not - is it a date in unix timestamp format
  if(!bolNatdate){
    var asIntDateHopefully = parseInt(dateHopefully);
    var unixDate = new Date(asIntDateHopefully);
    var bolUnixDate = unixDate.toString() === 'Invalid Date'? false: true;
    if(bolUnixDate){
      // convert unix timestamp and return both
      microResponse.natural = convertDate(unixDate);
      microResponse.unix = asIntDateHopefully;
    }
  } else {
    // convert natural date to unix timestamp and convert both
    var unixTS = natDate.valueOf();
    microResponse.unix = unixTS;
    microResponse.natural = convertDate(natDate);
  }
  
  // If it is then return an array (keypairs) with both natural and unix ts dates contained
  
  
  // If it contains neither return an array but with null keypairs
  response.send("{</br>&nbsp&nbsp'natural': " + microResponse.natural + "</br>&nbsp&nbsp'unix': " + microResponse.unix + "</br>}");
  //response.send("Try this .. " + unixDate);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
/*app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});*/


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function convertDate(datePassed){
  var year = 1900 + datePassed.getYear();
  var month = datePassed.getMonthName();
  var day = datePassed.getDate();
  day  = (day.toString().length == 1) ? ('0' + day) : day;
  
  return month + " " + day + ", " + year;
}

Date.prototype.getMonthName = function() {
    var monthNames = [ "January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December" ];
    return monthNames[this.getMonth()];
}
