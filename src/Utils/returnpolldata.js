var Poll = require('../.././model/poll');

module.exports = {
  returnPollData: function(req) {
    return new Promise((resolve, reject) => {
      Poll.findOne({ poll_id: req.body.params.poll_id }).lean().exec(function(err, poll) {
        if (err)
        {
          reject({ success: false, message: "Unable to find poll" })
        }
        resolve({admin_id: poll.admin_id, options: poll.options, threshold: poll.threshold, title: poll.title, poll_items: poll.poll_items, votes: poll.votes, status: poll.status })
      })
    })
  }
}
