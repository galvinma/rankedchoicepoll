var Poll = require('../.././model/poll');
var Vote = require('../.././model/vote');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  castVote: function(poll_id, vote, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      var newVote = new Vote();
      newVote.user_id = user_id
      newVote.vote = vote

      if (checkObjectExistance.checkObjectExistance(vote) === false || vote.length === 0)
      {
        return reject({success: false, message: "Missing vote parameters. Vote not cast."})
      }

      if (checkObjectExistance.checkObjectExistance(user_id) === false)
      {
        return reject({success: false, message: "Missing user ID. Vote not cast."})
      }

      Poll.update({ poll_id: poll_id }, {$push: {votes: newVote}}).lean().exec(function(err)
      {
        if (err)
        {
           return reject({success: false, message: "Unable to update poll. Vote not cast."})
        }
        else
        {
           return resolve({success: true, message: "Successfully cast vote."})
        }
      })
    })
  }
}
