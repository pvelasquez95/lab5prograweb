var express = require('express');
var app = express();
app.listen(3000);
console.log('Log listening on port 3000...')
app.use(express.json())


var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/juegos';
var db;

mongo.connect(url, function(err, client) {
  if(!err) {
    console.log("We are connected");
    db = client.db('juegos');
  }
});



app.get('/api/juegos/', function(req, res, next) {
  db.collection('juegos').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send({juegos: result})
  })
});

app.get('/api/juegos/:id', function(req, res, next) {
  db.collection('juegos').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send({juegos: result})
  })
});

app.post('/api/juegos/', function(req, res, next) {
  const juego = {
    name:req.body.name
    ,platform:req.body.platform
    ,memo:req.body.memo
    ,rate:req.body.rate
    ,photo:req.body.photo
  }
  db.collection('juegos').insertOne(juego, function(err, result){
    assert.equal(null, err);
    if (err) return console.log(err)
    console.log("Item inserted");
    res.status(201).send(result);
  });
});

app.put('/api/juegos/:id', function(req, res, next) {
  var id = req.params.id;
  const item = {
    name:req.body.name
    ,platform:req.body.platform
    ,memo:req.body.memo
    ,rate:req.body.rate
    ,photo:req.body.photo
  }

  db.collection('juegos').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
    assert.equal(null, err);
    console.log('Item updated');
    res.status(204).send(item);
  });
  
});

app.delete('/api/juegos/:id', function(req, res, next) {
  var id = req.params.id;
  db.collection('juegos').deleteOne({"_id": objectId(id)}, function(err, result) {
    assert.equal(null, err);
    if (err) return console.log(err)
    console.log('Item deleted');
    res.status(204).send(result);
  });
});
