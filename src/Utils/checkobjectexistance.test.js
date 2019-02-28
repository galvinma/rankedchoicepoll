// functions
import { checkObjectExistance } from './checkobjectexistance'

const a = ""
const b = null
const c = undefined
const d = []
const e = {}

it('rejects an empty string', () => {
  expect(checkObjectExistance(a)).toEqual(false)
});

it('rejects a null value', () => {
  expect(checkObjectExistance(b)).toEqual(false)
});

it('rejects an undefined value', () => {
  expect(checkObjectExistance(c)).toEqual(false)
});

it('accepts an empty array', () => {
  expect(checkObjectExistance(d)).toEqual(true)
});

it('accepts an empty object', () => {
  expect(checkObjectExistance(e)).toEqual(true)
});
