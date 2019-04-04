module.exports = {
  checkIfVoted: function(poll, user_id)
  {
    let voteBool = false
    for (var i=0; i<poll.votes.length; i++)
    {
      if (String(poll.votes[i].user_id) === String(user_id))
      {
        voteBool = true
        break
      }
    }
    return voteBool
  }
}
