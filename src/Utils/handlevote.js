var generateJWT = require('./jwt');
var returnPoll = require('./returnpoll')
var castVote = require('./castvote')
var checkDuplicateVote = require('./checkduplicatevote')

module.exports = {
  handleVote: function(poll_id, vote, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      const processed = []
      for (var i=0; i<vote.length; i++)
      {
        processed.push(vote[i].content)
      }

      returnPoll.returnPoll(poll_id)
      .then((poll) => {
        let voteBool = checkDuplicateVote.checkDuplicateVote(poll, user_id)

        if (voteBool === true)
        {
          castVote.castVote(poll_id, processed, user_id)
          .then((response) => {
            return resolve(response)
          })
          .catch((error) => {
            return reject(error)
          })
        }
        else
        {
          return reject({success: false, message: "User has already voted in the poll"})
        }
      })
      .catch((error) => {
        return reject(error)
      })
    })
  }
}
