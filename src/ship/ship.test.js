import Ship from './ship.js';

const ship = new Ship();

test('Returns an object', () => {
    expect(ship).toEqual({});
});