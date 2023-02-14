import Player from './player.js';

const player = new Player();

test('Returns an object', () => {
    expect(typeof player).toBe('object');
});