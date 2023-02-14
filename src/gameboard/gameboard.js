import Square from '../square/square.js';

export default class Gameboard{
    constructor() {
        this.array = this.buildBoard();
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

    placeShips() {
        
    }
}

const gameboard = new Gameboard();
gameboard.array;