import Square from '../square/square.js';
import Ship from '../ship/ship.js';
import Dom from '../dom/dom.js';
import Game from '../game/game.js';

// Creates a gameboard object for the player and computer to handle actions performed on a gameboard
export default class Gameboard{
    constructor() {
        this.squares = this.buildBoard();
        this.ships = this.buildShips();
    }

    // Builds a board of square objects
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

    // Builds an array of ship objects
    buildShips() {
        return [ new Ship(5, 'carrier'), new Ship(4, 'battleship'), new Ship(3, 'destroyer'), new Ship(3, 'submarine'), new Ship(2, 'patroller') ];
    }

    // Handles a user who is placing their own ships
    userPlaceShips() {
        const shipQueue = [...this.ships];
        const dom = new Dom();
        let direction = 1;
        const move = document.querySelector('p.move');
        move.textContent = 'Place your carrier (5 spaces)';

        const directionButton = document.querySelector('div#place + div > button');
        // Changes the axis the ship is to be placed on
        directionButton.addEventListener('click', () => {
            direction = direction === 0 ? 1 : 0;
        });
        
        const placeGrid = Array.from(document.querySelectorAll('div#place>div.grid'));
        // Displays which ship is to be placed as the cursor
        placeGrid.forEach((grid) => {
            grid.addEventListener('mouseover', (event) => {
                if(direction === 0) event.target.classList.add(`${shipQueue[0].type}Rotated`);
                if(direction === 1) event.target.classList.add(`${shipQueue[0].type}`);
            });
        });

        placeGrid.forEach((grid) => {
            grid.addEventListener('mouseout', (event) => {
                if(shipQueue.length > 0) {                
                    if(direction === 0) event.target.classList.remove(`${shipQueue[0].type}Rotated`);
                    if(direction === 1) event.target.classList.remove(`${shipQueue[0].type}`);
                }            
            });
        });

        // A player has attempted to place a ship
        placeGrid.forEach((grid) => {
            grid.addEventListener('click', (event) => {
                const index = placeGrid.indexOf(event.target);
                let square = this.getSquareAtIndex(index);
                
                // Places a ship if there are no ships placed along the path
                if(!this.checkSquaresAreOccupied(square.coordinates[0], square.coordinates[1], direction, shipQueue[0].length)) {
                    const ship = shipQueue[0];
                    for(let i = 0; i < ship.length; i++) {
                        ship.coordinates.push(JSON.stringify(square.coordinates));
                        square.addShip();
                        square = direction === 0 ? this.findSquare(`[${square.coordinates[0]},${square.coordinates[1] + 1}]`) : this.findSquare(`[${square.coordinates[0] + 1},${square.coordinates[1]}]`);
                    }
                    dom.displayShips(this, placeGrid);
                    shipQueue.shift();
                    // Display which ship is to be placed
                    if(shipQueue.length!==0) move.textContent = `Place your ${shipQueue[0].type} (${shipQueue[0].length} spaces)`;
                    
                    // If the ship queue is empty, all ships have been placed
                    if(shipQueue.length === 0) {
                        dom.hidePlacement();
                        const game = new Game();
                        game.playGame(this, dom);
                    }
                }
            });
        });
    }

    // Returns legal random squares
    findLegalSquares(ship) {
        let xCoordinate;
        let yCoordinate;
        let direction;
        let squaresOccupied;

        // Continues to generate squares until legal ones are found
        do {
            xCoordinate = Math.round(Math.random() * 9);
            yCoordinate = Math.round(Math.random() * 9);
            direction = Math.round(Math.random());
            squaresOccupied = this.checkSquaresAreOccupied(xCoordinate, yCoordinate, direction, ship.length);
        } while(squaresOccupied || (direction === 0 && yCoordinate + ship.length > 9) || (direction === 1 && xCoordinate + ship.length > 9))

        return { xCoordinate, yCoordinate, direction };
    }

    // Finds a square at a set of coordinates
    findSquare(searchCoordinates) {
        return this.squares.find((element) => JSON.stringify(element.coordinates) === searchCoordinates);
    }

    // Checks if squares starting from a set of coordinates along a path are occupied and returns a boolean to represent this
    checkSquaresAreOccupied(xCoordinate, yCoordinate, direction, length) {
        for(let i = 0; i < length; i++) {
            const square = direction === 0 ? this.findSquare(`[${xCoordinate},${yCoordinate + i}]`) : this.findSquare(`[${xCoordinate + i},${yCoordinate}]`);
            
            if(square === undefined || square.ship === true) return true;
        }

        return false;
    }

    // Places ships at random for the computer
    placeShips() {
        this.ships.forEach((ship) => {
            let legalSquares = this.findLegalSquares(ship);
            const xCoordinate = legalSquares.xCoordinate;
            const yCoordinate = legalSquares.yCoordinate;
            const direction = legalSquares.direction;

            // Stores the coordinates for a placed ship
            for(let i = 0; i < ship.length; i++) {
                const square = direction === 0 ? this.findSquare(`[${xCoordinate},${yCoordinate + i}]`) : this.findSquare(`[${xCoordinate + i},${yCoordinate}]`);
                ship.coordinates.push(JSON.stringify(square.coordinates));
                square.addShip();
            }
        });
    }

    // Returns a ship at a given set of coordinates
    findShip(coordinates) {
        return this.ships.find((ship) => ship.coordinates.includes(coordinates));
    }

    // Returns a square at a given index
    getSquareAtIndex(index) {
        return this.squares[index];
    }

    // Returns the index of a square
    findSquareIndex(square) {
        return this.squares.indexOf(square);
    }

    // Called after a move has been made by either the player or the computer. Returns the result of the move
    receiveAttack(coordinates, player) {
        const square = this.findSquare(JSON.stringify(coordinates));
        let hit;
        let ship;

        // If there is a ship where a move has been made, this is registered as a hit
        if(square.ship === true) {
            ship = this.findShip(JSON.stringify(coordinates));
            ship.isHit();

            if(ship.isSunk()) {
                player.sinkShip();
            }

            hit = true;
        } else {
            // This represents a miss
            hit = false;
        }

        // Give the square a selected attribute to prevent duplicate moves on the same square
        square.selectSquare();

        return { hit, ship }
    }
}