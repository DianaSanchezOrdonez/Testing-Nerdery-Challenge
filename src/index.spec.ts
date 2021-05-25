import {
  isInteger,
  toLowerCase,
  removeDuplicatesFromArray,
  createRandomProduct,
  getStarWarsPlanets,
  createProduct
} from './index';

import fetch, { Response } from 'node-fetch';

jest.mock('node-fetch')

beforeEach(() => {
  jest.clearAllMocks()
})
  
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

test('disallowed to create a random product, not have the permissions', () => {
  expect(() => createRandomProduct('diana@themyscira.com')).toThrow(
    `You are not allowed to create products`,
  );
  expect(() => createRandomProduct('bruce@wayne.com')).toThrow(
    `You are not allowed to create products`,
  );
});

test('allowed to create a random product', () => {
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

test('create a valid product', () => {
  const product = {
    name: 'Brown',
    tags: ['dairy'],
    description: 'Raw organic brown eggs',
    price: 28.1,
  };
  expect(createProduct(product)).toHaveProperty('id');
  expect(createProduct(product)).toEqual({
    id: expect.any(Number),
    ...product,
  });
});

test('create an invalid product', () => {
  const product = {
    name: 'Brown Eggs',
    tags: ['dairy'],
    description: 'Raw organic brown eggs',
    price: 28.1,
  };

  expect(() => createProduct(product)).toThrow();
});

