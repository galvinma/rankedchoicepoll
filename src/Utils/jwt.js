var jwt = require('jsonwebtoken');

module.exports = {
  generateJWT: function(user)
  {
    var t = {
     id: user.id,
     email: user.email,
     reset_count: user.reset_count,
     join_date: user.join_date
    };

    var token = jwt.sign(t, process.env.REACT_APP_JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 14 // two weeks
    });

    return token
  }
}
