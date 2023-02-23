import Gameboard from './gameboard.js';

const gameboard = new Gameboard();

test('Returns an object', () => {
  expect(typeof gameboard).toBe('object');
});

test('Gameboard has a squares property', () => {
  expect(gameboard.hasOwnProperty('squares')).toBe(true);
});

test('Squares property is of type array', () => {
  expect(Array.isArray(gameboard.squares)).toBe(true);
});

test('Gameboard has a ships property', () => {
  expect(gameboard.hasOwnProperty('ships')).toBe(true);
});

test('Ships property is of type array', () => {
  expect(Array.isArray(gameboard.ships)).toBe(true);
});

test('Gameboard has a placeShips method', () => {
  expect(typeof gameboard['placeShips']).toBe('function');
});

test('Gameboard has a receiveAttack method', () => {
  expect(typeof gameboard['receiveAttack']).toBe('function');
});
