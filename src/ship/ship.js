export default class Ship {
    constructor(length, hits = 0, sunk = false, coordinates = null) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
        this.coordinates = coordinates;
    }

    isHit() {
        this.hits += 1;
    }

    isSunk() {
        this.sunk = this.length === this.hits ? true : false;
        return this.sunk;
    }
}
