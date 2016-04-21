var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
   username: String,
   password: String
},{
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
