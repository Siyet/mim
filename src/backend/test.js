var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.setHeader("timestamp", `${new Date().getTime()}`);
  res.send(`timestamp:${new Date().getTime()}`);
  console.log("qqqq")
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});