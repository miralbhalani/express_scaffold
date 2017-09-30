var bcrypt = require("bcrypt")
var Promise = require('bluebird');
var jwt = require('jwt-simple');

var config = require('../../config/config');

var ext = {};

ext.getSalt = function(callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) {
        return callback(err);
    }
    callback(null,salt);
  });
};

ext.getHash = bcrypt.hash;



// bcrypt.hash(password, salt, function(err, hash) {
//       return callback(err, hash);
//     });

ext.cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};

ext.comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
       return err == null ?
           callback(null, isPasswordMatch) :
           callback(err);
   });
};

ext.jwtEncode = function jwtEncode(payload){
    return jwt.encode(payload, config.secret)
}
ext.jwtDecode = function jwtDecode(token){
    return jwt.decode(token, config.secret)
}

module.exports = Promise.promisifyAll(ext);