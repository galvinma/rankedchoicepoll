const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

module.exports = {
  hashPassword: function(password)
  {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err)
          {
            return reject(err)
          }

          bcrypt.hash(password, salt, function(err, hash) {
              if (err)
              {
                return reject(err)
              }

              return resolve(hash)
          });
      });
    })
  }
}
