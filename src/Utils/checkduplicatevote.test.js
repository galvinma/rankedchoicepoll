// functions
var checkDuplicateVote = require('./checkduplicatevote')

// vars
const userOne = "userone"
const userTwo = "usertwo"
const poll = {
  poll: {
    votes: [{vote: [[1,2,3]], user_id: "userone"}]
  }
}

describe('The workflow prevents misvotes if...', function () {
    it('allows a user to cast a first vote', () => {
        const check = checkDuplicateVote.checkDuplicateVote(poll, userTwo)
        expect(check).toEqual(true)
    })

    it('prevents a user from casting a second vote', () => {
        const check = checkDuplicateVote.checkDuplicateVote(poll, userOne)
        expect(check).toEqual(false)
    })
})
