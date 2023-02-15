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

    findLegalSquares(ship) {
        let xCoordinate;
        let yCoordinate;
        let direction;
        let squaresOccupied;

        do {
            xCoordinate = Math.round(Math.random() * 9);
            yCoordinate = Math.round(Math.random() * 9);
            direction = Math.round(Math.random());
            squaresOccupied = this.checkSquaresAreOccupied(xCoordinate, yCoordinate, direction, ship.length);
        } while(squaresOccupied || (direction === 0 && yCoordinate + ship.length > 9) || (direction === 1 && xCoordinate + ship.length > 9))

        return { xCoordinate, yCoordinate, direction };
    }

    findSquare(searchCoordinates) {
        return this.squares.find((element) => JSON.stringify(element.coordinates) === searchCoordinates);
    }

    checkSquaresAreOccupied(xCoordinate, yCoordinate, direction, length) {
        for(let i = 0; i < length; i++) {
            const square = direction === 0 ? this.findSquare(`[${xCoordinate},${yCoordinate + i}]`) : this.findSquare(`[${xCoordinate + i},${yCoordinate}]`);
            
            if(square === undefined || square.ship === true) return true;
        }

        return false;
    }

    placeShips() {
        this.ships.forEach((ship) => {
            let legalSquares = this.findLegalSquares(ship);
            const xCoordinate = legalSquares.xCoordinate;
            const yCoordinate = legalSquares.yCoordinate;
            const direction = legalSquares.direction;

            for(let i = 0; i < ship.length; i++) {
                const square = direction === 0 ? this.findSquare(`[${xCoordinate},${yCoordinate + i}]`) : this.findSquare(`[${xCoordinate + i},${yCoordinate}]`);
                ship.coordinates.push(JSON.stringify(square.coordinates));
                square.ship = true;
            }

            // globalCoordinate.push([xCoordinate, yCoordinate]);
            // globalCoordinate.push([xCoordinate, yCoordinate + 1]);
        });
    }

    findShip(coordinates) {
        return this.ships.find((ship) => ship.coordinates.includes(coordinates));
    }

    reportSink(shipType) {
        console.log(`${shipType} has been sunk`);
    }

    receiveAttack(coordinates) {
        const square = this.findSquare(JSON.stringify(coordinates));

        if(square.selected === false) {
            if(square.ship === true) {
                const ship = this.findShip(JSON.stringify(coordinates));
                ship.isHit();

                if(ship.isSunk()) this.reportSink(ship.type);
            } else {
                // Display a miss
            }
        }

        square.selected = true;
    }
}

// let globalCoordinate = [];

const gameboard = new Gameboard();
const array = gameboard.placeShips();
// gameboard.receiveAttack(JSON.stringify(globalCoordinate[globalCoordinate.length - 1]));
// gameboard.receiveAttack(JSON.stringify(globalCoordinate[globalCoordinate.length - 2]));