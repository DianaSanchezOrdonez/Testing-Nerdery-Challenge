import {
  isInteger,
  toLowerCase,
  removeDuplicatesFromArray,
  createRandomProduct,
  getStarWarsPlanets,
  createProduct,
} from './index';

test('isInteger valid', () => {
  expect(isInteger(123)).toBe(true);
  expect(isInteger(1234567890123456789012345678901234567890)).toBe(true);
});

test('isInteger invalid', () => {
  expect(isInteger('abc')).toBe(false);
  expect(isInteger('abc123')).toBe(false);
  // expect(isInteger(123!)).toBe(false)
});

test('return a lowercase string', () => {
  expect(toLowerCase('ABCDE')).toBe('abcde');
  expect(toLowerCase('abcde')).toBe('abcde');
  expect(toLowerCase('AbCdE')).toBe('abcde');
  expect(toLowerCase('A1B2C')).toBe('a1b2c');
});

test('return array without duplicates', () => {
  const arrayNumber = [123, 234, 345, 456, 321, 432, 543, 321, 432];
  const arrayNonNumber = [123!, '*123*', '$123', 123, 123!, '$123'];
  const arrayString = ['maki', 'kira', 'rayo', 'fido', 'kira'];
  const arraySensitive = ['Maki', 'maki', 'MAKI', 'MAki'];
  expect(removeDuplicatesFromArray(arrayNumber)).toEqual([
    123, 234, 345, 456, 321, 432, 543,
  ]);
  // expect(removeDuplicatesFromArray(arrayNonNumber)).toEqual([123!,'*123*', '$123', 123])
  expect(removeDuplicatesFromArray(arrayString)).toEqual([
    'maki',
    'kira',
    'rayo',
    'fido',
  ]);
  expect(removeDuplicatesFromArray(arraySensitive)).toEqual([
    'Maki',
    'maki',
    'MAKI',
    'MAki',
  ]);
});

test.only('allowed to create a new product, not have the permissions', () => {
  // expect(createRandomProduct('clark@kent.com')).toEqual({
  //   id: expect.any(Number),
  //   name: expect.any(String),
  //   description: expect.any(String),
  //   price: expect.any(Number),
  //   tags: expect.any(Array)
  // });

  expect(createRandomProduct('clark@kent.com')).toEqual({
    id: expect.any(Number),
    name: expect.any(String),
    description: expect.any(String),
    price: expect.any(String),
    tags: expect.any(Array),
  });
});
