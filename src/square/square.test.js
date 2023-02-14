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

test('Square has selectSquare method', () => {
    expect(typeof square['selectSquare']).toBe('function');
});

test('selectSquare sets selected to true', () => {
    square.selectSquare();

    expect(square.selected).toBe(true);
});

test('Square has addShip method', () => {
    expect(typeof square['addShip']).toBe('function');
});

test('addShip sets ship to true', () => {
    square.addShip();
    
    expect(square.ship).toBe(true);
});