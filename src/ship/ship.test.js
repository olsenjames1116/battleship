import Ship from './ship.js';

const ship = new Ship();

test('Returns an object', () => {
  expect(typeof ship).toEqual('object');
});

test('Ship has length property', () => {
  expect(ship.hasOwnProperty('length')).toBe(true);
});

test('Ship has type property', () => {
  expect(ship.hasOwnProperty('type')).toBe(true);
});

test('Ship has hits property', () => {
  expect(ship.hasOwnProperty('hits')).toBe(true);
});

test('Ship has sunk property', () => {
  expect(ship.hasOwnProperty('sunk')).toBe(true);
});

test('Ship has coordinates property', () => {
  expect(ship.hasOwnProperty('coordinates')).toBe(true);
});

test('Ship has isHit method', () => {
  expect(typeof ship['isHit']).toBe('function');
});

test('isHit adds a hit to the hit property', () => {
  ship.isHit();

  expect(ship.hits).toBe(1);
});

test('Ship has an isSunk method', () => {
  expect(typeof ship['isSunk']).toBe('function');
});

test('isSunk returns a boolean', () => {
  expect(typeof ship.isSunk()).toBe('boolean');
});

test('isSunk returns true if the length and hits are equal', () => {
  const ship2 = new Ship(0);

  expect(ship2.isSunk()).toBe(true);
});

test('isSunk returns false if the length and hits are not equal', () => {
  ship.length = 2;

  expect(ship.isSunk()).toBe(false);
});
