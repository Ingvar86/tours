'use strict'
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.MONGOLAB_URI

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
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        var collection = db.collection('tours');
        collection.find(query).toArray((err, tours) => {
            assert.equal(null, err);
            db.close();
            if (callback) {
                callback(tours);
            }
        });   
    });
}