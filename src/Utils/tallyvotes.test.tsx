import axios from 'axios';

// functions
import { retMinMax, tally, merge, iterateTally } from './tallyvotes'
import { TallyDictionary, PollArray } from './tallyvotes'

// setup
let fruit_poll_items: stringp[] = ['apple', 'pear', 'banana', 'grape', 'strawberry', 'guava', 'peach']
let fruit_poll_one: string[][] = [
  ['apple', 'pear',	'banana', 'grape', 'strawberry', 'guava', 'peach'],
  ['apple',	'peach', 'banana', 'grape', 'strawberry',	'guava', 'pear'],
  ['guava',	'grape', 'banana', 'pear',	'strawberry',	'apple', 'peach'],
  ['apple',	'pear',	'banana',	'grape',	'strawberry',	'guava', 'peach'],
  ['pear', 'guava',	'peach', 'apple',	'strawberry',	'banana',	'grape'],
  ['peach', 'banana',	'grape', 'apple',	'strawberry',	'guava', 'pear'],
  ['banana', 'pear', 'apple',	'peach', 'strawberry', 'guava', 'grape'],
  ['guava',	'strawberry', 'peach',	'grape', 'apple', 'banana', 'pear'],
  ['guava',	'apple', 'peach',	'grape', 'strawberry', 'banana', 'pear']]
let fruit_poll_two: string[][] = [
  ['apple', 'pear', 'banana', 'grape', 'strawberry', 'guava', 'peach'],
  ['apple', 'pear', 'banana', 'grape', 'strawberry', 'guava', 'peach'],
  ['apple', 'pear', 'banana', 'grape', 'strawberry', 'guava', 'peach'],
  ['apple', 'pear', 'banana', 'grape', 'strawberry', 'guava', 'peach'],
  ['pear', 'banana', 'grape', 'apple', 'strawberry', 'guava', 'peach'],
  ['pear', 'banana', 'grape', 'apple', 'strawberry', 'guava', 'peach'],
  ['banana', 'grape', 'apple', 'peach', 'strawberry', 'guava', 'pear'],
  ['banana', 'apple', 'peach', 'grape', 'strawberry', 'guava', 'pear'],
  ['banana', 'apple', 'peach', 'grape', 'strawberry', 'guava', 'pear']]
let fruit_poll_three: string[][] = [
  ['apple', 'pear',	'banana', 'grape', 'strawberry', 'guava', 'peach'],
  ['apple',	'peach', 'banana', 'grape', 'strawberry',	'guava', 'pear'],
  ['guava',	'grape', 'banana', 'pear',	'strawberry',	'apple', 'peach'],
  ['apple',	'pear',	'banana',	'grape',	'strawberry',	'guava', 'peach'],
  ['pear', 'guava',	'peach', 'apple',	'strawberry',	'banana',	'grape'],
  ['peach', 'banana',	'grape', 'apple',	'strawberry',	'guava', 'pear'],
  ['banana', 'pear', 'apple',	'peach', 'strawberry', 'guava', 'grape'],
  ['guava',	'strawberry', 'peach',	'grape', 'apple', 'banana', 'pear'],
  ['banana',	'apple', 'peach',	'grape', 'strawberry', 'guava', 'pear']]
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

it('correctly tallies the poll in the event of a tied winner', () => {
  let result = iterateTally(fruit_poll_three, fruit_poll_items, fruit_threshold)
  expect(result['tally']).toEqual({ apple: 3, banana: 3, guava: 3 })
  expect(result['leader']).toEqual(["apple"])
  expect(result['count']).toBe(9)
});
