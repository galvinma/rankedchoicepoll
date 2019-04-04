var Poll = require('../.././model/poll');
var checkIfVoted = require('./checkifvoted')

module.exports = {
  returnPollData: function(poll_id, user_id) {
    return new Promise((resolve, reject) => {
      Poll.findOne({ poll_id: poll_id }).lean().exec(function(err, poll) {
        if (err)
        {
          return reject({ success: false, message: "Unable to find poll" })
        }

        if (poll && poll !== null && poll.id !== null)
        {
          // check if the user has voted
          const voted = checkIfVoted.checkIfVoted(poll, user_id)
          return resolve({poll_id: poll.poll_id, admin_id: poll.admin_id, admin_name: poll.admin_name, options: poll.options, threshold: poll.threshold, title: poll.title, poll_items: poll.poll_items, votes: poll.votes, status: poll.status, members: poll.members, voted: voted})
        }
        else
        {
          return reject({ success: false, message: "Unable to find poll" })
        }
      })
    })
  }
}
