import Square from './square.js';

const square = new Square();

test('Returns an object', () => {
    expect(typeof square).toBe('object');
});