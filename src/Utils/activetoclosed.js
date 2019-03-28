var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var checkObjectExistance = require('./checkobjectexistance')

module.exports = {
  activeToClosed: function(poll_id, user_id)
  {
    console.log("Updating user "+user_id)
    Users.findOne({ id: user_id }).lean().exec(function(err, user)
    {
      if (err)
      {
        return {success: false, message: "Unable to update user."}
      }

      let active = user.active_polls
      let ind = null
      for (var j=0; j<active.length; j++)
      {
        if (String(active[j]) === poll_id)
        {
          ind = j
          break
        }
      }

      if (ind !== -1 || ind !== undefined || ind !== null)
      {
        active = active.slice(0, ind).concat(active.slice(ind+1))
      }
      else
      {
        return {success: false, message: "Unable to find poll."}
      }


      Users.update({id: user_id}, {active_polls: active, closed_polls: closed}).lean().exec(function(err)
      {
        if (err)
        {
          console.log(err)
          return {success: false, message: "Unable to update user."}
        }
        else
        {
          console.log("Successfully transfered active to closed")
          return {success: true, message: "Successfully updates user"}
        }
      })
    })
  }
}
