import Player from './player.js';

const player = new Player();

test('Returns an object', () => {
  expect(typeof player).toBe('object');
});

test('Player has a type property', () => {
  expect(player.hasOwnProperty('type')).toBe(true);
});

test('Player has a randomMove method', () => {
  expect(typeof player['randomMove']).toBe('function');
});
