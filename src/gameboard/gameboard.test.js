import Gameboard from './gameboard.js';

const gameboard = new Gameboard();

test('Returns an object', () => {
    expect(typeof gameboard).toBe('object');
});

test('Gameboard has an array property', () => {
    expect(Array.isArray(gameboard.array)).toBe(true);
});

test('Gameboard has a placeShips method', () => {
    expect(typeof gameboard['placeShips']).toBe('function');
});