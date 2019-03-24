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
      const args = Object.values(arguments)
      for (var i=0; i<args.length; i++)
      {
        if (checkObjectExistance.checkObjectExistance(args[i]) === false)
        {
          return reject({allow: false, message: "Missing required parameters"})
        }
      }

      var signup_user = new Users();
      signup_user.id = new ObjectId();
      signup_user.email = email;
      signup_user.registered = false;

      console.log("Signing up user "+ email)
      signup_user.save(function(err) {
          if (err)
          {
            console.log(err)
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
