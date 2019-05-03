var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

module.exports = {
  newPass: function(user, old_hash, new_password)
  {
    return new Promise((resolve, reject) => {
      const token_hash = old_hash
      jwt.verify(token_hash, process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
        if (String(decoded.id) !== String(user.id) ||
            String(decoded.reset_count) !== String(user.reset_count) ||
            String(decoded.join_date) !== String(user.join_date))
        {
          return resolve({success: false, message: "Token not valid"})
        }
        else
        {
          console.log("here")
          bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt)
          {
            if (err)
            {
              return resolve({success: false, message: "Unable to encrypt new password"})
            }

            bcrypt.hash(new_password, salt, (err, hash) =>
            {
              if (err)
              {
                return resolve({success: false, message: "Unable to encrypt new password"})
              }

              Users.update({ id: user.id }, {password: hash , reset_count: user.reset_count + 1} ).lean().exec(function(err, user)
              {
                if (err)
                {
                  return resolve({success: false, message: "Unable to update user schema"})
                }

                return resolve({success: true, message: "Successfully updated password"})
              })
            })
          })
        }
      })
    })
  }
}
