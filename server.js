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

app.get("/api/whoami", function (req, response) {
  // create return value
  var microResponse = {
    "ipaddress": null,
    "language": null,
    "software": null
  };
  
  console.log(req);
  
  // determine key parameters
  //var ip = req.headers['x-forwarded-for'];
  //var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  var ip = req.ip.split(':')[3];
  microResponse.ipaddress = ip;
  
  var language = req.headers['accept-language'];
  microResponse.language = language;
  
  var software = req.headers['user-agent'];
  microResponse.software = software;
  
  response.send("{</br>&nbsp&nbsp'ipaddress': " + microResponse.ipaddress + "</br>&nbsp&nbsp'language': " + microResponse.language + "</br>&nbsp&nbsp'software': " + microResponse.software + "</br>}");
  //response.send("Try this .. " + req);
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
