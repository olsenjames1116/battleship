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
        return [ new Ship(5, 'carrier'), new Ship(4, 'battleship'), new Ship(3, 'cruiser'), new Ship(3, 'submarine'), new Ship(2, 'destroyer') ];
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