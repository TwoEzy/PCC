var app = require('../app');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbName = 'PCC';

var url = 'mongodb://localhost:27017/'+ dbName;
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  io.on('connection', function(socket){
      
    socket.on('registrazione', function (data) {
      console.log(data)
        insertDocuments(db,'utenti',[{nome: data.nome, cognome: data.cognome,username:data.username,password:data.password,email:data.email,}], (data)=>{})
    });
  });
});




//Functions

var insertDocuments = function(db,collection, documents ,callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents
    collection.insertMany(
        documents, function(err, result) {
            assert.equal(err, null);
            assert.equal(documents.length, result.result.n);
            assert.equal(documents.length, result.ops.length);
            console.log("Inserted " + documents.length + " documents into the document collection");
            callback(result);
        });
};

var findDocuments = function(db,collection, condition, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.find(condition).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
    });
};

var distinctDocuments = function(db,collection, condition, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.distinct(condition).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
    });
};

var countDocuments = function(db,collection, condition, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.count(condition, function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following number");
        console.dir(docs);
        callback(docs);
    });
};



module.exports = server;
