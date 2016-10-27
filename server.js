'use strict'
var express = require('express');
var app = express();
var tourService = require('./services/tourService');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/api/tours', (req, res) => {
    tourService.find(req.query, tours => res.send(tours));
    // res.send([{
    //   from: new Date(), 
    //   hotel: 'Test hotel',
    //   nigths: 7,
    //   meal: 'AL',
    //   price: 123,
    //   room: 'Standart',
    //   currency: 'USD',
    //   checkDate: new Date()}]);      
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
