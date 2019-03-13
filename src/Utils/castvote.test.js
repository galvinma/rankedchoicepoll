var moment = require('moment');

// functions
var castVote = require('./castvote')
var joinUser = require('./joinuser')
var createNewPoll = require('./createnewpoll')
var generateEmail = require('./generateemail')

// vars
const firstname = "testFirstName"
const lastname = "testLastName"
const email = generateEmail.generateEmail()
const password = "password"
const joinResult = joinUser.joinUser(firstname, lastname, email, password)
const userID = joinResult.user
const polltitle = "Poll Title"
const pollitems = ["one", "two", "three"]
const pollResult = createNewPoll.createNewPoll(userID, pollitems, polltitle)
const pollID = pollResult.poll_id
const vote = ['one','two','three']

describe('Cast vote logic is operational when...', function () {
  it('allows a user to cast a vote', () => {
    let response = castVote.castVote(pollID, vote, userID)
    expect(response).resolves.toEqual({success: true, message: "Successfully cast vote"})
  });

  it('rejects an invalid poll ID', () => {
    let response = castVote.castVote("ABC", vote, userID)
    expect(response).rejects.toEqual({success: false, message: "Unable to update poll. Vote not cast"})
  });

  it('handles an empty vote', () => {
    let response = castVote.castVote(pollID, [], userID)
    expect(response).rejects.toEqual({success: false, message: "Missing vote parameters. Vote not cast"})
  });

  it('handles an undefined vote', () => {
    let response = castVote.castVote(pollID, undefined, userID)
    expect(response).rejects.toEqual({success: false, message: "Missing vote parameters. Vote not cast"})
  });

  it('handles an undefined user', () => {
    let response = castVote.castVote(pollID, vote, undefined)
    expect(response).rejects.toEqual({success: false, message: "Missing user ID. Vote not cast"})
  });

  it('handles a null user', () => {
    let response = castVote.castVote(pollID, vote, null)
    expect(response).rejects.toEqual({success: false, message: "Missing user ID. Vote not cast"})
  });

  it('handles an empty user', () => {
    let response = castVote.castVote(pollID, vote, "")
    expect(response).rejects.toEqual({success: false, message: "Missing user ID. Vote not cast"})
  });
})
