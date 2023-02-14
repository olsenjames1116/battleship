export default class Ship {
    constructor(length, type, hits = 0, sunk = false, coordinates = []) {
        this.length = length;
        this.type = type;
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
