// functions
import { checkObjectEquality } from './checkobjectequality'

// data
import { object_one, object_two, object_three, object_four } from '.././Test/generic_data'

it('correctly identifies matching objects', () => {
  expect(checkObjectEquality(object_one, object_one)).toEqual(true)
  expect(checkObjectEquality(object_one, object_two)).toEqual(true)
});

it('correctly identifies mismatching objects of equal length', () => {
  expect(checkObjectEquality(object_one, object_three)).toEqual(false)
});

it('correctly identifies mismatching objects of different length', () => {
  expect(checkObjectEquality(object_one, object_four)).toEqual(false)
});
