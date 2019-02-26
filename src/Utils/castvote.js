var Poll = require('../.././model/poll');
var Vote = require('../.././model/vote');
var generateJWT = require('./jwt');

module.exports = {
  castVote: function(req)
  {
    Poll.findOne({ poll_id: req.body.params.poll_id }).lean().exec(function(err, poll) {
      if (err)
      {
        return {success: false, message: "Poll not found. Unable to cast vote"}
      }

      // process vote object to an array
      let a = []
      for (var i=0; i<req.body.params.vote.length; i++)
      {
        a.push(req.body.params.vote[i].content)
      }

      var vote = new Vote();
      vote.user_id = req.body.params.user_id
      vote.vote = a

      Poll.update({ poll_id: req.body.params.poll_id }, {$push: {votes: vote}}).lean().exec(function(err)
      {
        if (err)
        {
          return {success: false, message: "Unable to update poll. Vote not cast"}
        }

        return {success: true, message: "Successfully cast vote"}
      })
    })
  }
}
