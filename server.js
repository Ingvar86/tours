'use strict'
var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//   res.send('Hello world!');
// });

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
