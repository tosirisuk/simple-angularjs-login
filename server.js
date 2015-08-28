var express = require('express');
var mongoose = require('mongoose');
var CryptoJS = require("crypto-js");
var port = 3000;
var http = require("http");
var https = require("https");
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

http.createServer(app).listen(80);
// https.createServer(options, app).listen(443);

app.use(express.static(__dirname + '/app'));
app.listen(port);



app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: 'app/'
  });
});

// var connection = mongoose.createConnection('mongodb://localhost:27017/mylogin');
mongoose.connect('mongodb://localhost:27017/mylogin');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  password: String
});

var tokenLoginSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  token: String
});


var User = mongoose.model('User', userSchema);
var TokenLogin = mongoose.model('TokenLogin', tokenLoginSchema);


app.get('/api/testget', function(req, res) {
  console.log(req.query);
  var test = req.query.test;
  console.log(test);
  res.status(200).send({
    status: "OK",
    message: test
  });
});


app.post('/api/loginservice', function(req, res) {
  if (req.body.username !== undefined && req.body.password !== undefined) {
    var username = req.body.username;
    var password = req.body.password;
  } else {
    var username = req.query.username;
    var password = req.query.password;
  }

  console.log(username);
  console.log(password);
  if (username !== null && password !== null) {
    User.findOne({
      username: username
    }, function(err, record) {
      if (err) {
        // console.log(err);
        res.status(403).send({
          status: 'ERROR'
        });
      } else {
        if (record && record.username === username && record.password === password) {
          // console.log("login going to success");
          var salt = Math.random();
          var SHA256 = require("crypto-js/sha256");
          var saltBeingHashed = SHA256("" + salt);
          var token = saltBeingHashed.toString(CryptoJS.enc.Base64);
          var newRecord = new TokenLogin();
          newRecord._id = new mongoose.Types.ObjectId();
          newRecord.username = username;
          newRecord.token = token;
          console.log("newRecord is " + newRecord);
          newRecord.save(function(err) {
            if (err) {
              console.log(err);
              return;
            } else {
              res.status(200).send({
                status: 'OK',
                token: token
              });
            }
            console.log('inserttoken sent OK');
            return;
          });

        } else if (record == null) {
          res.status(202).send({
            status: 'no user found'
          });
        } else if (record) {
          res.status(202).send({
            status: 'user and password do not match'
          });
        } else {
          res.status(403).send({
            status: 'ERROR'
          });
        }
      }
    });
  } else {
    res.status(403).send({
      status: 'ERROR'
    });
  }

});