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

  let processed_votes: string[][] = []
  // remove items in the last array from the vote array
  for (var i=0; i<votes.length; i++)
  {
    let arr = votes[i].slice(0)
    for (var j=0; j<last.length; j++)
    {
      for (var k=arr.length-1; k>=0; k--)
      {
        if (arr[k] === last[j])
        {
          arr = arr.slice(0,k).concat(arr.slice(k+1))
        }
      }
    }

    processed_votes.push(arr)
  }

  // purge empty arrays
  processed_votes = processed_votes.filter((vote: string[]) => vote.length > 0)

  // remove items in the last array from poll items
  for (var i = last.length -1; i>= 0; i--)
  {
    let ind = poll_items.indexOf(last[i])
    poll_items = poll_items.slice(0,ind).concat(poll_items.slice(ind+1))
  }

  result = tally(processed_votes, poll_items)

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
  let retObj: any = []
  let count: number = votes.length

  // Get initial tally
  let result = tally(votes, poll_items)
  retObj.push(result)
  let outcome = result['tally'] as TallyDictionary
  let original_leader: string[] = result['leader']
  let leader: string[] = result['leader']
  let last: string[] = result['last']
  let leader_val: number = outcome[`${leader[0]}`]

  // If leader has greater than threshold, return. Else, iterate.
  if (leader_val/count >= threshold)
  {
    return retObj
  }
  else
  {
      while(leader_val/count < threshold)
      {
        result = merge(votes, poll_items)
        retObj.push(result)
        outcome = result['tally'] as TallyDictionary
        votes = result['votes']
        leader = result['leader']
        last = result['last']
        leader_val = outcome[`${leader[0]}`]
        count = result['count']
        poll_items = result['poll_items']

        if (checkObjectEquality(poll_items, last) === true)
        {
          break
        }
      }

      // Check for a tie
      if (leader.length > 1)
      {
        let updated_leader: string[] = []

        // Check if winners were leaders in the first round of voting
        for (var i=0; i<leader.length; i++)
        {
          for (var j=0; j<original_leader.length; j++)
          {
            if (leader[i] === original_leader[j])
            {
              updated_leader.push(leader[i])
            }
          }
        }

        result['leader'] = updated_leader
      }
  }

  return retObj
}

export function tallyVotes(id: string)
{
  return new Promise(function(resolve, reject) {
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnpoll`, {
      params: {
        poll_id: id,
        user_id: localStorage.getItem('user'),
      }
    })
    .then((response) => {
      let poll_items = response.data.poll_items
      let unprocessed = response.data.votes
      let threshold = response.data.threshold

      // preprocess votes object into an array
      var postprocess: string[][] = []
      for (var i=0; i<unprocessed.length; i++)
      {
        postprocess[i] = unprocessed[i].vote
      }

      let result = iterateTally(postprocess, poll_items, threshold)

      resolve(result)
    })
  })
}
