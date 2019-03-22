var Poll = require('../.././model/poll');

module.exports = {
  closePoll: function(poll_id, user_id)
  {
    return new Promise((resolve, reject) =>
    {
      // TODO: Verify admin use is closing the poll

      Poll.update({ poll_id: poll_id }, {status: false}).lean().exec(function(err)
      {
        if (err)
        {
           return reject({success: false, message: "Unable to close poll."})
        }
        else
        {
           return resolve({success: true, message: "Successfully closed poll"})
        }
      })
    })
  }
}
