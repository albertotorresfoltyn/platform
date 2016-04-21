// Confiigure and setup express
var express        =  require('express');
var app            = express();
var bodyParser     = require('body-parser');
// Get security ready to be used
var security       = require('./routes/auth.js');
var User           = require('./models/user.js');
var securitize     = require ('./utils/security/securitize.js')
// Connect to database - JUST FOR USER AUTHENTICATION
var mongoose       = require('mongoose');
mongoose.connect('mongodb://localhost/gd');
// setup the application logger
var logger         = require('morgan');
// access database through monk. This is for accessing entities :D
var monk           = require("monk");
var db             = monk('localhost/gd');
// allow cors to express application
var cors           = require('cors')

// Setup body parser as application json to be able to process requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// This filters the calls. it works fine
/*var whiteList = {
    "http://localhost:5000": true,
    "https://example-url.herokuapp.com": true
};
var allowCrossDomain = function(req, res, next) {
  if(whiteList[req.headers.origin]){
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept');
    next();
  }
};
app.use(allowCrossDomain);*/


//setup router
var router = express.Router();

// setup security routes. authenticate and logout
//note: security depends from app, not router hence, it escape to the router securitize
app.use('/security',security);
//add the router to /api route. From now all routes /api will be handled by router
app.use('/api', router);

//Add security layer to the router (not to all app routes)
router.use(securitize); //always pass all routes through securitize function

// Tests purposes only
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// DEFINE OUR ROUTES -------------------------------
router.get('/:entity', function(req, res, next) {
  const entityName = req.params.entity;
  console.log(entityName);
	console.log(req.query);
  entity = db.get(entityName);
  entity.find({}, {}, function (err, docs) {
    if (err) {
      return console.error(err);
    } else {
      //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
      res.json(docs);
    }
  })
});

router.post('/:entity', function(req, res, next) {
  const entityName = req.params.entity;
  entity = db.get(entityName);
  const obj = req.body
  entity.insert(obj, function (err, blob) {
    if (err) {
        res.send("There was a problem adding the information to the database.");
    } else {
      //Blob has been created
      res.json(blob);
    }
  });
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
});
