import Square from '../square/square.js';
import Ship from '../ship/ship.js';
import Dom from '../dom/dom.js';

export default class Gameboard{
    constructor() {
        this.squares = this.buildBoard();
        this.ships = this.buildShips();
    }

    buildBoard() {
        const board = [];
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                const square = new Square([j, i]);

                board.push(square);
            }
        }

        return board;
    }

    buildShips() {
        return [ new Ship(5, 'carrier'), new Ship(4, 'battleship'), new Ship(3, 'destroyer'), new Ship(3, 'submarine'), new Ship(2, 'patroller') ];
    }

    userPlaceShips() {
        const shipQueue = this.ships;
        const dom = new Dom();
        let direction = 1;

        const directionButton = document.querySelector('div#place + button');
        directionButton.addEventListener('click', () => {
            direction = direction === 0 ? 1 : 0;
        });
        
        const placeGrid = Array.from(document.querySelectorAll('div#place>div.grid'));
        placeGrid.forEach((grid) => {
            grid.addEventListener('mouseover', (event) => {
                if(direction === 0) event.target.classList.add(`${shipQueue[0].type}Rotated`);
                if(direction === 1) event.target.classList.add(`${shipQueue[0].type}`);
            });
        });

        placeGrid.forEach((grid) => {
            grid.addEventListener('mouseout', (event) => {
                if(direction === 0) event.target.classList.remove(`${shipQueue[0].type}Rotated`);
                if(direction === 1) event.target.classList.remove(`${shipQueue[0].type}`);
            });
        });

        placeGrid.forEach((grid) => {
            grid.addEventListener('click', (event) => {
                const index = placeGrid.indexOf(event.target);
                let square = this.getSquareAtIndex(index);
    
                if(!this.checkSquaresAreOccupied(square.coordinates[0], square.coordinates[1], direction, shipQueue[0].length)) {
                    const ship = shipQueue[0];
                    for(let i = 0; i < ship.length; i++) {
                        ship.coordinates.push(JSON.stringify(square.coordinates));
                        square.addShip();
                        square = direction === 0 ? this.findSquare(`[${square.coordinates[0]},${square.coordinates[1] + 1}]`) : this.findSquare(`[${square.coordinates[0] + 1},${square.coordinates[1]}]`);
                    }
                    dom.displayShips(this, placeGrid);
                    shipQueue.shift();
                }
            });
        });
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
                square.addShip();
            }
        });
    }

    findShip(coordinates) {
        return this.ships.find((ship) => ship.coordinates.includes(coordinates));
    }

    getSquareAtIndex(index) {
        return this.squares[index];
    }

    findSquareIndex(square) {
        return this.squares.indexOf(square);
    }

    receiveAttack(coordinates, player) {
        const square = this.findSquare(JSON.stringify(coordinates));
        let hit;
        let ship;
        console.log(coordinates);

        if(square.ship === true) {
            ship = this.findShip(JSON.stringify(coordinates));
            ship.isHit();

            if(ship.isSunk()) {
                player.sinkShip();
            }

            hit = true;
        } else {
            hit = false;
        }

        square.selectSquare();

        return { hit, ship }
    }
}