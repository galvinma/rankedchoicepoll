const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const ObjectId = Schema.ObjectId;

var Users = new Schema({
    id: {type: ObjectId, required: true},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: false},
    join_date: {type: Number, required: false},
    reset_count: {type: Number, required: false},
    registered: {type: Boolean, required: true},
    active_polls: {type: [ObjectId], required: false},
    closed_polls: {type: [ObjectId], required: false},
});

Users.pre('save', function(next) {
    var user = this;
    if (user.registered === true)
    {
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);

          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) return next(err);

              user.password = hash;
              next()
          });
      });
    }
    else
    {
      next()
    }
});


module.exports = mongoose.model('Users', Users);
