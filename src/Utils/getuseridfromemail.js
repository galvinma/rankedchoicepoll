var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  getUserIdFromEmail: function(email)
  {
    return new Promise((resolve, reject) => {
      return Users.findOne({ email: email.toUpperCase() }).lean().exec(function(err, docs) {
        if (err)
        {
          return reject(null)
        }
        if (!(docs))
        {
          // User not found, resolve(null) to create a new/unregistered account
          return resolve(null)
        }
        else
        {
          return resolve(docs.id)
        }
      })
    })
  }
}
