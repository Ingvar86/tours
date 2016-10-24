'use strict'
var fs = require("fs"),
    request = require("request"),
    cheerio = require("cheerio"),
    iconv = require('iconv-lite'),
    tourService = require('./services/tourService'),
    url = 'http://online.joinup.ua/search_tour?samo_action=PRICES&TOWNFROMINC=37&STATEINC=9&TOURINC=0&PROGRAMINC=0&CHECKIN_BEG=20161111&NIGHTS_FROM=7&CHECKIN_END=20161125&NIGHTS_TILL=7&ADULT=2&CURRENCY=2&CHILD=0&TOWNTO_ANY=0&TOWNTO=NaN%2C1839&STARS_ANY=1&STARS=&hotelsearch=0&HOTELS_ANY=1&HOTELS=&MEAL=&FREIGHT=1&FILTER=0&MOMENT_CONFIRM=0&HOTELTYPES=&PACKET=0&PRICEPAGE=1';

function getTours(data) {
    var response = data.match(/\(\'.*\'\)/)[0].slice(2, -2).replace(/\\\"/g, '"').replace(/\\n/g, '').replace(/\\\s/g,'');
    var $ = cheerio.load(response);
    var prices_info = $('tr.price_info');
    var tours = [];
    for (let i = 0; i < prices_info.length; i++){
      let tour = new Tour(prices_info.eq(i));
      tours.push(tour);
    }
    return tours;
}

function Tour(price_info) {
    let fromDate = price_info.find('td[data-label="Заезд"]').text().match(/\d{2}\.\d{2}\.\d{4}/)[0].match(/\d+/g);
    this.from = new Date(Date.UTC(fromDate[2], fromDate[1], fromDate[0]));    
    this.nights = price_info.find('td[data-label="Ночи"]').text().match(/\d+/)[0];
    this.hotel = price_info.find('td[data-label="Гостиница"] a').text();
    this.meal = price_info.find('td[data-label="Питание"]').text().match(/\w+/)[0];
    this.room = price_info.find('td[data-label="Номер"]').text();
    let temp = price_info.find('td[data-label="Стоимость"]').text().match(/\w+/g);
    this.price = temp[0];
    this.currency = temp[1];
    this.checkDate = new Date();
}

exports.fetchTours = function () {
  request({url: url, encoding: null}, (error, response, body) => {
    if (error) throw err;
    var data = iconv.decode(body, 'win1251');
    let tours = getTours(data.toString());
    tourService.insertMany(tours, () => {
      console.log('tours were added');
    });
  });
}