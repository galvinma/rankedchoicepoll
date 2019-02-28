module.exports = {
  checkDuplicateVote: function(poll, user_id)
  {
    let voteBool = true
    for (var i=0; i<poll.poll.votes.length; i++)
    {
      if (String(poll.poll.votes[i].user_id) === String(user_id))
      {
        voteBool = false
        break
      }
    }
    return voteBool
  }
}
