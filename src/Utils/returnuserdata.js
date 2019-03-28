var Users = require('../.././model/users');

module.exports = {
  returnUserData: function(user_id) {
    return new Promise((resolve, reject) => {
      Users.findOne({ id: user_id }).lean().exec(function(err, user) {
        if (err)
        {
          reject({ success: false, message: "Unable to find user" })
        }
        resolve({ success: true, user: user})
      })
    })
  }
}
