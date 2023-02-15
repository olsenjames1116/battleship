import Dom from './dom.js';

const dom = new Dom();

test('Returns an object', () => {
    expect(typeof dom).toBe('object');
});