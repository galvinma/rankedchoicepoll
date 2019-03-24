var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
var Users = require('../.././model/users');
var generateJWT = require('./jwt');
var checkObjectExistance = require('./checkobjectexistance')
var getUserIdFromEmail = require('./getuseridfromemail')
var joinUserOnlyEmail = require('./joinuseronlyemail')

module.exports = {
  prepMembers: async function(member_emails)
  {
    return new Promise(async(resolve, reject) => {
      let members = []
      for (var i=0; i<member_emails.length; i++)
      {
        try
        {
          let userResponse = await getUserIdFromEmail.getUserIdFromEmail(member_emails[i])
          if (userResponse !== null && userResponse !== undefined)
          {
            members.push(userResponse)
          }
          else
          {
            if (userResponse !== undefined)
            {
              try
              {
                let joinResponse = await joinUserOnlyEmail.joinUserOnlyEmail(member_emails[i])
                members.push(joinResponse.user)
              }
              catch (joinError)
              {
                return reject(joinError)
              }
            }
            else
            {
              return reject("userResponse undefined.")
            }
          }
        }
        catch(error)
        {
          return reject(error)
        }
      }
      return resolve(members)
    })
  }
}
