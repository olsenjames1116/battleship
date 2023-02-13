import Ship from './ship.js';

const ship = new Ship(2);

test('Returns an object', () => {
    expect(typeof ship).toEqual('object');
});

test('Ship has length property', () => {
    expect(ship.hasOwnProperty('length')).toBe(true);
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

test('Ship has hit method', () => {
    expect(typeof ship['hit']).toBe("function");
});

test('Ship has an isSunk method', () => {
    expect(typeof ship['isSunk']).toBe("function");
});