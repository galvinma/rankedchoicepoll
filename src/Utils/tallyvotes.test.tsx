// functions
import { retMinMax, tally, merge, iterateTally } from './tallyvotes'
import { TallyDictionary, PollArray } from './tallyvotes'

// data
import {  fruit_poll_items,
          fruit_poll_one,
          fruit_poll_two,
          fruit_poll_three,
          fruit_poll_four, } from '.././Test/fruit_data'

import {  car_poll_items,
          car_poll_one } from '.././Test/car_data'

import {  color_poll_items,
          color_poll_one } from '.././Test/color_data'

it('correctly tallies the first fruit poll', () => {
  let result = iterateTally(fruit_poll_one, fruit_poll_items, 0.5)
  expect(result['tally']).toEqual({ "apple": 5, "guava": 4 })
  expect(result['leader']).toEqual(["apple"])
  expect(result['count']).toBe(9)
});

it('correctly tallies the second fruit poll', () => {
  let result = iterateTally(fruit_poll_two, fruit_poll_items, 0.5)
  expect(result['tally']).toEqual({ "apple": 4, "banana": 5 })
  expect(result['leader']).toEqual(["banana"])
  expect(result['count']).toBe(9)
});

it('correctly tallies the first car poll', () => {
  let result = iterateTally(car_poll_one, car_poll_items, 0.5)
  expect(result['tally']).toEqual({"Ford Explorer": 10, "Nissan Rogue": 5, "Nissan Versa": 5})
  expect(result['leader']).toEqual(["Ford Explorer"])
  expect(result['count']).toBe(20)
});

it('correctly tallies the first color poll', () => {
  let result = iterateTally(color_poll_one, color_poll_items, 0.5)
  expect(result['tally']).toEqual({"red": 11, "yellow": 12})
  expect(result['leader']).toEqual(["yellow"])
  expect(result['count']).toBe(23)
});

it('handles an initial tie, && a leader from the first round of voting', () => {
  let result = iterateTally(fruit_poll_three, fruit_poll_items, 0.5)
  expect(result['tally']).toEqual({ "apple": 3, "banana": 3, "guava": 3 })
  expect(result['leader']).toEqual(["apple"])
  expect(result['count']).toBe(9)
});

it('handles an initial tie, && a tie in the first round of voting', () => {
  let result = iterateTally(fruit_poll_four, fruit_poll_items, 0.5)
  expect(result['tally']).toEqual({"apple": 3, "peach": 3, "strawberry": 3})
  expect(result['leader']).toEqual(["apple", "strawberry", "peach"])
  expect(result['count']).toBe(9)
});
