var express = require('express');
var app = express();
var routes = require('./server/routes');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://brandon:password@ds059888.mlab.com:59888/chatterbox', (err, database) => {
    if (err) {
        console.log(err)
    } else {
        db = database
        app.listen(8080, 'localhost', function () {
            console.log("listening on port 8080");
        });
    }
})

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    db.collection('chats').find({room: 'public'}).limit(10).toArray(function(err, results) {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.status(200);
            res.json(results);
            return;
        }
    })
})

app.post('/', function (req, res) {
    db.collection('chats').save(req.body, (err, result) => {
        if (err) {
            res.status(400);
            console.log(err);
            return;
        } else {
            res.status(201);
            res.end();
        }
    })
})

app.get('/login', function (req, res) {
    //display login.html
})

app.post('/login', function (req, res) {
    //get user from DB
    //check if password matches
    //create session
    //redirect to index
})

app.get('/signup', function (req, res) {
    //render signup .html
})

app.post('/signup', function (req, res) {
    //check if username exists in DB
    //hash password and store in DB
    //create session
    //redirect to index
})



