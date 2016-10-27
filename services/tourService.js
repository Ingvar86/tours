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
    let dateFrom = query.dateFrom;
    let dateTo = query.dateTo;
    let nights = query.nights;
    let page = query.page;
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        var collection = db.collection('tours');
        collection.find({
            $and: [ {from: {$gte: new Date(dateFrom)}}, {from: {$lte: new Date(dateTo)}}],
            nights: nights
        }).sort({price: 1}).limit(page*pageSize).toArray((err, tours) => {
            assert.equal(null, err);
            db.close();
            if (callback) {
                callback(tours);
            }
        });   
    });
}