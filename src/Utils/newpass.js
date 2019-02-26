var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

module.exports = {
  newPass: function(req)
  {
    const token_hash = req.body.params.token_hash
    jwt.verify(token_hash, process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
      if (String(decoded.id) !== String(user.id) ||
          decoded.reset_count !== user.reset_count ||
          decoded.join_date !== user.join_date)
      {
        return {success: false, message: "Token not valid"}
      }
      else
      {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt)
        {
          if (err)
          {
            return next(err)
          }

          bcrypt.hash(req.body.params.new_password, salt, (err, hash) =>
          {
            if (err)
            {
              return {success: false, message: "Unable to encrypt new password"}
            }

            Users.update({ id: req.body.params.user_id }, {password: hash , reset_count: user.reset_count + 1} ).lean().exec(function(err, user)
            {
              if (err)
              {
                return {success: false, message: "Unable to update user schema"}
              }

              return {success: true, message: "Successfully updated password"}
            })
          })
        })
      }
    })
  }
}
