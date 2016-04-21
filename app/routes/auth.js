var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

router.post('/authenticate', function(req, res) {
  //console.log(req);
  User.findOne({
    username: req.body.username
  }, function(err, user) {
  	//console.log("ok, encontre el usuario");
    if (err) throw err;
    //console.log(user);
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // Great, user has successfully authenticated, so we can generate and send them a token.
          var expires = moment().add('hours', 1).valueOf()
          var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
          var token = jwt.encode(
            {
              iss: user.id,
              exp: expires,
              origin: ip
            },
            config.SECRET_TOKEN
          );
        res.json({
          success: true,
          message: 'Token successfully created!',
          token: token
        });
      }
    }
  });
});

module.exports = router;
