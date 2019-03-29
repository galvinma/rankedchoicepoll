var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  joinUserOnlyEmail: function(email)
  {
    return new Promise((resolve, reject) => {
      var signup_user = new Users();
      signup_user.id = new ObjectId();
      signup_user.email = email.toUpperCase();
      signup_user.registered = false;

      signup_user.save(function(err)
      {
        if (err)
        {
          return reject({allow: false, message: "Unable to register user"})
        }
        else
        {
          return resolve({allow: false, user: signup_user.id, token: null})
        }
      })
    })
  }
}
