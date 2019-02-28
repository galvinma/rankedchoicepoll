var joinUser = require('./joinuser')
var generateEmail = require('./generateemail')

const firstname = "testFirstName"
const lastname = "testLastName"
const email = generateEmail.generateEmail()
const password = "password"

it('allows a user to join the site', () => {
  const joinResult = joinUser.joinUser(firstname, lastname, email, password)
  expect(joinResult.allow).toEqual(true)
});


it('does not add a user to the database if required parameters are missing', () => {
  let joinResult = joinUser.joinUser("", "testLastName", email, password)
  expect(joinResult.allow).toEqual(false)
  expect(joinResult.message).toEqual("Missing required parameters")

  joinResult = joinUser.joinUser("testFirstName", null, email, password)
  expect(joinResult.allow).toEqual(false)
  expect(joinResult.message).toEqual("Missing required parameters")

  joinResult = joinUser.joinUser("testFirstName", "testLastName", undefined, password)
  expect(joinResult.allow).toEqual(false)
  expect(joinResult.message).toEqual("Missing required parameters")

  joinResult = joinUser.joinUser(null, undefined, "", "")
  expect(joinResult.allow).toEqual(false)
  expect(joinResult.message).toEqual("Missing required parameters")
});
