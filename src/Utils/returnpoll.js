var Poll = require('../.././model/poll');

module.exports = {
  returnPoll: function(req) {
    Poll.findOne({ poll_id: req.body.params.poll_id }).lean().exec(function(err, poll) {
      if (err)
      {
        return { success: false, message: "Unable to find poll" }
      }

      return {
        admin_id: poll.admin_id,
        options: poll.options,
        threshold: poll.threshold,
        title: poll.title,
        poll_items: poll.poll_items,
        votes: poll.votes,
      }
    })
  }
}
