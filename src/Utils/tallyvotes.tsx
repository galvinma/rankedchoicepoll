import axios from 'axios';
import { checkObjectEquality } from './checkobjectequality'

export interface TallyDictionary
{
  [index: string]: number
}

export interface PollArray
{
  tally: TallyDictionary
  votes: string[][]
  poll_items: string[]
  leader: string[]
  last: string[]
  count: number
}

export function retMinMax(tally: TallyDictionary)
{
  // This method does not handle ties
  let values: number[] = Object.values(tally)
  let min: number = Math.min(...values)
  let max: number = Math.max(...values)

  let leader: string[] = []
  let last: string[] = []

  for (var key in tally)
  {
    if (tally[key] === min)
    {
      last.push(key)
    }

    if (tally[key] === max)
    {
      leader.push(key)
    }
  }

  return [leader, last]
}

export function merge(votes: string[][], poll_items: any)
{
  let result = tally(votes, poll_items)
  let last: string[] = result['last']
  votes = Object.assign([], votes)

  // tied
  if (last.length === poll_items.length)
  {
    return result
  }

  // remove items in the last array from the vote array
  for (var j=0; j<votes.length; j++)
  {
    for (var i=0; i<votes[j].length; i++)
    {
      for (var k=last.length -1; k>= 0; k--)
      {
        if (votes[j][i] === last[k])
        {
          votes[j] = votes[j].slice(0,i).concat(votes[j].slice(i+1))
        }
      }
    }
  }

  // purge empty arrays
  votes = votes.filter((vote: string[]) => vote.length > 0)

  // remove items in the last array from poll items
  for (var i = last.length -1; i>= 0; i--)
  {
    let ind = poll_items.indexOf(last[i])
    poll_items = poll_items.slice(0,ind).concat(poll_items.slice(ind+1))
  }

  console.log("poll items...")
  console.log(poll_items)

  result = tally(votes, poll_items)

  return result
}

export function tally(votes: string[][], poll_items: string[])
{
  let tally: TallyDictionary = {}
  let count: number = 0

  poll_items.forEach((item: string) => {
    tally[item] = 0
  })

  votes.forEach((vote: string[]) => {
    // console.log(vote)
    tally[vote[0]] = tally[vote[0]] + 1
    count++
  })

  let min_max = retMinMax(tally)
  let leader: string[] = min_max[0]
  let last: string[] = min_max[1]

  let ret: PollArray = {
    tally: tally,
    votes: votes,
    poll_items: poll_items,
    leader: leader,
    last: last,
    count: count
  }

  return ret
}

export function iterateTally(votes: any, poll_items: string[], threshold: number)
{
  let count: number = votes.length
  console.log("initial votes")
  console.log(votes)
  console.log(" ")

  // Get initial tally
  let result = tally(votes, poll_items)
  let outcome = result['tally'] as TallyDictionary
  let original_leader: string[] = result['leader']
  let leader: string[] = result['leader']
  let last: string[] = result['last']
  let leader_val: number = outcome[`${leader[0]}`]

  // If leader has greater than threshold, return. Else, iterate.
  console.log("initial tally")
  console.log(result['tally'] as TallyDictionary)
  console.log(result['votes'])
  console.log(outcome[`${leader}`]/count)
  console.log(threshold)
  console.log(" ")

  if (leader_val/count >= threshold)
  {
    return result
  }
  else
  {
      while(leader_val/count < threshold)
      {
        result = merge(votes, poll_items)

        outcome = result['tally'] as TallyDictionary
        votes = result['votes']
        leader = result['leader']
        last = result['last']
        leader_val = outcome[`${leader[0]}`]
        count = result['count']
        poll_items = result['poll_items']

        console.log(poll_items)
        console.log(last)
        if (checkObjectEquality(poll_items, last) === true)
        {
          console.log("there was a tie")
          break
        }

        console.log("new values")
        console.log(result['tally'] as TallyDictionary)
        console.log(result['votes'])
        console.log(outcome[`${leader}`]/count)
        console.log(threshold)
        console.log(" ")

      }

      console.log("free")
      if (leader.length > 1)
      {
        console.log("dealing with leaders...")
        let updated_leader: string[] = []
        console.log(leader)
        console.log(original_leader)

        // Check if winners were leaders in the first round of voting
        for (var i=0; i<leader.length; i++)
        {
          for (var j=0; j<original_leader.length; j++)
          {
            if (leader[i] === original_leader[j])
            {
              updated_leader.push(leader[i])
              console.log("updating")
              console.log(updated_leader)
            }
          }
        }
        console.log("updated leaders...")
        console.log(updated_leader)
        result['leader'] = updated_leader
      }
  }

  console.log("returning")
  return result
}

export function tallyVotes(id: string)
{
  return new Promise(function(resolve, reject) {
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnpoll`, {
      params: {
        poll_id: id,
      }
    })
    .then((response) => {
      let poll_items = response.data.poll_items
      let unprocessed = response.data.votes
      let threshold = response.data.threshold

      console.log("unprocessed")
      console.log(unprocessed)

      // preprocess votes object into an array
      var postprocess: string[][] = []
      console.log("empty")
      console.log(postprocess)

      for (var i=0; i<unprocessed.length; i++)
      {
        postprocess[i] = unprocessed[i].vote
      }

      console.log("postprocess votes")
      console.log(postprocess)
      console.log(" ")

      let result = iterateTally(postprocess, poll_items, threshold)

      resolve(result)
    })
  })
}
