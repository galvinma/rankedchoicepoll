require('dotenv').config()
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var generateEmail = require('./src/Utils/generateemail')
var joinUser = require('./src/Utils/joinuser')
var createNewPoll = require('./src/Utils/createnewpoll')
var castVote = require('./src/Utils/castvote')

mongoose.connect('mongodb://localhost:27017/rankedchoicepoll', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Colors Poll
const mockColorItems = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
const mockColorVotes = [
  ["Indigo", "Yellow", "Violet", "Green", "Red", "Orange", "Blue"],
  ["Violet", "Indigo", "Blue"],
  ["Green", "Orange", "Indigo", "Yellow", "Violet"],
  ["Red", "Green", "Orange", "Indigo", "Yellow", "Violet"],
  ["Blue", "Red", "Yellow", "Green", "Orange", "Indigo", "Violet"],
  ["Yellow", "Green", "Orange", "Indigo", "Violet", "Blue", "Red"],
  ["Orange", "Indigo", "Violet", "Blue", "Red", "Yellow", "Green", ],]
const mockColorTitle = "Favorite Color"

// Food Poll
const mockAnimalItems = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
const mockAnimalVotes = [
  ["Rat", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig", "Ox", "Tiger", "Rabbit", "Dragon", "Snake"],
  ["Dog", "Pig", "Ox", "Tiger", "Rat", "Horse", "Goat", "Monkey", "Rooster", "Rabbit", "Dragon", "Snake"],
  ["Ox", "Tiger", "Rat", "Horse", "Goat", "Monkey", "Rooster", "Rabbit", "Dragon", "Snake", "Dog", "Pig"],
  ["Tiger", "Rat", "Horse", "Goat", "Ox", "Monkey", "Rooster", "Pig", "Rabbit", "Dragon", "Snake", "Dog"],
  ["Horse", "Tiger", "Rat", "Pig", "Rabbit", "Dragon", "Snake", "Dog", "Goat", "Ox", "Monkey", "Rooster"],
  ["Pig", "Rabbit", "Dragon", "Snake", "Dog", "Goat", "Ox", "Horse", "Tiger", "Rat", "Monkey", "Rooster"],
  ["Rooster", "Pig", "Rabbit", "Dragon", "Snake", "Dog", "Goat", "Ox", "Horse", "Tiger", "Rat", "Monkey"],
  ["Rabbit", "Dragon", "Rooster", "Ox", "Horse", "Tiger", "Rat", "Pig", "Snake", "Dog", "Goat", "Monkey"],
  ["Dragon", "Rooster", "Ox", "Horse", "Tiger", "Rabbit", "Rat", "Pig", "Snake", "Dog", "Goat", "Monkey"],
  ["Snake", "Dog", "Goat", "Monkey", "Dragon", "Rooster", "Ox", "Horse", "Tiger", "Rabbit", "Rat", "Pig"],
  ["Goat", "Monkey", "Dragon", "Snake", "Dog", "Rooster", "Ox", "Horse", "Tiger", "Rabbit", "Rat", "Pig"],
  ["Monkey", "Dragon", "Snake", "Goat", "Dog", "Rooster", "Ox", "Horse", "Tiger", "Rabbit", "Rat", "Pig"]]
const mockAnimalTitle = "Favorite Animal"

// Movie Poll
const mockMovieItems = ["Citizen Kane", "North By Northwest", "Toy Story", "Metropolis", "The Godfather", "Casablanca"]
const mockMovieVotes = [
  ["Citizen Kane", "North By Northwest", "Toy Story", "Metropolis", "The Godfather", "Casablanca"],
  ["North By Northwest", "Toy Story", "Citizen Kane", "Metropolis", "The Godfather", "Casablanca"],
  ["Casablanca", "Toy Story", "The Godfather", "Citizen Kane", "North By Northwest", "Metropolis"],
  ["Citizen Kane", "Casablanca", "The Godfather", "North By Northwest", "Metropolis", "Toy Story"],
  ["Metropolis", "Casablanca", "The Godfather", "Citizen Kane", "North By Northwest", "Toy Story"],
  ["Toy Story", "The Godfather", "Citizen Kane", "Metropolis", "Casablanca", "North By Northwest"],
  ["The Godfather", "Citizen Kane", "Toy Story", "Metropolis", "Casablanca", "North By Northwest"]]
const mockMovieTitle = "Favorite Movie"


const mockPollOptions = 5
const mockPollMembers = []
const mockPollMemberEmails = []

function returnRandom(a)
{
  return Math.floor(Math.random() * a.length)
}

async function createMockUsers()
{
  return new Promise(async (resolve, reject) => {
    for (var i=0; i<50; i++)
    {
      const firstname = "Admin"
      const lastname = "User"
      const email = generateEmail.generateEmail()
      const password = "password"
      const response = await joinUser.joinUser(firstname, lastname, email, password)
      mockPollMembers.push(response.user)
      mockPollMemberEmails.push(email)
    }
    return resolve()
  })
}

async function castMockVote(mockPollID, mockVotes, mockPollMembers)
{
  return new Promise(async (resolve, reject) => {
    // i === 1, admin user has not voted
    for (var i=1; i<mockPollMembers.length; i++)
    {
      const voteResponse = await castVote.castVote(mockPollID, mockVotes[returnRandom(mockVotes)], mockPollMembers[i])
    }

    return resolve()
  })
}

async function createMockPoll()
{
  createMockUsers()
  .then(async (userResponse) => {
    const adminEmail = mockPollMemberEmails[0]
    const adminID = mockPollMembers[0]

    setTimeout(async() => {

      const colorResponse = await createNewPoll.createNewPoll(adminID, mockPollOptions, mockColorItems, mockColorTitle, mockPollMembers)
      console.log("Created new poll with ID: "+colorResponse.poll_id)
      const castColorVotes = await castMockVote(colorResponse.poll_id, mockColorVotes, mockPollMembers)

      const animalResponse = await createNewPoll.createNewPoll(adminID, mockPollOptions, mockAnimalItems, mockAnimalTitle, mockPollMembers)
      console.log("Created new poll with ID: "+animalResponse.poll_id)
      const castAnimalVotes = await castMockVote(animalResponse.poll_id, mockAnimalVotes, mockPollMembers)

      const movieResponse = await createNewPoll.createNewPoll(adminID, mockPollOptions, mockMovieItems, mockMovieTitle, mockPollMembers)
      console.log("Created new poll with ID: "+movieResponse.poll_id)
      const castMovieVotes = await castMockVote(movieResponse.poll_id, mockMovieVotes, mockPollMembers)

      console.log("Ready to close poll(s). Admin user is "+ mockPollMemberEmails[0])
    }, 1000)
  })
  .catch((error) => {
    console.log(error)
  })
}

createMockPoll()
