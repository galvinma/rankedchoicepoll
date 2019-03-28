var User = require('../.././model/users');

module.exports = {
  returnUserPolls: function(req) {
    return new Promise((resolve, reject) => {
      console.log("in returnUserPolls")
      console.log(req.body.params.user_id)
      User.findOne({ id: req.body.params.user_id }).lean().exec(function(err, user) {
        if (err)
        {
          reject({ success: false, message: "Unable to find user" })
        }
        console.log(user)
        resolve({user_id: user.id, active_polls: user.active_polls, closed_polls: user.closed_polls})
      })
    })
  }
}
