// server.js
// where your node app starts

// init project
var myApp = require('./myApp');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// /api/timestamp/date_string
app.get('/api/timestamp/:date_string', function (req, res) {
    var date = null;
    console.log(`date_string = ${req.params.date_string}`);
    
    // Is the date_string empty?
    if (req.params.date_string === '') {
        date = new Date();
    }
    else {
        date = new Date(req.params.date_string);        
    }

    console.log(date);
    console.log(date.toString() === "Invalid Date");

    if (date.toString() === "Invalid Date") {        
        res.json({"error": date});
    }
    else {
        res.json({"unix": date.getTime(), "utc": date.toString()});
    }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});