var jwt = require('jsonwebtoken');

module.exports = {
  passJWT: function(user)
  {
    var t = {
     id: user.id,
     reset_count: user.reset_count,
     join_date: user.join_date
    };

    var token = jwt.sign(t, process.env.REACT_APP_JWT_SECRET, {
      expiresIn: 60 * 60 * 24 // one day
    });

    return token
  }
}
