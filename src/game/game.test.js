import Game from './game.js';

const game = new Game();

test('Returns an object', () => {
    expect(typeof game).toBe('object');
});