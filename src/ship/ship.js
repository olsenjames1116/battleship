export default class Ship {
    constructor(length, hits = 0, sunk = false, coordinates = null) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
        this.coordinates = coordinates;
    }
}