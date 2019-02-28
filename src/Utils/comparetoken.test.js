var mongoose = require('mongoose');
var moment = require('moment');

// functions
var compareToken = require('./comparetoken')
var joinUser = require('./joinuser')
var generateEmail = require('./generateemail')

// vars
const firstname = "testFirstName"
const lastname = "testLastName"
const email = generateEmail.generateEmail()
const password = "password"
const joinResult = joinUser.joinUser(firstname, lastname, email, password)
const userID = joinResult.user
const token = joinResult.token

let connection
let db

beforeAll(async () => {
  connection = await mongoose.connect('mongodb://localhost:27017/rankedchoicepoll', { useNewUrlParser: true });
  db = await mongoose.connection;
});

describe('Correctly checks a jwt when...', function () {
  it('confirms a valid token', () => {
    expect.assertions(1);

    return compareToken.compareToken(token, token, userID)
    .then((response) => {
      expect(response).toEqual({allow: true, message: "Successfully decoded token", user: user, token: token})
    })
  });
})
