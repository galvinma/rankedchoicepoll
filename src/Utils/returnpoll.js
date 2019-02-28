var Poll = require('../.././model/poll');

module.exports = {
  returnPoll: function(poll_id) {
    return new Promise((resolve, reject) => {
      Poll.findOne({ poll_id: poll_id }).lean().exec(function(err, poll) {
        if (err)
        {
          reject({ success: false, message: "Unable to find poll" })
        }
        resolve({ success: true, poll: poll})
      })
    })
  }
}
