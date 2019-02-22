// functions
import { retMinMax, tally, merge, iterateTally } from './tallyvotes'
import { TallyDictionary, PollArray } from './tallyvotes'

// data
import {  fruit_poll_items,
          fruit_poll_one,
          fruit_poll_two,
          fruit_poll_three,
          fruit_poll_four, } from '.././Test/fruit_data'

let fruit_threshold: number = 0.5

it('correctly tallies the first fruit poll', () => {
  let result = iterateTally(fruit_poll_one, fruit_poll_items, fruit_threshold)
  expect(result['tally']).toEqual({ apple: 5, guava: 4 })
  expect(result['leader']).toEqual(["apple"])
  expect(result['count']).toBe(9)

});

it('correctly tallies the second fruit poll', () => {
  let result = iterateTally(fruit_poll_two, fruit_poll_items, fruit_threshold)
  expect(result['tally']).toEqual({ apple: 4, banana: 5 })
  expect(result['leader']).toEqual(["banana"])
  expect(result['count']).toBe(9)
});

it('andles an initial tie, && a leader from the first round of voting', () => {
  let result = iterateTally(fruit_poll_three, fruit_poll_items, fruit_threshold)
  expect(result['tally']).toEqual({ apple: 3, banana: 3, guava: 3 })
  expect(result['leader']).toEqual(["apple"])
  expect(result['count']).toBe(9)
});

it('handles an initial tie, && a tie in the first round of voting', () => {
  let result = iterateTally(fruit_poll_four, fruit_poll_items, fruit_threshold)
  expect(result['tally']).toEqual({apple: 3, peach: 3, strawberry: 3})
  expect(result['leader']).toEqual(["apple", "strawberry", "peach"])
  expect(result['count']).toBe(9)
});
