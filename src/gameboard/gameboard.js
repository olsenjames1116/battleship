import Square from '../square/square.js';
import Ship from '../ship/ship.js';

export default class Gameboard{
    constructor() {
        this.squares = this.buildBoard();
        this.ships = this.buildShips();
    }

    buildBoard() {
        const board = [];
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                const square = new Square([i, j]);

                board.push(square);
            }
        }

        return board;
    }

    buildShips() {
        const carrier = new Ship(5);
        const battleship = new Ship(4);
        const cruiser = new Ship(3);
        const submarine = new Ship(3);
        const destroyer = new Ship(2);

        return [ carrier, battleship, cruiser, submarine, destroyer ];
    }

    placeShips() {
        this.ships.forEach((ship) => {

            for(let i = 0; i < ship.length; i++) {

            }
        });
    }
}

const gameboard = new Gameboard();
gameboard.array;