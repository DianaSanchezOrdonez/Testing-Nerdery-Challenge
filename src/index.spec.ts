import {
  isInteger,
  toLowerCase,
  removeDuplicatesFromArray,
  createRandomProduct,
  getStarWarsPlanets,
  createProduct,
} from './index';

import productsError from './utils/products';
import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';

jest.mock('node-fetch', () => {
  return jest.fn();
});

beforeEach(() => {
  mocked(fetch).mockClear();
});

describe('isInteger function', () => {
  test('isInteger valid', () => {
    expect(isInteger(123)).toBe(true);
    expect(isInteger(-123)).toBe(true);
  });

  test('isInteger invalid', () => {
    expect(isInteger('abc')).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
  });
});

describe('toLowerCase function', () => {
  test('return a lowercase string', () => {
    expect(toLowerCase('ABCDE')).toBe('abcde');
    expect(toLowerCase('abcde')).toBe('abcde');
    expect(toLowerCase('AbCdE')).toBe('abcde');
    expect(toLowerCase('A1B2C')).toBe('a1b2c');
  });

  test('return a error of the argument must be a string', () => {
    expect(toLowerCase(null)).toBe('Please provide a string');
    expect(toLowerCase(undefined)).toBe('Please provide a string');
  });
});

describe('removeDuplicatesFromArray function', () => {
  test('return array without duplicates', () => {
    const arrayNumber = [2004, 2008, 2012, 2021, 2012];
    const arrayNoNumber = [
      123,
      234,
      undefined,
      234,
      123,
      null,
      null,
      undefined,
    ];
    const arrayString = ['Maki', 'kira', 'MAKI', 'rayo', 'fido', 'kira'];
    const arraySingle = ['one'];

    expect(removeDuplicatesFromArray(arrayNumber)).toEqual([
      2004, 2008, 2012, 2021,
    ]);

    expect(removeDuplicatesFromArray(arrayNoNumber)).toEqual([
      123,
      234,
      undefined,
      null,
    ]);

    expect(removeDuplicatesFromArray(arrayString)).toEqual([
      'Maki',
      'kira',
      'MAKI',
      'rayo',
      'fido',
    ]);

    expect(removeDuplicatesFromArray(arraySingle)).toEqual(arraySingle);
  });

  test('return a error of the argument must be an array<string | number>', () => {
    expect(() => removeDuplicatesFromArray(null)).toThrow(Error);
    expect(() => removeDuplicatesFromArray(undefined)).toThrow(Error);
  });
});

describe('createRandomProduct function', () => {
  test('disallowed to create a random product, not have the permissions', () => {
    expect(() => createRandomProduct('diana@themyscira.com')).toThrow(
      'You are not allowed to create products',
    );
    expect(() => createRandomProduct('bruce@wayne.com')).toThrow(
      'You are not allowed to create products',
    );
  });

  test('allowed to create a random product', () => {
    //ERROR CASE
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
});

describe('createProduct function', () => {
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

  productsError.forEach((product) => {
    test(`invalid ${JSON.stringify(product.name)}`, () => {
      expect(() => createProduct(product)).toThrow(Error);
    });
  });
});

describe('getStarWarsPlanets function', () => {
  test('get planets with fetch', async () => {

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

    const planet = await getStarWarsPlanets();
    expect(planet.length).toBe(2);
    expect(planet[0].name).toEqual('Tatooine');
    expect(planet[1].name).toEqual('Alderaan');
    expect(mocked(fetch).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "https://swapi.dev/api/planets",
        ],
      ]
    `);
  });

  test('get error with the fetch', async () => {
    mocked(fetch).mockImplementationOnce((): Promise<any> => {
      return Promise.reject({
        json() {
          return Promise.reject();
        },
      });
    });

    const error = await getStarWarsPlanets().catch((e) => e);
    expect(error).toMatchInlineSnapshot(`[Error: unable to make request]`);
  });
});
