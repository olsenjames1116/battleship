// Creates a square object to represent a grid square on a gameboard for both the user and computer
export default class Square {
  constructor(coordinates, selected = false, ship = false) {
    this.coordinates = coordinates;
    this.selected = selected;
    this.ship = ship;
  }

  // A square has been selected and should not be again
  selectSquare() {
    this.selected = true;
  }

  // A ship now occupies at the square
  addShip() {
    this.ship = true;
  }
}
