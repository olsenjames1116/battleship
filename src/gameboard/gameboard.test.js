import Gameboard from './gameboard.js';

const gameboard = new Gameboard();

test('Returns an object', () => {
    expect(typeof gameboard).toBe('object');
});