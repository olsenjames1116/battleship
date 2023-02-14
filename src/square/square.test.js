import Square from './square.js';

const square = new Square();

test('Returns an object', () => {
    expect(typeof square).toBe('object');
});

test('Square has coordinates property', () => {
    expect(square.hasOwnProperty('coordinates')).toBe(true);
});

test('Square has selected property', () => {
    expect(square.hasOwnProperty('selected')).toBe(true);
});

test('Square has ship property', () => {
    expect(square.hasOwnProperty('ship')).toBe(true);
});