var jwt = require('jwt-simple');
var User = require('../../models/user.js');
var config = require('../../config/index.js');

var securitize = function(req, res, next){
	var token = (req.body && req.body.access_token) || req.query.token || req.headers["x-access-token"];
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	//console.log("dentro", ip)
	if (token) {
		try {
			var decoded = jwt.decode(token, config.SECRET_TOKEN);
			if (decoded.exp <= Date.now()) {
				return res.status(403).json('Access token has expired')
			}
			User.findOne({ '_id': decoded.iss }, function(err, user){
				//console.log(err, user);
				if (!err) {
          if (decoded.origin!=ip) {
          	return res.status(403).json('Access token has been forged')
          }
        	next()
				}
			})
		} catch (err) {
			//console.log(err);
			return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
		}
	} else {
		return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
	}
}

module.exports = securitize;
