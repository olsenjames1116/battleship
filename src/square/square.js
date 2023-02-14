export default class Square {
    constructor(coordinates, selected = false, ship = false) {
        this.coordinates = coordinates;
        this.selected = selected;
        this.ship = ship;
    }

    selectSquare() {
        this.selected = true;
    }

    addShip() {
        this.ship = true;
    }
}