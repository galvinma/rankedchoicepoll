var mongoTestSetup = require('.././Test/mongotestsetup')
var jwt = require('jsonwebtoken');
var Users = require('../.././model/users');
var checkObjectExistance = require('./checkobjectexistance')
var compareToken = require('./comparetoken')

// functions
var compareToken = require('./comparetoken')
var joinUser = require('./joinuser')
var generateEmail = require('./generateemail')

// vars
const password = "password"
const firstJoinResult = joinUser.joinUser("firstName", "lastName", generateEmail.generateEmail(), password)
const firstUserID = firstJoinResult.user
const firstToken = firstJoinResult.token

const secondJoinResult = joinUser.joinUser("nameFirst", "nameLast", generateEmail.generateEmail(), password)
const secondUserID = secondJoinResult.user
const secondToken = secondJoinResult.token

let dec
jwt.verify(firstToken, process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
  dec = decoded
})

mongoTestSetup.mongoTestSetup()

describe('Correctly checks a jwt when...', function () {
  it('confirms a valid token', () => {
      return compareToken.compareToken(dec, firstToken, firstUserID)
      .then((response) => {
        expect(response).toEqual({allow: true, message: "Successfully decoded token", user: firstUserID, token: firstToken})
      })
  })

  it('confirms an invalid match', () => {
      return compareToken.compareToken(dec, secondToken, secondUserID)
      .catch((response) => {
        expect(response).toEqual({allow: false, message: "Provided tokens do not match", user: null, token: null})
      })
  })

})
