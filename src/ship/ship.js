// Creates a ship object to handle ships for the player and computer
export default class Ship {
  constructor(length, type, hits = 0, sunk = false, coordinates = []) {
    this.length = length;
    this.type = type;
    this.hits = hits;
    this.sunk = sunk;
    this.coordinates = coordinates;
  }

  // Called after a move has resulted in a hit
  isHit() {
    this.hits += 1;
  }

  // Returns whether or not a ship has been sunk
  isSunk() {
    this.sunk = this.length === this.hits ? true : false;
    return this.sunk;
  }
}
