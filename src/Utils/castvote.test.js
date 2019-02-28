var mongoose = require('mongoose');
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

let connection
let db

beforeAll(async () => {
  connection = await mongoose.connect('mongodb://localhost:27017/rankedchoicepoll', { useNewUrlParser: true });
  db = await mongoose.connection;
});

describe('Cast vote logic is operational when...', function () {
  it('allows a user to cast a vote', () => {
    expect.assertions(1);

    return castVote.castVote(pollID, vote, userID)
    .then((response) => {
      expect(response).toEqual({success: true, message: "Successfully cast vote"})
    })
  });

  it('rejects an invalid poll ID', () => {
    expect.assertions(1);

    return castVote.castVote("ABC", vote, userID)
    .catch((error) => {
      expect(error).toEqual({success: false, message: "Unable to update poll. Vote not cast"})
    })
  });

  it('handles an empty vote', () => {
    expect.assertions(1);

    return castVote.castVote(pollID, [], userID)
    .catch((error) => {
      expect(error).toEqual({success: false, message: "Missing vote parameters. Vote not cast"})
    })
  });

  it('handles an undefined vote', () => {
    expect.assertions(1);

    return castVote.castVote(pollID, undefined, userID)
    .catch((error) => {
      expect(error).toEqual({success: false, message: "Missing vote parameters. Vote not cast"})
    })
  });

  it('handles an undefined user', () => {
    expect.assertions(1);

    return castVote.castVote(pollID, vote, undefined)
    .catch((error) => {
      expect(error).toEqual({success: false, message: "Missing user ID. Vote not cast"})
    })
  });

  it('handles a null user', () => {
    expect.assertions(1);

    return castVote.castVote(pollID, vote, null)
    .catch((error) => {
      expect(error).toEqual({success: false, message: "Missing user ID. Vote not cast"})
    })
  });

  it('handles an empty user', () => {
    expect.assertions(1);

    return castVote.castVote(pollID, vote, "")
    .catch((error) => {
      expect(error).toEqual({success: false, message: "Missing user ID. Vote not cast"})
    })
  });
})
