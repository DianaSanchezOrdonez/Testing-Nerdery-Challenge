import {
  isInteger,
  toLowerCase,
  removeDuplicatesFromArray,
  createRandomProduct,
  getStarWarsPlanets,
  createProduct,
} from './index';

import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';

jest.mock('node-fetch', () => {
  return jest.fn();
});

beforeEach(() => {
  mocked(fetch).mockClear();
});

test('isInteger valid', () => {
  expect(isInteger(123)).toBe(true);
  expect(isInteger(1234567890123456789012345678901234567890)).toBe(true);
});

test.only('isInteger invalid', () => {
  expect(isInteger('abc')).toBe(false);
  expect(isInteger('abc123')).toBe(false);
  expect(isInteger(123!)).toBe(false)
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
  const arrayString = ['Maki', 'kira', 'MAKI', 'rayo', 'fido', 'kira'];
  const arraySingle = ['one'];
  expect(removeDuplicatesFromArray(arrayNumber)).toEqual([
    123, 234, 345, 456, 321, 432, 543,
  ]);
  // expect(removeDuplicatesFromArray(arrayNonNumber)).toEqual([123!,'*123*', '$123', 123])
  expect(removeDuplicatesFromArray(arrayString)).toEqual([
    'Maki', 'kira', 'MAKI', 'rayo', 'fido'
  ]);
  expect(removeDuplicatesFromArray(arraySingle)).toEqual(arraySingle);
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

test('get planets with fetch', async () => {
  // provide a mock implementation for the mocked fetch:
  mocked(fetch).mockImplementation((): Promise<any> => {
    return Promise.resolve({
      json() {
        return Promise.resolve([
          {
            name: 'Tatooine',
            rotation_period: '23',
            orbital_period: '304',
            diameter: '10465',
            climate: 'arid',
            gravity: '1 standard',
            terrain: 'desert',
            surface_water: '1',
            population: '200000',
          },
          {
            name: 'Alderaan',
            rotation_period: '24',
            orbital_period: '364',
            diameter: '12500',
            climate: 'temperate',
            gravity: '1 standard',
            terrain: 'grasslands, mountains',
            surface_water: '40',
            population: '2000000000',
          },
        ]);
      },
    });
  });

  // getPeople uses the mock implementation for fetch:
  const planet = await getStarWarsPlanets();
  expect(planet.length).toBe(2)
  expect(planet[0].name).toEqual('Tatooine')
  expect(planet[1].name).toEqual('Alderaan')
  //expect(mocked(fetch).mock.calls.length).toBe(1);
  //expect(person).toBeDefined();
  
});

test('error with the fetch', async () => {
  // provide a mock implementation for the mocked fetch:
  mocked(fetch).mockImplementation((): Promise<any> => {
    return Promise.reject({
      json() {
        return Promise.reject();
      },
    });
  });

  // getPeople uses the mock implementation for fetch:
  const error = await getStarWarsPlanets().catch((e) => e);
  expect(error).toMatchInlineSnapshot(`[Error: unable to make request]`);
});
