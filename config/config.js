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
  var collection = db.collection("utenti") ;
  io.on('connection', function(socket){
    socket.on('registrazione', function (data) {
        collection.count({username:data.username}, function(err, count) {
            if(count==1){
                socket.emit('risultato',{messaggio:"nickname già esistente",cod:0});
            }else{
                collection.count({email:data.email}, function(er, conta) {
                    if(conta==1){
                        socket.emit('risultato',{messaggio:"email già esistente",cod:1});
                    }else{
                        collection.insertOne({nome: data.nome, cognome: data.cognome,username:data.username,password:data.password,email:data.email}, function(err, r) {});  
                         socket.emit('risultato',{messaggio:"Registrazione avvenuta con successo",cod:2});
                    }
                });
            }

        
        });
          
    });
  });
});








module.exports = server;
