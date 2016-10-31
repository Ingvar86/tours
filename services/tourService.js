'use strict'
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MONGOLAB_URI
const pageSize = 50;

exports.insertMany = function(tours, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('tours').insertMany(tours, (err, records) => {
            assert.equal(null, err);
            db.close();
            if (callback) {
                callback(records);
            }
        });
    });
}

exports.find = function(query, callback) {
    let q = getQuery(query);
    let page = query.page;
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        var collection = db.collection('tours');
        collection.find(q).sort({price: 1}).limit(page*pageSize).toArray((err, tours) => {
            assert.equal(null, err);
            db.close();
            if (callback) {
                callback(tours);
            }
        });   
    });
}

function getQuery(query) {
    let dateFrom = query.dateFrom;
    let dateTo = query.dateTo;
    let nights = query.nights;
    let hotel = query.hotel;
    let room = query.room;
    var q = {from: {$gte: new Date(dateFrom), $lte: new Date(dateTo)}, nights: nights};
    if (hotel) {
        q.hote = hotel;
    }
    if (room) {
        q.room = room;
    }
    return q;
}