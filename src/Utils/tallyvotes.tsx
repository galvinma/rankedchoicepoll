import axios from 'axios';

interface TallyDictionary
{
  [index: string]: number
}

interface PollArray
{
  tally: TallyDictionary
  leader: string
  last: string
  count: number
}

export function retMinMax(tally: TallyDictionary)
{
  // This method does not handle ties
  let values: number[] = Object.values(tally)
  let min: number = Math.min(...values)
  let max: number = Math.max(...values)

  let leader: string = ""
  let last: string = ""

  for (var key in tally)
  {
    if (tally[key] === min)
    {
      last = key
    }

    if (tally[key] === max)
    {
      leader = key
    }
  }

  return [leader, last]
}

export function merge(votes: any, poll_items: any)
{
  let result = tally(votes, poll_items)
  let last = result['last']

  votes.forEach((voter: any) => {
    for (var i=0; i<voter.length; i++)
    {
      if (voter[i] === last)
      {
        votes[voter] = votes[votes].slice(0,i).concat(votes[voter].slice(i+1))
      }
    }
  })

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
    tally[vote[0]] = tally[vote[0]] + 1
    count++
  })

  let min_max = retMinMax(tally)
  let leader: string = min_max[0]
  let last: string = min_max[1]

  let ret: PollArray = {
    tally: tally,
    leader: leader,
    last: last,
    count: count
  }

  return ret
}

export function iterateTally(votes: any, poll_items: string[], threshold: number)
{
  let count= votes.length

  // Get initial tally
  let result = tally(votes, poll_items)
  let outcome = result['tally'] as TallyDictionary
  let leader = result['leader'] as string

  // If leader has greater than threshold, return. Else, iterate.
  if (outcome[`${leader}`]/count >= threshold)
  {
    return result
  }
  else
  {
      while(outcome[`${leader}`]/count < threshold)
      {
        result = merge(votes, poll_items)
        outcome = result['tally'] as TallyDictionary
        leader = result['leader']
        count = result['count']
      }
  }

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

      // preprocess votes object into an array
      let votes = []
      for (var i=0; i<unprocessed.length; i++)
      {
        votes.push(unprocessed[i].vote)
      }

      let result = iterateTally(votes, poll_items, threshold)

      resolve(result)
    })
  })
}
