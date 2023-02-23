/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom/dom.js":
/*!************************!*\
  !*** ./src/dom/dom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dom)
/* harmony export */ });
// Creates a DOM object with methods to manipulate the DOM
class Dom {
  // Creates the grids to display on gameboards
  createGrids(board) {
    for (let i = 0; i < 100; i++) {
      const gridSquare = document.createElement('div');
      gridSquare.classList.add('grid');
      board.appendChild(gridSquare);
    }
  }

  // Displays the placement board for the user to place their ships
  displayPlaceBoard() {
    const gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');
    gameboard.id = 'place';
    document.querySelector('div.content').appendChild(gameboard);
    this.createGrids(gameboard);
    const buttonDiv = document.createElement('div');
    const directionButton = document.createElement('button');
    buttonDiv.appendChild(directionButton);
    document.querySelector('div.content').appendChild(buttonDiv);
    directionButton.textContent = 'Change Direction';
  }

  // Hide the placement board after all ships have been placed
  hidePlacement() {
    const placeBoard = document.querySelector('div#place');
    placeBoard.style.display = 'none';
    const buttonDiv = document.querySelector('div#place + div');
    buttonDiv.style.display = 'none';
  }

  // Display the player's and computer's gameboards
  loadBoards() {
    const playerWrapper = document.createElement('div');
    playerWrapper.classList.add('wrapper');
    const playerBoard = document.createElement('div');
    playerBoard.classList.add('gameboard');
    playerBoard.id = 'player';
    const playerLabel = document.createElement('h2');
    playerLabel.classList.add('label');
    playerLabel.textContent = "Player's Board";
    playerWrapper.append(playerLabel, playerBoard);
    const computerWrapper = document.createElement('div');
    computerWrapper.classList.add('wrapper');
    const computerBoard = document.createElement('div');
    computerBoard.classList.add('gameboard');
    computerBoard.id = 'computer';
    const computerLabel = document.createElement('h2');
    computerLabel.classList.add('label');
    computerLabel.textContent = "Computer's Board";
    computerWrapper.append(computerLabel, computerBoard);
    const content = document.querySelector('div.content');
    content.append(playerWrapper, computerWrapper);
    this.createGrids(playerBoard);
    this.createGrids(computerBoard);
  }

  // Display a ship on the gameboard after is has been placed by the user
  displayShips(gameboard, grid) {
    gameboard.ships.forEach(ship => {
      ship.coordinates.forEach(coordinate => {
        const square = gameboard.findSquare(coordinate);
        const index = gameboard.findSquareIndex(square);
        grid[index].classList.add('ship');
      });
    });
  }

  // Displays the result of the previous move to indicate whose turn it is
  displayMove(player, ship, hit) {
    const move = document.querySelector('p.move');

    // Displays the initial message
    if (player === undefined) {
      move.textContent = 'Standing by for fire mission';
      return;
    }
    if (ship !== undefined) {
      if (ship.isSunk() && player === 'Player') {
        move.textContent = `Damage Report: Computer's ${ship.type} has been destroyed!`;
        return;
      }
      if (ship.isSunk()) {
        move.textContent = `Damage Report: Player's ${ship.type} has been destroyed!`;
        return;
      }
    }
    if (hit) {
      move.textContent = `${player} Fire Mission! Target hit!`;
    } else {
      move.textContent = `${player} Fire Mission! Target missed!`;
    }
  }

  // Displays which turn number it is
  displayTurn(turnNumber) {
    const turn = document.querySelector('p.turn');
    turn.textContent = `Turn: ${turnNumber}`;
  }

  // Covers the page before the popup to block webpage interaction
  coverPage() {
    const pageCover = document.createElement('div');
    document.querySelector('body').appendChild(pageCover);
    pageCover.classList.add('pageCover');
  }

  // Displays the winner and allows for a new game
  winnerPopup(winner) {
    const popup = document.createElement('div');
    document.querySelector('body').appendChild(popup);
    popup.classList.add('popup');
    const popupHeader = document.createElement('h3');
    popup.appendChild(popupHeader);
    popupHeader.textContent = `${winner}'s Navy has sank their opponent's fleet. Play again?`;
    const restartButton = document.createElement('button');
    popup.appendChild(restartButton);
    restartButton.textContent = 'New Game';
    // Reloads a webpage to start a new game
    restartButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

/***/ }),

/***/ "./src/game/game.js":
/*!**************************!*\
  !*** ./src/game/game.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _player_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player/player.js */ "./src/player/player.js");
/* harmony import */ var _gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gameboard/gameboard.js */ "./src/gameboard/gameboard.js");



// Creates a game object to control the game
class Game {
  // Displays the winner and offers a new game at the end of a game
  endGame(dom, winner) {
    dom.coverPage();
    dom.winnerPopup(winner);
  }

  // Called to control the execution of the game
  playGame(placeBoard, dom) {
    const player = new _player_player_js__WEBPACK_IMPORTED_MODULE_0__["default"]('Player');
    const computer = new _player_player_js__WEBPACK_IMPORTED_MODULE_0__["default"]('Computer');
    const computerBoard = new _gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const playerBoard = placeBoard;
    computerBoard.placeShips();
    dom.loadBoards();
    let turn = 0;
    dom.displayMove();
    dom.displayTurn(turn);
    const playerGrid = Array.from(document.querySelectorAll('div#player>div.grid'));
    dom.displayShips(playerBoard, playerGrid);
    const computerGrid = Array.from(document.querySelectorAll('div#computer>div.grid'));
    // Executes the turn for both the player and computer after a move has been made by the player
    computerGrid.forEach(grid => {
      grid.addEventListener('click', event => {
        const index = computerGrid.indexOf(event.target);
        const square = computerBoard.getSquareAtIndex(index);

        // If a grid square has not been selected yet, the move is executed
        if (square.selected === false) {
          turn += 1;
          // Begin the player's turn
          const playerMove = computerBoard.receiveAttack(square.coordinates, computer);
          playerMove.hit ? grid.classList.add('hit') : grid.classList.add('miss');
          dom.displayMove(player.type, playerMove.ship, playerMove.hit);
          dom.displayTurn(turn);

          // If the computer has no more ships, the player has won
          if (computer.ships === 0) {
            this.endGame(dom, player.type);
            return;
          }

          // A timeout function for the computer is used to simulate a more accurate move
          setTimeout(() => {
            // Begin the computer's turn
            const computerMove = computer.randomMove(playerBoard, player);
            const squareIndex = playerBoard.findSquareIndex(computerMove.square);
            computerMove.hit ? playerGrid[squareIndex].classList.add('hit') : playerGrid[squareIndex].classList.add('miss');
            turn += 1;
            dom.displayMove(computer.type, computerMove.ship, computerMove.hit);
            dom.displayTurn(turn);

            // If the player has no more ships, the computer has won
            if (player.ships === 0) this.endGame(dom, computer.type);
          }, 3000);
        }
      });
    });
  }
}

/***/ }),

/***/ "./src/gameboard/gameboard.js":
/*!************************************!*\
  !*** ./src/gameboard/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _square_square_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../square/square.js */ "./src/square/square.js");
/* harmony import */ var _ship_ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ship/ship.js */ "./src/ship/ship.js");
/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom/dom.js */ "./src/dom/dom.js");
/* harmony import */ var _game_game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game/game.js */ "./src/game/game.js");





// Creates a gameboard object for the player and computer to handle actions performed on a gameboard
class Gameboard {
  constructor() {
    this.squares = this.buildBoard();
    this.ships = this.buildShips();
  }

  // Builds a board of square objects
  buildBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = new _square_square_js__WEBPACK_IMPORTED_MODULE_0__["default"]([j, i]);
        board.push(square);
      }
    }
    return board;
  }

  // Builds an array of ship objects
  buildShips() {
    return [new _ship_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](5, 'carrier'), new _ship_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](4, 'battleship'), new _ship_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](3, 'destroyer'), new _ship_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](3, 'submarine'), new _ship_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, 'patroller')];
  }

  // Handles a user who is placing their own ships
  userPlaceShips() {
    const shipQueue = [...this.ships];
    const dom = new _dom_dom_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
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
    placeGrid.forEach(grid => {
      grid.addEventListener('mouseover', event => {
        if (direction === 0) event.target.classList.add(`${shipQueue[0].type}Rotated`);
        if (direction === 1) event.target.classList.add(`${shipQueue[0].type}`);
      });
    });
    placeGrid.forEach(grid => {
      grid.addEventListener('mouseout', event => {
        if (shipQueue.length > 0) {
          if (direction === 0) event.target.classList.remove(`${shipQueue[0].type}Rotated`);
          if (direction === 1) event.target.classList.remove(`${shipQueue[0].type}`);
        }
      });
    });

    // A player has attempted to place a ship
    placeGrid.forEach(grid => {
      grid.addEventListener('click', event => {
        const index = placeGrid.indexOf(event.target);
        let square = this.getSquareAtIndex(index);

        // Places a ship if there are no ships placed along the path
        if (!this.checkSquaresAreOccupied(square.coordinates[0], square.coordinates[1], direction, shipQueue[0].length)) {
          const ship = shipQueue[0];
          for (let i = 0; i < ship.length; i++) {
            ship.coordinates.push(JSON.stringify(square.coordinates));
            square.addShip();
            square = direction === 0 ? this.findSquare(`[${square.coordinates[0]},${square.coordinates[1] + 1}]`) : this.findSquare(`[${square.coordinates[0] + 1},${square.coordinates[1]}]`);
          }
          dom.displayShips(this, placeGrid);
          shipQueue.shift();
          // Display which ship is to be placed
          if (shipQueue.length !== 0) move.textContent = `Place your ${shipQueue[0].type} (${shipQueue[0].length} spaces)`;

          // If the ship queue is empty, all ships have been placed
          if (shipQueue.length === 0) {
            dom.hidePlacement();
            const game = new _game_game_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
    } while (squaresOccupied || direction === 0 && yCoordinate + ship.length > 9 || direction === 1 && xCoordinate + ship.length > 9);
    return {
      xCoordinate,
      yCoordinate,
      direction
    };
  }

  // Finds a square at a set of coordinates
  findSquare(searchCoordinates) {
    return this.squares.find(element => JSON.stringify(element.coordinates) === searchCoordinates);
  }

  // Checks if squares starting from a set of coordinates along a path are occupied and returns a boolean to represent this
  checkSquaresAreOccupied(xCoordinate, yCoordinate, direction, length) {
    for (let i = 0; i < length; i++) {
      const square = direction === 0 ? this.findSquare(`[${xCoordinate},${yCoordinate + i}]`) : this.findSquare(`[${xCoordinate + i},${yCoordinate}]`);
      if (square === undefined || square.ship === true) return true;
    }
    return false;
  }

  // Places ships at random for the computer
  placeShips() {
    this.ships.forEach(ship => {
      let legalSquares = this.findLegalSquares(ship);
      const xCoordinate = legalSquares.xCoordinate;
      const yCoordinate = legalSquares.yCoordinate;
      const direction = legalSquares.direction;

      // Stores the coordinates for a placed ship
      for (let i = 0; i < ship.length; i++) {
        const square = direction === 0 ? this.findSquare(`[${xCoordinate},${yCoordinate + i}]`) : this.findSquare(`[${xCoordinate + i},${yCoordinate}]`);
        ship.coordinates.push(JSON.stringify(square.coordinates));
        square.addShip();
      }
    });
  }

  // Returns a ship at a given set of coordinates
  findShip(coordinates) {
    return this.ships.find(ship => ship.coordinates.includes(coordinates));
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
    if (square.ship === true) {
      ship = this.findShip(JSON.stringify(coordinates));
      ship.isHit();
      if (ship.isSunk()) {
        player.sinkShip();
      }
      hit = true;
    } else {
      // This represents a miss
      hit = false;
    }

    // Give the square a selected attribute to prevent duplicate moves on the same square
    square.selectSquare();
    return {
      hit,
      ship
    };
  }
}

/***/ }),

/***/ "./src/player/player.js":
/*!******************************!*\
  !*** ./src/player/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
// Creates a player object to represent the player and computer
class Player {
  constructor(type) {
    this.type = type;
    this.ships = 5;
  }

  // Remove a ship that has been sunk from the player
  sinkShip() {
    this.ships -= 1;
  }

  // Makes a random legal move for the computer
  randomMove(gameboard, player) {
    let square;
    let move;

    // Generates a set of coordinates for a move until it finds a square that has not been selected
    do {
      move = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
      square = gameboard.findSquare(JSON.stringify(move));
    } while (square.selected === true);
    const computerMove = gameboard.receiveAttack(move, player);
    const hit = computerMove.hit;
    const ship = computerMove.ship;
    return {
      hit,
      ship,
      square
    };
  }
}

/***/ }),

/***/ "./src/ship/ship.js":
/*!**************************!*\
  !*** ./src/ship/ship.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
// Creates a ship object to handle ships for the player and computer
class Ship {
  constructor(length, type) {
    let hits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let sunk = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let coordinates = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
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

/***/ }),

/***/ "./src/square/square.js":
/*!******************************!*\
  !*** ./src/square/square.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Square)
/* harmony export */ });
// Creates a square object to represent a grid square on a gameboard for both the user and computer
class Square {
  constructor(coordinates) {
    let selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let ship = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
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

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/blackopsone-regular-webfont.woff2 */ "./src/fonts/blackopsone-regular-webfont.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/blackopsone-regular-webfont.woff */ "./src/fonts/blackopsone-regular-webfont.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/sourcecodepro-variablefont_wght-webfont.woff2 */ "./src/fonts/sourcecodepro-variablefont_wght-webfont.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/sourcecodepro-variablefont_wght-webfont.woff */ "./src/fonts/sourcecodepro-variablefont_wght-webfont.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./images/background.jpg */ "./src/images/background.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./images/carrier.png */ "./src/images/carrier.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./images/carrier.rotated.png */ "./src/images/carrier.rotated.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./images/battleship.png */ "./src/images/battleship.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./images/battleship.rotated.png */ "./src/images/battleship.rotated.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ./images/destroyer.png */ "./src/images/destroyer.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ./images/destroyer.rotated.png */ "./src/images/destroyer.rotated.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ./images/submarine.png */ "./src/images/submarine.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ./images/submarine.rotated.png */ "./src/images/submarine.rotated.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ./images/patroller.png */ "./src/images/patroller.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ./images/patroller.rotated.png */ "./src/images/patroller.rotated.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_13___);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_14___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: 'blackOps';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'sourceCode';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ")\n      format('woff2'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n\n* {\n  margin: 0;\n}\n\nbody {\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  font-family: 'sourceCode', sans-serif;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") no-repeat center center fixed;\n  background-size: cover;\n}\n\ndiv.header {\n  font-family: 'blackOps', sans-serif;\n  font-size: 2rem;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  display: flex;\n  justify-content: center;\n  color: rgb(203, 200, 200);\n}\n\ndiv.content {\n  flex-grow: 1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  justify-items: center;\n  gap: 10px;\n}\n\ndiv.info {\n  grid-area: 1 / 1 / 2 / 3;\n  font-size: 1.5rem;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: black;\n  color: rgb(5, 224, 5);\n  width: 75%;\n  border: 5px solid rgb(5, 224, 5);\n  text-align: center;\n}\n\n.label {\n  padding: 5px;\n  background-color: gray;\n  width: max-content;\n}\n\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\ndiv.gameboard {\n  display: grid;\n  grid-gap: 1px;\n  outline: 5px solid gray;\n  border: 1px solid rgb(68, 68, 255);\n  background-color: rgb(68, 68, 255);\n  grid-template-columns: repeat(10, 1fr);\n  width: 500px;\n  height: 500px;\n}\n\ndiv#place > div.grid:hover {\n  background-color: rgb(68, 68, 255);\n}\n\ndiv#place > div.carrier {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + "), auto;\n}\n\ndiv#place > div.carrierRotated {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + "), auto;\n}\n\ndiv#place > div.battleship {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + "), auto;\n}\n\ndiv#place > div.battleshipRotated {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + "), auto;\n}\n\ndiv#place > div.destroyer {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + "), auto;\n}\n\ndiv#place > div.destroyerRotated {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + "), auto;\n}\n\ndiv#place > div.submarine {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + "), auto;\n}\n\ndiv#place > div.submarineRotated {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + "), auto;\n}\n\ndiv#place > div.patroller {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + "), auto;\n}\n\ndiv#place > div.patrollerRotated {\n  cursor: url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + "), auto;\n}\n\ndiv#place + div {\n  display: flex;\n  align-items: center;\n}\n\ndiv#place + div > button {\n  height: 100px;\n  width: max-content;\n}\n\ndiv#player {\n  grid-area: 2 / 1 / 3 / 2;\n}\n\ndiv.grid {\n  background-color: rgb(1, 1, 53);\n}\n\ndiv#computer > div.grid:hover {\n  background-color: rgb(68, 68, 255);\n}\n\ndiv.ship {\n  background-color: gray;\n}\n\ndiv.gameboard > div.hit {\n  background-color: red !important;\n}\n\ndiv.gameboard > div.miss {\n  background-color: white;\n}\n\n.pageCover {\n  display: block;\n  position: fixed;\n  z-index: 10;\n  background-color: rgba(0, 0, 0, 0.25);\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n}\n\n.popup {\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  position: fixed;\n  align-items: center;\n  z-index: 100;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 50%;\n  background: black;\n  color: rgb(5, 224, 5);\n  font-size: 1.5rem;\n  height: 200px;\n  padding: 10px;\n  border: 5px solid rgb(5, 224, 5);\n  text-align: center;\n}\n\nbutton {\n  background-color: rgb(5, 224, 5);\n  border: 0;\n  font-family: 'sourceCode', sans-serif;\n  font-weight: bold;\n  font-size: 1rem;\n}\n\ndiv.popup > button {\n  margin-top: auto;\n  width: 25%;\n  height: 25%;\n}\n\nbutton:hover {\n  background-color: rgb(0, 179, 0);\n}\n\ndiv.footer {\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: white;\n  font-weight: bold;\n}\n\na {\n  text-decoration: none;\n  color: rgb(5, 224, 5);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB;0DACgE;EAChE,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB;;0DAE4E;EAC5E,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,qCAAqC;EACrC,iFAAwE;EACxE,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;EACnC,eAAe;EACf,8BAA8B;EAC9B,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;EACrB,SAAS;AACX;;AAEA;EACE,wBAAwB;EACxB,iBAAiB;EACjB,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,qBAAqB;EACrB,UAAU;EACV,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,kCAAkC;EAClC,kCAAkC;EAClC,sCAAsC;EACtC,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,qDAAyC;AAC3C;;AAEA;EACE,qDAAiD;AACnD;;AAEA;EACE,qDAA4C;AAC9C;;AAEA;EACE,qDAAoD;AACtD;;AAEA;EACE,qDAA2C;AAC7C;;AAEA;EACE,sDAAmD;AACrD;;AAEA;EACE,sDAA2C;AAC7C;;AAEA;EACE,sDAAmD;AACrD;;AAEA;EACE,sDAA2C;AAC7C;;AAEA;EACE,sDAAmD;AACrD;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,cAAc;EACd,eAAe;EACf,WAAW;EACX,qCAAqC;EACrC,YAAY;EACZ,aAAa;EACb,MAAM;EACN,OAAO;AACT;;AAEA;EACE,uBAAuB;EACvB,aAAa;EACb,sBAAsB;EACtB,eAAe;EACf,mBAAmB;EACnB,YAAY;EACZ,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,UAAU;EACV,iBAAiB;EACjB,qBAAqB;EACrB,iBAAiB;EACjB,aAAa;EACb,aAAa;EACb,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,gCAAgC;EAChC,SAAS;EACT,qCAAqC;EACrC,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,UAAU;EACV,WAAW;AACb;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,qBAAqB;EACrB,qBAAqB;AACvB","sourcesContent":["@font-face {\n  font-family: 'blackOps';\n  src: url('./fonts/blackopsone-regular-webfont.woff2') format('woff2'),\n    url('./fonts/blackopsone-regular-webfont.woff') format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'sourceCode';\n  src: url('./fonts/sourcecodepro-variablefont_wght-webfont.woff2')\n      format('woff2'),\n    url('./fonts/sourcecodepro-variablefont_wght-webfont.woff') format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n\n* {\n  margin: 0;\n}\n\nbody {\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  font-family: 'sourceCode', sans-serif;\n  background: url('./images/background.jpg') no-repeat center center fixed;\n  background-size: cover;\n}\n\ndiv.header {\n  font-family: 'blackOps', sans-serif;\n  font-size: 2rem;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  display: flex;\n  justify-content: center;\n  color: rgb(203, 200, 200);\n}\n\ndiv.content {\n  flex-grow: 1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  justify-items: center;\n  gap: 10px;\n}\n\ndiv.info {\n  grid-area: 1 / 1 / 2 / 3;\n  font-size: 1.5rem;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: black;\n  color: rgb(5, 224, 5);\n  width: 75%;\n  border: 5px solid rgb(5, 224, 5);\n  text-align: center;\n}\n\n.label {\n  padding: 5px;\n  background-color: gray;\n  width: max-content;\n}\n\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\ndiv.gameboard {\n  display: grid;\n  grid-gap: 1px;\n  outline: 5px solid gray;\n  border: 1px solid rgb(68, 68, 255);\n  background-color: rgb(68, 68, 255);\n  grid-template-columns: repeat(10, 1fr);\n  width: 500px;\n  height: 500px;\n}\n\ndiv#place > div.grid:hover {\n  background-color: rgb(68, 68, 255);\n}\n\ndiv#place > div.carrier {\n  cursor: url('./images/carrier.png'), auto;\n}\n\ndiv#place > div.carrierRotated {\n  cursor: url('./images/carrier.rotated.png'), auto;\n}\n\ndiv#place > div.battleship {\n  cursor: url('./images/battleship.png'), auto;\n}\n\ndiv#place > div.battleshipRotated {\n  cursor: url('./images/battleship.rotated.png'), auto;\n}\n\ndiv#place > div.destroyer {\n  cursor: url('./images/destroyer.png'), auto;\n}\n\ndiv#place > div.destroyerRotated {\n  cursor: url('./images/destroyer.rotated.png'), auto;\n}\n\ndiv#place > div.submarine {\n  cursor: url('./images/submarine.png'), auto;\n}\n\ndiv#place > div.submarineRotated {\n  cursor: url('./images/submarine.rotated.png'), auto;\n}\n\ndiv#place > div.patroller {\n  cursor: url('./images/patroller.png'), auto;\n}\n\ndiv#place > div.patrollerRotated {\n  cursor: url('./images/patroller.rotated.png'), auto;\n}\n\ndiv#place + div {\n  display: flex;\n  align-items: center;\n}\n\ndiv#place + div > button {\n  height: 100px;\n  width: max-content;\n}\n\ndiv#player {\n  grid-area: 2 / 1 / 3 / 2;\n}\n\ndiv.grid {\n  background-color: rgb(1, 1, 53);\n}\n\ndiv#computer > div.grid:hover {\n  background-color: rgb(68, 68, 255);\n}\n\ndiv.ship {\n  background-color: gray;\n}\n\ndiv.gameboard > div.hit {\n  background-color: red !important;\n}\n\ndiv.gameboard > div.miss {\n  background-color: white;\n}\n\n.pageCover {\n  display: block;\n  position: fixed;\n  z-index: 10;\n  background-color: rgba(0, 0, 0, 0.25);\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n}\n\n.popup {\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  position: fixed;\n  align-items: center;\n  z-index: 100;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 50%;\n  background: black;\n  color: rgb(5, 224, 5);\n  font-size: 1.5rem;\n  height: 200px;\n  padding: 10px;\n  border: 5px solid rgb(5, 224, 5);\n  text-align: center;\n}\n\nbutton {\n  background-color: rgb(5, 224, 5);\n  border: 0;\n  font-family: 'sourceCode', sans-serif;\n  font-weight: bold;\n  font-size: 1rem;\n}\n\ndiv.popup > button {\n  margin-top: auto;\n  width: 25%;\n  height: 25%;\n}\n\nbutton:hover {\n  background-color: rgb(0, 179, 0);\n}\n\ndiv.footer {\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: white;\n  font-weight: bold;\n}\n\na {\n  text-decoration: none;\n  color: rgb(5, 224, 5);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/atlantisRage.mp3":
/*!******************************!*\
  !*** ./src/atlantisRage.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "1ca83152d3acc992fbd4af22b1ee4538.mp3");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/blackopsone-regular-webfont.woff":
/*!****************************************************!*\
  !*** ./src/fonts/blackopsone-regular-webfont.woff ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fdf9e2eba20ec23b5d4a.woff";

/***/ }),

/***/ "./src/fonts/blackopsone-regular-webfont.woff2":
/*!*****************************************************!*\
  !*** ./src/fonts/blackopsone-regular-webfont.woff2 ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "59ecdf4a4f05213cef64.woff2";

/***/ }),

/***/ "./src/fonts/sourcecodepro-variablefont_wght-webfont.woff":
/*!****************************************************************!*\
  !*** ./src/fonts/sourcecodepro-variablefont_wght-webfont.woff ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9c17dfccbaa8426d2903.woff";

/***/ }),

/***/ "./src/fonts/sourcecodepro-variablefont_wght-webfont.woff2":
/*!*****************************************************************!*\
  !*** ./src/fonts/sourcecodepro-variablefont_wght-webfont.woff2 ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c3b7631dadd43852ec6d.woff2";

/***/ }),

/***/ "./src/images/background.jpg":
/*!***********************************!*\
  !*** ./src/images/background.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2e76230377dfcc38f443.jpg";

/***/ }),

/***/ "./src/images/battleship.png":
/*!***********************************!*\
  !*** ./src/images/battleship.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1f689311c7e35e4684a3.png";

/***/ }),

/***/ "./src/images/battleship.rotated.png":
/*!*******************************************!*\
  !*** ./src/images/battleship.rotated.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "77d52c9a7cfaf728cfcc.png";

/***/ }),

/***/ "./src/images/carrier.png":
/*!********************************!*\
  !*** ./src/images/carrier.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a5ce7fb21dbf131b3cc2.png";

/***/ }),

/***/ "./src/images/carrier.rotated.png":
/*!****************************************!*\
  !*** ./src/images/carrier.rotated.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9372996dd518040fbef7.png";

/***/ }),

/***/ "./src/images/destroyer.png":
/*!**********************************!*\
  !*** ./src/images/destroyer.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "58d3a35bb4b76c9014d2.png";

/***/ }),

/***/ "./src/images/destroyer.rotated.png":
/*!******************************************!*\
  !*** ./src/images/destroyer.rotated.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5355d0b14404d9ae3264.png";

/***/ }),

/***/ "./src/images/patroller.png":
/*!**********************************!*\
  !*** ./src/images/patroller.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "70d608eb833ebc1eaa4d.png";

/***/ }),

/***/ "./src/images/patroller.rotated.png":
/*!******************************************!*\
  !*** ./src/images/patroller.rotated.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ab28c506232f59cb8244.png";

/***/ }),

/***/ "./src/images/submarine.png":
/*!**********************************!*\
  !*** ./src/images/submarine.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ee2805e347f88643ff8e.png";

/***/ }),

/***/ "./src/images/submarine.rotated.png":
/*!******************************************!*\
  !*** ./src/images/submarine.rotated.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2f9e0782b8d1b5d31f5c.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/dom.js */ "./src/dom/dom.js");
/* harmony import */ var _gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard/gameboard.js */ "./src/gameboard/gameboard.js");
/* harmony import */ var _atlantisRage_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./atlantisRage.mp3 */ "./src/atlantisRage.mp3");





// Builds and autoplays music when the page is loaded
const audio = document.createElement('audio');
audio.src = _atlantisRage_mp3__WEBPACK_IMPORTED_MODULE_3__["default"];
audio.autoplay = true;
audio.loop = true;
document.querySelector('body').appendChild(audio);

// Begin the game
const dom = new _dom_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
const playerBoard = new _gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
dom.displayPlaceBoard();
playerBoard.userPlaceShips(dom);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBWSxNQUFNLE9BQU8sYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sT0FBTyxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVks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LENBQUNDLEdBQUcsR0FBR0YseURBQUc7QUFDZkMsS0FBSyxDQUFDRSxRQUFRLEdBQUcsSUFBSTtBQUNyQkYsS0FBSyxDQUFDRyxJQUFJLEdBQUcsSUFBSTtBQUNqQjNILFFBQVEsQ0FBQ1EsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDSixXQUFXLENBQUNvSCxLQUFLLENBQUM7O0FBRWpEO0FBQ0EsTUFBTTNELEdBQUcsR0FBRyxJQUFJbEUsbURBQUcsRUFBRTtBQUNyQixNQUFNdUIsV0FBVyxHQUFHLElBQUl3QywrREFBUyxFQUFFO0FBRW5DRyxHQUFHLENBQUN4RCxpQkFBaUIsRUFBRTtBQUV2QmEsV0FBVyxDQUFDdUUsY0FBYyxDQUFDNUIsR0FBRyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NxdWFyZS9zcXVhcmUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXRsYW50aXNSYWdlLm1wMyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENyZWF0ZXMgYSBET00gb2JqZWN0IHdpdGggbWV0aG9kcyB0byBtYW5pcHVsYXRlIHRoZSBET01cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbSB7XG4gIC8vIENyZWF0ZXMgdGhlIGdyaWRzIHRvIGRpc3BsYXkgb24gZ2FtZWJvYXJkc1xuICBjcmVhdGVHcmlkcyhib2FyZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGNvbnN0IGdyaWRTcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGdyaWRTcXVhcmUuY2xhc3NMaXN0LmFkZCgnZ3JpZCcpO1xuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoZ3JpZFNxdWFyZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gRGlzcGxheXMgdGhlIHBsYWNlbWVudCBib2FyZCBmb3IgdGhlIHVzZXIgdG8gcGxhY2UgdGhlaXIgc2hpcHNcbiAgZGlzcGxheVBsYWNlQm9hcmQoKSB7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpO1xuICAgIGdhbWVib2FyZC5pZCA9ICdwbGFjZSc7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuY29udGVudCcpLmFwcGVuZENoaWxkKGdhbWVib2FyZCk7XG5cbiAgICB0aGlzLmNyZWF0ZUdyaWRzKGdhbWVib2FyZCk7XG5cbiAgICBjb25zdCBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBkaXJlY3Rpb25CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b25EaXYuYXBwZW5kQ2hpbGQoZGlyZWN0aW9uQnV0dG9uKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuY29udGVudCcpLmFwcGVuZENoaWxkKGJ1dHRvbkRpdik7XG4gICAgZGlyZWN0aW9uQnV0dG9uLnRleHRDb250ZW50ID0gJ0NoYW5nZSBEaXJlY3Rpb24nO1xuICB9XG5cbiAgLy8gSGlkZSB0aGUgcGxhY2VtZW50IGJvYXJkIGFmdGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkXG4gIGhpZGVQbGFjZW1lbnQoKSB7XG4gICAgY29uc3QgcGxhY2VCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwbGFjZScpO1xuICAgIHBsYWNlQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIGNvbnN0IGJ1dHRvbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwbGFjZSArIGRpdicpO1xuICAgIGJ1dHRvbkRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG5cbiAgLy8gRGlzcGxheSB0aGUgcGxheWVyJ3MgYW5kIGNvbXB1dGVyJ3MgZ2FtZWJvYXJkc1xuICBsb2FkQm9hcmRzKCkge1xuICAgIGNvbnN0IHBsYXllcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbGF5ZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXInKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpO1xuICAgIHBsYXllckJvYXJkLmlkID0gJ3BsYXllcic7XG4gICAgY29uc3QgcGxheWVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHBsYXllckxhYmVsLmNsYXNzTGlzdC5hZGQoJ2xhYmVsJyk7XG4gICAgcGxheWVyTGFiZWwudGV4dENvbnRlbnQgPSBcIlBsYXllcidzIEJvYXJkXCI7XG4gICAgcGxheWVyV3JhcHBlci5hcHBlbmQocGxheWVyTGFiZWwsIHBsYXllckJvYXJkKTtcblxuICAgIGNvbnN0IGNvbXB1dGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbXB1dGVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd3cmFwcGVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gICAgY29tcHV0ZXJCb2FyZC5pZCA9ICdjb21wdXRlcic7XG4gICAgY29uc3QgY29tcHV0ZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgY29tcHV0ZXJMYWJlbC5jbGFzc0xpc3QuYWRkKCdsYWJlbCcpO1xuICAgIGNvbXB1dGVyTGFiZWwudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyJ3MgQm9hcmRcIjtcbiAgICBjb21wdXRlcldyYXBwZXIuYXBwZW5kKGNvbXB1dGVyTGFiZWwsIGNvbXB1dGVyQm9hcmQpO1xuXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5jb250ZW50Jyk7XG4gICAgY29udGVudC5hcHBlbmQocGxheWVyV3JhcHBlciwgY29tcHV0ZXJXcmFwcGVyKTtcblxuICAgIHRoaXMuY3JlYXRlR3JpZHMocGxheWVyQm9hcmQpO1xuICAgIHRoaXMuY3JlYXRlR3JpZHMoY29tcHV0ZXJCb2FyZCk7XG4gIH1cblxuICAvLyBEaXNwbGF5IGEgc2hpcCBvbiB0aGUgZ2FtZWJvYXJkIGFmdGVyIGlzIGhhcyBiZWVuIHBsYWNlZCBieSB0aGUgdXNlclxuICBkaXNwbGF5U2hpcHMoZ2FtZWJvYXJkLCBncmlkKSB7XG4gICAgZ2FtZWJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBnYW1lYm9hcmQuZmluZFNxdWFyZShjb29yZGluYXRlKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBnYW1lYm9hcmQuZmluZFNxdWFyZUluZGV4KHNxdWFyZSk7XG4gICAgICAgIGdyaWRbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRGlzcGxheXMgdGhlIHJlc3VsdCBvZiB0aGUgcHJldmlvdXMgbW92ZSB0byBpbmRpY2F0ZSB3aG9zZSB0dXJuIGl0IGlzXG4gIGRpc3BsYXlNb3ZlKHBsYXllciwgc2hpcCwgaGl0KSB7XG4gICAgY29uc3QgbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AubW92ZScpO1xuXG4gICAgLy8gRGlzcGxheXMgdGhlIGluaXRpYWwgbWVzc2FnZVxuICAgIGlmIChwbGF5ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbW92ZS50ZXh0Q29udGVudCA9ICdTdGFuZGluZyBieSBmb3IgZmlyZSBtaXNzaW9uJztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSAmJiBwbGF5ZXIgPT09ICdQbGF5ZXInKSB7XG4gICAgICAgIG1vdmUudGV4dENvbnRlbnQgPSBgRGFtYWdlIFJlcG9ydDogQ29tcHV0ZXIncyAke3NoaXAudHlwZX0gaGFzIGJlZW4gZGVzdHJveWVkIWA7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgbW92ZS50ZXh0Q29udGVudCA9IGBEYW1hZ2UgUmVwb3J0OiBQbGF5ZXIncyAke3NoaXAudHlwZX0gaGFzIGJlZW4gZGVzdHJveWVkIWA7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGl0KSB7XG4gICAgICBtb3ZlLnRleHRDb250ZW50ID0gYCR7cGxheWVyfSBGaXJlIE1pc3Npb24hIFRhcmdldCBoaXQhYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbW92ZS50ZXh0Q29udGVudCA9IGAke3BsYXllcn0gRmlyZSBNaXNzaW9uISBUYXJnZXQgbWlzc2VkIWA7XG4gICAgfVxuICB9XG5cbiAgLy8gRGlzcGxheXMgd2hpY2ggdHVybiBudW1iZXIgaXQgaXNcbiAgZGlzcGxheVR1cm4odHVybk51bWJlcikge1xuICAgIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwLnR1cm4nKTtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gYFR1cm46ICR7dHVybk51bWJlcn1gO1xuICB9XG5cbiAgLy8gQ292ZXJzIHRoZSBwYWdlIGJlZm9yZSB0aGUgcG9wdXAgdG8gYmxvY2sgd2VicGFnZSBpbnRlcmFjdGlvblxuICBjb3ZlclBhZ2UoKSB7XG4gICAgY29uc3QgcGFnZUNvdmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHBhZ2VDb3Zlcik7XG4gICAgcGFnZUNvdmVyLmNsYXNzTGlzdC5hZGQoJ3BhZ2VDb3ZlcicpO1xuICB9XG5cbiAgLy8gRGlzcGxheXMgdGhlIHdpbm5lciBhbmQgYWxsb3dzIGZvciBhIG5ldyBnYW1lXG4gIHdpbm5lclBvcHVwKHdpbm5lcikge1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHBvcHVwKTtcbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xuXG4gICAgY29uc3QgcG9wdXBIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHBvcHVwSGVhZGVyKTtcbiAgICBwb3B1cEhlYWRlci50ZXh0Q29udGVudCA9IGAke3dpbm5lcn0ncyBOYXZ5IGhhcyBzYW5rIHRoZWlyIG9wcG9uZW50J3MgZmxlZXQuIFBsYXkgYWdhaW4/YDtcblxuICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChyZXN0YXJ0QnV0dG9uKTtcbiAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gJ05ldyBHYW1lJztcbiAgICAvLyBSZWxvYWRzIGEgd2VicGFnZSB0byBzdGFydCBhIG5ldyBnYW1lXG4gICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuLi9wbGF5ZXIvcGxheWVyLmpzJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi4vZ2FtZWJvYXJkL2dhbWVib2FyZC5qcyc7XG5cbi8vIENyZWF0ZXMgYSBnYW1lIG9iamVjdCB0byBjb250cm9sIHRoZSBnYW1lXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgLy8gRGlzcGxheXMgdGhlIHdpbm5lciBhbmQgb2ZmZXJzIGEgbmV3IGdhbWUgYXQgdGhlIGVuZCBvZiBhIGdhbWVcbiAgZW5kR2FtZShkb20sIHdpbm5lcikge1xuICAgIGRvbS5jb3ZlclBhZ2UoKTtcbiAgICBkb20ud2lubmVyUG9wdXAod2lubmVyKTtcbiAgfVxuXG4gIC8vIENhbGxlZCB0byBjb250cm9sIHRoZSBleGVjdXRpb24gb2YgdGhlIGdhbWVcbiAgcGxheUdhbWUocGxhY2VCb2FyZCwgZG9tKSB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcignUGxheWVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdDb21wdXRlcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHBsYWNlQm9hcmQ7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXBzKCk7XG5cbiAgICBkb20ubG9hZEJvYXJkcygpO1xuICAgIGxldCB0dXJuID0gMDtcbiAgICBkb20uZGlzcGxheU1vdmUoKTtcbiAgICBkb20uZGlzcGxheVR1cm4odHVybik7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IEFycmF5LmZyb20oXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYjcGxheWVyPmRpdi5ncmlkJylcbiAgICApO1xuICAgIGRvbS5kaXNwbGF5U2hpcHMocGxheWVyQm9hcmQsIHBsYXllckdyaWQpO1xuXG4gICAgY29uc3QgY29tcHV0ZXJHcmlkID0gQXJyYXkuZnJvbShcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdiNjb21wdXRlcj5kaXYuZ3JpZCcpXG4gICAgKTtcbiAgICAvLyBFeGVjdXRlcyB0aGUgdHVybiBmb3IgYm90aCB0aGUgcGxheWVyIGFuZCBjb21wdXRlciBhZnRlciBhIG1vdmUgaGFzIGJlZW4gbWFkZSBieSB0aGUgcGxheWVyXG4gICAgY29tcHV0ZXJHcmlkLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBjb21wdXRlckdyaWQuaW5kZXhPZihldmVudC50YXJnZXQpO1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBjb21wdXRlckJvYXJkLmdldFNxdWFyZUF0SW5kZXgoaW5kZXgpO1xuXG4gICAgICAgIC8vIElmIGEgZ3JpZCBzcXVhcmUgaGFzIG5vdCBiZWVuIHNlbGVjdGVkIHlldCwgdGhlIG1vdmUgaXMgZXhlY3V0ZWRcbiAgICAgICAgaWYgKHNxdWFyZS5zZWxlY3RlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0dXJuICs9IDE7XG4gICAgICAgICAgLy8gQmVnaW4gdGhlIHBsYXllcidzIHR1cm5cbiAgICAgICAgICBjb25zdCBwbGF5ZXJNb3ZlID0gY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKFxuICAgICAgICAgICAgc3F1YXJlLmNvb3JkaW5hdGVzLFxuICAgICAgICAgICAgY29tcHV0ZXJcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcGxheWVyTW92ZS5oaXRcbiAgICAgICAgICAgID8gZ3JpZC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuICAgICAgICAgICAgOiBncmlkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcblxuICAgICAgICAgIGRvbS5kaXNwbGF5TW92ZShwbGF5ZXIudHlwZSwgcGxheWVyTW92ZS5zaGlwLCBwbGF5ZXJNb3ZlLmhpdCk7XG4gICAgICAgICAgZG9tLmRpc3BsYXlUdXJuKHR1cm4pO1xuXG4gICAgICAgICAgLy8gSWYgdGhlIGNvbXB1dGVyIGhhcyBubyBtb3JlIHNoaXBzLCB0aGUgcGxheWVyIGhhcyB3b25cbiAgICAgICAgICBpZiAoY29tcHV0ZXIuc2hpcHMgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZW5kR2FtZShkb20sIHBsYXllci50eXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBIHRpbWVvdXQgZnVuY3Rpb24gZm9yIHRoZSBjb21wdXRlciBpcyB1c2VkIHRvIHNpbXVsYXRlIGEgbW9yZSBhY2N1cmF0ZSBtb3ZlXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBCZWdpbiB0aGUgY29tcHV0ZXIncyB0dXJuXG4gICAgICAgICAgICBjb25zdCBjb21wdXRlck1vdmUgPSBjb21wdXRlci5yYW5kb21Nb3ZlKHBsYXllckJvYXJkLCBwbGF5ZXIpO1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlSW5kZXggPSBwbGF5ZXJCb2FyZC5maW5kU3F1YXJlSW5kZXgoXG4gICAgICAgICAgICAgIGNvbXB1dGVyTW92ZS5zcXVhcmVcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbXB1dGVyTW92ZS5oaXRcbiAgICAgICAgICAgICAgPyBwbGF5ZXJHcmlkW3NxdWFyZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuICAgICAgICAgICAgICA6IHBsYXllckdyaWRbc3F1YXJlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcblxuICAgICAgICAgICAgdHVybiArPSAxO1xuICAgICAgICAgICAgZG9tLmRpc3BsYXlNb3ZlKGNvbXB1dGVyLnR5cGUsIGNvbXB1dGVyTW92ZS5zaGlwLCBjb21wdXRlck1vdmUuaGl0KTtcbiAgICAgICAgICAgIGRvbS5kaXNwbGF5VHVybih0dXJuKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIHBsYXllciBoYXMgbm8gbW9yZSBzaGlwcywgdGhlIGNvbXB1dGVyIGhhcyB3b25cbiAgICAgICAgICAgIGlmIChwbGF5ZXIuc2hpcHMgPT09IDApIHRoaXMuZW5kR2FtZShkb20sIGNvbXB1dGVyLnR5cGUpO1xuICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFNxdWFyZSBmcm9tICcuLi9zcXVhcmUvc3F1YXJlLmpzJztcbmltcG9ydCBTaGlwIGZyb20gJy4uL3NoaXAvc2hpcC5qcyc7XG5pbXBvcnQgRG9tIGZyb20gJy4uL2RvbS9kb20uanMnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi4vZ2FtZS9nYW1lLmpzJztcblxuLy8gQ3JlYXRlcyBhIGdhbWVib2FyZCBvYmplY3QgZm9yIHRoZSBwbGF5ZXIgYW5kIGNvbXB1dGVyIHRvIGhhbmRsZSBhY3Rpb25zIHBlcmZvcm1lZCBvbiBhIGdhbWVib2FyZFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zcXVhcmVzID0gdGhpcy5idWlsZEJvYXJkKCk7XG4gICAgdGhpcy5zaGlwcyA9IHRoaXMuYnVpbGRTaGlwcygpO1xuICB9XG5cbiAgLy8gQnVpbGRzIGEgYm9hcmQgb2Ygc3F1YXJlIG9iamVjdHNcbiAgYnVpbGRCb2FyZCgpIHtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IG5ldyBTcXVhcmUoW2osIGldKTtcblxuICAgICAgICBib2FyZC5wdXNoKHNxdWFyZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG5cbiAgLy8gQnVpbGRzIGFuIGFycmF5IG9mIHNoaXAgb2JqZWN0c1xuICBidWlsZFNoaXBzKCkge1xuICAgIHJldHVybiBbXG4gICAgICBuZXcgU2hpcCg1LCAnY2FycmllcicpLFxuICAgICAgbmV3IFNoaXAoNCwgJ2JhdHRsZXNoaXAnKSxcbiAgICAgIG5ldyBTaGlwKDMsICdkZXN0cm95ZXInKSxcbiAgICAgIG5ldyBTaGlwKDMsICdzdWJtYXJpbmUnKSxcbiAgICAgIG5ldyBTaGlwKDIsICdwYXRyb2xsZXInKSxcbiAgICBdO1xuICB9XG5cbiAgLy8gSGFuZGxlcyBhIHVzZXIgd2hvIGlzIHBsYWNpbmcgdGhlaXIgb3duIHNoaXBzXG4gIHVzZXJQbGFjZVNoaXBzKCkge1xuICAgIGNvbnN0IHNoaXBRdWV1ZSA9IFsuLi50aGlzLnNoaXBzXTtcbiAgICBjb25zdCBkb20gPSBuZXcgRG9tKCk7XG4gICAgbGV0IGRpcmVjdGlvbiA9IDE7XG4gICAgY29uc3QgbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AubW92ZScpO1xuICAgIG1vdmUudGV4dENvbnRlbnQgPSAnUGxhY2UgeW91ciBjYXJyaWVyICg1IHNwYWNlcyknO1xuXG4gICAgY29uc3QgZGlyZWN0aW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3BsYWNlICsgZGl2ID4gYnV0dG9uJyk7XG4gICAgLy8gQ2hhbmdlcyB0aGUgYXhpcyB0aGUgc2hpcCBpcyB0byBiZSBwbGFjZWQgb25cbiAgICBkaXJlY3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IDAgPyAxIDogMDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBsYWNlR3JpZCA9IEFycmF5LmZyb20oXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYjcGxhY2U+ZGl2LmdyaWQnKVxuICAgICk7XG4gICAgLy8gRGlzcGxheXMgd2hpY2ggc2hpcCBpcyB0byBiZSBwbGFjZWQgYXMgdGhlIGN1cnNvclxuICAgIHBsYWNlR3JpZC5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAwKVxuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKGAke3NoaXBRdWV1ZVswXS50eXBlfVJvdGF0ZWRgKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoYCR7c2hpcFF1ZXVlWzBdLnR5cGV9YCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHBsYWNlR3JpZC5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChzaGlwUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDApXG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShgJHtzaGlwUXVldWVbMF0udHlwZX1Sb3RhdGVkYCk7XG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSlcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGAke3NoaXBRdWV1ZVswXS50eXBlfWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEEgcGxheWVyIGhhcyBhdHRlbXB0ZWQgdG8gcGxhY2UgYSBzaGlwXG4gICAgcGxhY2VHcmlkLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwbGFjZUdyaWQuaW5kZXhPZihldmVudC50YXJnZXQpO1xuICAgICAgICBsZXQgc3F1YXJlID0gdGhpcy5nZXRTcXVhcmVBdEluZGV4KGluZGV4KTtcblxuICAgICAgICAvLyBQbGFjZXMgYSBzaGlwIGlmIHRoZXJlIGFyZSBubyBzaGlwcyBwbGFjZWQgYWxvbmcgdGhlIHBhdGhcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF0aGlzLmNoZWNrU3F1YXJlc0FyZU9jY3VwaWVkKFxuICAgICAgICAgICAgc3F1YXJlLmNvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgc3F1YXJlLmNvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgICAgc2hpcFF1ZXVlWzBdLmxlbmd0aFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3Qgc2hpcCA9IHNoaXBRdWV1ZVswXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZXMucHVzaChKU09OLnN0cmluZ2lmeShzcXVhcmUuY29vcmRpbmF0ZXMpKTtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRTaGlwKCk7XG4gICAgICAgICAgICBzcXVhcmUgPVxuICAgICAgICAgICAgICBkaXJlY3Rpb24gPT09IDBcbiAgICAgICAgICAgICAgICA/IHRoaXMuZmluZFNxdWFyZShcbiAgICAgICAgICAgICAgICAgICAgYFske3NxdWFyZS5jb29yZGluYXRlc1swXX0sJHtzcXVhcmUuY29vcmRpbmF0ZXNbMV0gKyAxfV1gXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiB0aGlzLmZpbmRTcXVhcmUoXG4gICAgICAgICAgICAgICAgICAgIGBbJHtzcXVhcmUuY29vcmRpbmF0ZXNbMF0gKyAxfSwke3NxdWFyZS5jb29yZGluYXRlc1sxXX1dYFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZG9tLmRpc3BsYXlTaGlwcyh0aGlzLCBwbGFjZUdyaWQpO1xuICAgICAgICAgIHNoaXBRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgIC8vIERpc3BsYXkgd2hpY2ggc2hpcCBpcyB0byBiZSBwbGFjZWRcbiAgICAgICAgICBpZiAoc2hpcFF1ZXVlLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgIG1vdmUudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3NoaXBRdWV1ZVswXS50eXBlfSAoJHtzaGlwUXVldWVbMF0ubGVuZ3RofSBzcGFjZXMpYDtcblxuICAgICAgICAgIC8vIElmIHRoZSBzaGlwIHF1ZXVlIGlzIGVtcHR5LCBhbGwgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZFxuICAgICAgICAgIGlmIChzaGlwUXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkb20uaGlkZVBsYWNlbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gICAgICAgICAgICBnYW1lLnBsYXlHYW1lKHRoaXMsIGRvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJldHVybnMgbGVnYWwgcmFuZG9tIHNxdWFyZXNcbiAgZmluZExlZ2FsU3F1YXJlcyhzaGlwKSB7XG4gICAgbGV0IHhDb29yZGluYXRlO1xuICAgIGxldCB5Q29vcmRpbmF0ZTtcbiAgICBsZXQgZGlyZWN0aW9uO1xuICAgIGxldCBzcXVhcmVzT2NjdXBpZWQ7XG5cbiAgICAvLyBDb250aW51ZXMgdG8gZ2VuZXJhdGUgc3F1YXJlcyB1bnRpbCBsZWdhbCBvbmVzIGFyZSBmb3VuZFxuICAgIGRvIHtcbiAgICAgIHhDb29yZGluYXRlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSk7XG4gICAgICB5Q29vcmRpbmF0ZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDkpO1xuICAgICAgZGlyZWN0aW9uID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgICAgIHNxdWFyZXNPY2N1cGllZCA9IHRoaXMuY2hlY2tTcXVhcmVzQXJlT2NjdXBpZWQoXG4gICAgICAgIHhDb29yZGluYXRlLFxuICAgICAgICB5Q29vcmRpbmF0ZSxcbiAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICBzaGlwLmxlbmd0aFxuICAgICAgKTtcbiAgICB9IHdoaWxlIChcbiAgICAgIHNxdWFyZXNPY2N1cGllZCB8fFxuICAgICAgKGRpcmVjdGlvbiA9PT0gMCAmJiB5Q29vcmRpbmF0ZSArIHNoaXAubGVuZ3RoID4gOSkgfHxcbiAgICAgIChkaXJlY3Rpb24gPT09IDEgJiYgeENvb3JkaW5hdGUgKyBzaGlwLmxlbmd0aCA+IDkpXG4gICAgKTtcblxuICAgIHJldHVybiB7IHhDb29yZGluYXRlLCB5Q29vcmRpbmF0ZSwgZGlyZWN0aW9uIH07XG4gIH1cblxuICAvLyBGaW5kcyBhIHNxdWFyZSBhdCBhIHNldCBvZiBjb29yZGluYXRlc1xuICBmaW5kU3F1YXJlKHNlYXJjaENvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIHRoaXMuc3F1YXJlcy5maW5kKFxuICAgICAgKGVsZW1lbnQpID0+IEpTT04uc3RyaW5naWZ5KGVsZW1lbnQuY29vcmRpbmF0ZXMpID09PSBzZWFyY2hDb29yZGluYXRlc1xuICAgICk7XG4gIH1cblxuICAvLyBDaGVja3MgaWYgc3F1YXJlcyBzdGFydGluZyBmcm9tIGEgc2V0IG9mIGNvb3JkaW5hdGVzIGFsb25nIGEgcGF0aCBhcmUgb2NjdXBpZWQgYW5kIHJldHVybnMgYSBib29sZWFuIHRvIHJlcHJlc2VudCB0aGlzXG4gIGNoZWNrU3F1YXJlc0FyZU9jY3VwaWVkKHhDb29yZGluYXRlLCB5Q29vcmRpbmF0ZSwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPVxuICAgICAgICBkaXJlY3Rpb24gPT09IDBcbiAgICAgICAgICA/IHRoaXMuZmluZFNxdWFyZShgWyR7eENvb3JkaW5hdGV9LCR7eUNvb3JkaW5hdGUgKyBpfV1gKVxuICAgICAgICAgIDogdGhpcy5maW5kU3F1YXJlKGBbJHt4Q29vcmRpbmF0ZSArIGl9LCR7eUNvb3JkaW5hdGV9XWApO1xuXG4gICAgICBpZiAoc3F1YXJlID09PSB1bmRlZmluZWQgfHwgc3F1YXJlLnNoaXAgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFBsYWNlcyBzaGlwcyBhdCByYW5kb20gZm9yIHRoZSBjb21wdXRlclxuICBwbGFjZVNoaXBzKCkge1xuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgbGV0IGxlZ2FsU3F1YXJlcyA9IHRoaXMuZmluZExlZ2FsU3F1YXJlcyhzaGlwKTtcbiAgICAgIGNvbnN0IHhDb29yZGluYXRlID0gbGVnYWxTcXVhcmVzLnhDb29yZGluYXRlO1xuICAgICAgY29uc3QgeUNvb3JkaW5hdGUgPSBsZWdhbFNxdWFyZXMueUNvb3JkaW5hdGU7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBsZWdhbFNxdWFyZXMuZGlyZWN0aW9uO1xuXG4gICAgICAvLyBTdG9yZXMgdGhlIGNvb3JkaW5hdGVzIGZvciBhIHBsYWNlZCBzaGlwXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID1cbiAgICAgICAgICBkaXJlY3Rpb24gPT09IDBcbiAgICAgICAgICAgID8gdGhpcy5maW5kU3F1YXJlKGBbJHt4Q29vcmRpbmF0ZX0sJHt5Q29vcmRpbmF0ZSArIGl9XWApXG4gICAgICAgICAgICA6IHRoaXMuZmluZFNxdWFyZShgWyR7eENvb3JkaW5hdGUgKyBpfSwke3lDb29yZGluYXRlfV1gKTtcbiAgICAgICAgc2hpcC5jb29yZGluYXRlcy5wdXNoKEpTT04uc3RyaW5naWZ5KHNxdWFyZS5jb29yZGluYXRlcykpO1xuICAgICAgICBzcXVhcmUuYWRkU2hpcCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHNoaXAgYXQgYSBnaXZlbiBzZXQgb2YgY29vcmRpbmF0ZXNcbiAgZmluZFNoaXAoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcy5maW5kKChzaGlwKSA9PiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKGNvb3JkaW5hdGVzKSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3F1YXJlIGF0IGEgZ2l2ZW4gaW5kZXhcbiAgZ2V0U3F1YXJlQXRJbmRleChpbmRleCkge1xuICAgIHJldHVybiB0aGlzLnNxdWFyZXNbaW5kZXhdO1xuICB9XG5cbiAgLy8gUmV0dXJucyB0aGUgaW5kZXggb2YgYSBzcXVhcmVcbiAgZmluZFNxdWFyZUluZGV4KHNxdWFyZSkge1xuICAgIHJldHVybiB0aGlzLnNxdWFyZXMuaW5kZXhPZihzcXVhcmUpO1xuICB9XG5cbiAgLy8gQ2FsbGVkIGFmdGVyIGEgbW92ZSBoYXMgYmVlbiBtYWRlIGJ5IGVpdGhlciB0aGUgcGxheWVyIG9yIHRoZSBjb21wdXRlci4gUmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBtb3ZlXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMsIHBsYXllcikge1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShKU09OLnN0cmluZ2lmeShjb29yZGluYXRlcykpO1xuICAgIGxldCBoaXQ7XG4gICAgbGV0IHNoaXA7XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHNoaXAgd2hlcmUgYSBtb3ZlIGhhcyBiZWVuIG1hZGUsIHRoaXMgaXMgcmVnaXN0ZXJlZCBhcyBhIGhpdFxuICAgIGlmIChzcXVhcmUuc2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgc2hpcCA9IHRoaXMuZmluZFNoaXAoSlNPTi5zdHJpbmdpZnkoY29vcmRpbmF0ZXMpKTtcbiAgICAgIHNoaXAuaXNIaXQoKTtcblxuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgcGxheWVyLnNpbmtTaGlwKCk7XG4gICAgICB9XG5cbiAgICAgIGhpdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgcmVwcmVzZW50cyBhIG1pc3NcbiAgICAgIGhpdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEdpdmUgdGhlIHNxdWFyZSBhIHNlbGVjdGVkIGF0dHJpYnV0ZSB0byBwcmV2ZW50IGR1cGxpY2F0ZSBtb3ZlcyBvbiB0aGUgc2FtZSBzcXVhcmVcbiAgICBzcXVhcmUuc2VsZWN0U3F1YXJlKCk7XG5cbiAgICByZXR1cm4geyBoaXQsIHNoaXAgfTtcbiAgfVxufVxuIiwiLy8gQ3JlYXRlcyBhIHBsYXllciBvYmplY3QgdG8gcmVwcmVzZW50IHRoZSBwbGF5ZXIgYW5kIGNvbXB1dGVyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnNoaXBzID0gNTtcbiAgfVxuXG4gIC8vIFJlbW92ZSBhIHNoaXAgdGhhdCBoYXMgYmVlbiBzdW5rIGZyb20gdGhlIHBsYXllclxuICBzaW5rU2hpcCgpIHtcbiAgICB0aGlzLnNoaXBzIC09IDE7XG4gIH1cblxuICAvLyBNYWtlcyBhIHJhbmRvbSBsZWdhbCBtb3ZlIGZvciB0aGUgY29tcHV0ZXJcbiAgcmFuZG9tTW92ZShnYW1lYm9hcmQsIHBsYXllcikge1xuICAgIGxldCBzcXVhcmU7XG4gICAgbGV0IG1vdmU7XG5cbiAgICAvLyBHZW5lcmF0ZXMgYSBzZXQgb2YgY29vcmRpbmF0ZXMgZm9yIGEgbW92ZSB1bnRpbCBpdCBmaW5kcyBhIHNxdWFyZSB0aGF0IGhhcyBub3QgYmVlbiBzZWxlY3RlZFxuICAgIGRvIHtcbiAgICAgIG1vdmUgPSBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSksIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDkpXTtcbiAgICAgIHNxdWFyZSA9IGdhbWVib2FyZC5maW5kU3F1YXJlKEpTT04uc3RyaW5naWZ5KG1vdmUpKTtcbiAgICB9IHdoaWxlIChzcXVhcmUuc2VsZWN0ZWQgPT09IHRydWUpO1xuXG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobW92ZSwgcGxheWVyKTtcbiAgICBjb25zdCBoaXQgPSBjb21wdXRlck1vdmUuaGl0O1xuICAgIGNvbnN0IHNoaXAgPSBjb21wdXRlck1vdmUuc2hpcDtcblxuICAgIHJldHVybiB7IGhpdCwgc2hpcCwgc3F1YXJlIH07XG4gIH1cbn1cbiIsIi8vIENyZWF0ZXMgYSBzaGlwIG9iamVjdCB0byBoYW5kbGUgc2hpcHMgZm9yIHRoZSBwbGF5ZXIgYW5kIGNvbXB1dGVyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCB0eXBlLCBoaXRzID0gMCwgc3VuayA9IGZhbHNlLCBjb29yZGluYXRlcyA9IFtdKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmhpdHMgPSBoaXRzO1xuICAgIHRoaXMuc3VuayA9IHN1bms7XG4gICAgdGhpcy5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgLy8gQ2FsbGVkIGFmdGVyIGEgbW92ZSBoYXMgcmVzdWx0ZWQgaW4gYSBoaXRcbiAgaXNIaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICAvLyBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGEgc2hpcCBoYXMgYmVlbiBzdW5rXG4gIGlzU3VuaygpIHtcbiAgICB0aGlzLnN1bmsgPSB0aGlzLmxlbmd0aCA9PT0gdGhpcy5oaXRzID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHJldHVybiB0aGlzLnN1bms7XG4gIH1cbn1cbiIsIi8vIENyZWF0ZXMgYSBzcXVhcmUgb2JqZWN0IHRvIHJlcHJlc2VudCBhIGdyaWQgc3F1YXJlIG9uIGEgZ2FtZWJvYXJkIGZvciBib3RoIHRoZSB1c2VyIGFuZCBjb21wdXRlclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3F1YXJlIHtcbiAgY29uc3RydWN0b3IoY29vcmRpbmF0ZXMsIHNlbGVjdGVkID0gZmFsc2UsIHNoaXAgPSBmYWxzZSkge1xuICAgIHRoaXMuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcbiAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5zaGlwID0gc2hpcDtcbiAgfVxuXG4gIC8vIEEgc3F1YXJlIGhhcyBiZWVuIHNlbGVjdGVkIGFuZCBzaG91bGQgbm90IGJlIGFnYWluXG4gIHNlbGVjdFNxdWFyZSgpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIEEgc2hpcCBub3cgb2NjdXBpZXMgYXQgdGhlIHNxdWFyZVxuICBhZGRTaGlwKCkge1xuICAgIHRoaXMuc2hpcCA9IHRydWU7XG4gIH1cbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL2JsYWNrb3Bzb25lLXJlZ3VsYXItd2ViZm9udC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vZm9udHMvYmxhY2tvcHNvbmUtcmVndWxhci13ZWJmb250LndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL3NvdXJjZWNvZGVwcm8tdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vZm9udHMvc291cmNlY29kZXByby12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9iYWNrZ3JvdW5kLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL2NhcnJpZXIucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvY2Fycmllci5yb3RhdGVkLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL2JhdHRsZXNoaXAucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvYmF0dGxlc2hpcC5yb3RhdGVkLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL2Rlc3Ryb3llci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTBfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvZGVzdHJveWVyLnJvdGF0ZWQucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzExX19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL3N1Ym1hcmluZS5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTJfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvc3VibWFyaW5lLnJvdGF0ZWQucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEzX19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL3BhdHJvbGxlci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTRfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvcGF0cm9sbGVyLnJvdGF0ZWQucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEwX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzExX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEyX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEzX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE0X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ2JsYWNrT3BzJztcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnc291cmNlQ29kZSc7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIilcXG4gICAgICBmb3JtYXQoJ3dvZmYyJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmb250LWZhbWlseTogJ3NvdXJjZUNvZGUnLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciBmaXhlZDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbmRpdi5oZWFkZXIge1xcbiAgZm9udC1mYW1pbHk6ICdibGFja09wcycsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDJyZW07XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAxcHg7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGNvbG9yOiByZ2IoMjAzLCAyMDAsIDIwMCk7XFxufVxcblxcbmRpdi5jb250ZW50IHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbmRpdi5pbmZvIHtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gMztcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6IHJnYig1LCAyMjQsIDUpO1xcbiAgd2lkdGg6IDc1JTtcXG4gIGJvcmRlcjogNXB4IHNvbGlkIHJnYig1LCAyMjQsIDUpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ubGFiZWwge1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG4gIHdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuLndyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5kaXYuZ2FtZWJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWdhcDogMXB4O1xcbiAgb3V0bGluZTogNXB4IHNvbGlkIGdyYXk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoNjgsIDY4LCAyNTUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDY4LCA2OCwgMjU1KTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgaGVpZ2h0OiA1MDBweDtcXG59XFxuXFxuZGl2I3BsYWNlID4gZGl2LmdyaWQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDY4LCA2OCwgMjU1KTtcXG59XFxuXFxuZGl2I3BsYWNlID4gZGl2LmNhcnJpZXIge1xcbiAgY3Vyc29yOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fICsgXCIpLCBhdXRvO1xcbn1cXG5cXG5kaXYjcGxhY2UgPiBkaXYuY2FycmllclJvdGF0ZWQge1xcbiAgY3Vyc29yOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fICsgXCIpLCBhdXRvO1xcbn1cXG5cXG5kaXYjcGxhY2UgPiBkaXYuYmF0dGxlc2hpcCB7XFxuICBjdXJzb3I6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gKyBcIiksIGF1dG87XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5iYXR0bGVzaGlwUm90YXRlZCB7XFxuICBjdXJzb3I6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzhfX18gKyBcIiksIGF1dG87XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5kZXN0cm95ZXIge1xcbiAgY3Vyc29yOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF85X19fICsgXCIpLCBhdXRvO1xcbn1cXG5cXG5kaXYjcGxhY2UgPiBkaXYuZGVzdHJveWVyUm90YXRlZCB7XFxuICBjdXJzb3I6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEwX19fICsgXCIpLCBhdXRvO1xcbn1cXG5cXG5kaXYjcGxhY2UgPiBkaXYuc3VibWFyaW5lIHtcXG4gIGN1cnNvcjogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTFfX18gKyBcIiksIGF1dG87XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5zdWJtYXJpbmVSb3RhdGVkIHtcXG4gIGN1cnNvcjogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTJfX18gKyBcIiksIGF1dG87XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5wYXRyb2xsZXIge1xcbiAgY3Vyc29yOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xM19fXyArIFwiKSwgYXV0bztcXG59XFxuXFxuZGl2I3BsYWNlID4gZGl2LnBhdHJvbGxlclJvdGF0ZWQge1xcbiAgY3Vyc29yOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNF9fXyArIFwiKSwgYXV0bztcXG59XFxuXFxuZGl2I3BsYWNlICsgZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5kaXYjcGxhY2UgKyBkaXYgPiBidXR0b24ge1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIHdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuZGl2I3BsYXllciB7XFxuICBncmlkLWFyZWE6IDIgLyAxIC8gMyAvIDI7XFxufVxcblxcbmRpdi5ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxLCAxLCA1Myk7XFxufVxcblxcbmRpdiNjb21wdXRlciA+IGRpdi5ncmlkOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2OCwgNjgsIDI1NSk7XFxufVxcblxcbmRpdi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcblxcbmRpdi5nYW1lYm9hcmQgPiBkaXYuaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZCAhaW1wb3J0YW50O1xcbn1cXG5cXG5kaXYuZ2FtZWJvYXJkID4gZGl2Lm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5wYWdlQ292ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLnBvcHVwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgei1pbmRleDogMTAwO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIHdpZHRoOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gIGNvbG9yOiByZ2IoNSwgMjI0LCA1KTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgaGVpZ2h0OiAyMDBweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXI6IDVweCBzb2xpZCByZ2IoNSwgMjI0LCA1KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1LCAyMjQsIDUpO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1mYW1pbHk6ICdzb3VyY2VDb2RlJywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbn1cXG5cXG5kaXYucG9wdXAgPiBidXR0b24ge1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG4gIHdpZHRoOiAyNSU7XFxuICBoZWlnaHQ6IDI1JTtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAxNzksIDApO1xcbn1cXG5cXG5kaXYuZm9vdGVyIHtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiByZ2IoNSwgMjI0LCA1KTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHVCQUF1QjtFQUN2QjswREFDZ0U7RUFDaEUsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qjs7MERBRTRFO0VBQzVFLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixxQ0FBcUM7RUFDckMsaUZBQXdFO0VBQ3hFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxlQUFlO0VBQ2YsOEJBQThCO0VBQzlCLGdDQUFnQztFQUNoQyxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLHFCQUFxQjtFQUNyQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIscUJBQXFCO0VBQ3JCLFVBQVU7RUFDVixnQ0FBZ0M7RUFDaEMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsc0NBQXNDO0VBQ3RDLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxxREFBeUM7QUFDM0M7O0FBRUE7RUFDRSxxREFBaUQ7QUFDbkQ7O0FBRUE7RUFDRSxxREFBNEM7QUFDOUM7O0FBRUE7RUFDRSxxREFBb0Q7QUFDdEQ7O0FBRUE7RUFDRSxxREFBMkM7QUFDN0M7O0FBRUE7RUFDRSxzREFBbUQ7QUFDckQ7O0FBRUE7RUFDRSxzREFBMkM7QUFDN0M7O0FBRUE7RUFDRSxzREFBbUQ7QUFDckQ7O0FBRUE7RUFDRSxzREFBMkM7QUFDN0M7O0FBRUE7RUFDRSxzREFBbUQ7QUFDckQ7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsV0FBVztFQUNYLHFDQUFxQztFQUNyQyxZQUFZO0VBQ1osYUFBYTtFQUNiLE1BQU07RUFDTixPQUFPO0FBQ1Q7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixRQUFRO0VBQ1IsU0FBUztFQUNULGdDQUFnQztFQUNoQyxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLGFBQWE7RUFDYixnQ0FBZ0M7RUFDaEMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0NBQWdDO0VBQ2hDLFNBQVM7RUFDVCxxQ0FBcUM7RUFDckMsaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLHFCQUFxQjtBQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnYmxhY2tPcHMnO1xcbiAgc3JjOiB1cmwoJy4vZm9udHMvYmxhY2tvcHNvbmUtcmVndWxhci13ZWJmb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4vZm9udHMvYmxhY2tvcHNvbmUtcmVndWxhci13ZWJmb250LndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdzb3VyY2VDb2RlJztcXG4gIHNyYzogdXJsKCcuL2ZvbnRzL3NvdXJjZWNvZGVwcm8tdmFyaWFibGVmb250X3dnaHQtd2ViZm9udC53b2ZmMicpXFxuICAgICAgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJy4vZm9udHMvc291cmNlY29kZXByby12YXJpYWJsZWZvbnRfd2dodC13ZWJmb250LndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxufVxcblxcbioge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZvbnQtZmFtaWx5OiAnc291cmNlQ29kZScsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kOiB1cmwoJy4vaW1hZ2VzL2JhY2tncm91bmQuanBnJykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgZml4ZWQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG5cXG5kaXYuaGVhZGVyIHtcXG4gIGZvbnQtZmFtaWx5OiAnYmxhY2tPcHMnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMXB4O1xcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogYmxhY2s7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBjb2xvcjogcmdiKDIwMywgMjAwLCAyMDApO1xcbn1cXG5cXG5kaXYuY29udGVudCB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG5kaXYuaW5mbyB7XFxuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDM7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiByZ2IoNSwgMjI0LCA1KTtcXG4gIHdpZHRoOiA3NSU7XFxuICBib3JkZXI6IDVweCBzb2xpZCByZ2IoNSwgMjI0LCA1KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmxhYmVsIHtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxuICB3aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcblxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZGl2LmdhbWVib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1nYXA6IDFweDtcXG4gIG91dGxpbmU6IDVweCBzb2xpZCBncmF5O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDY4LCA2OCwgMjU1KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2OCwgNjgsIDI1NSk7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIHdpZHRoOiA1MDBweDtcXG4gIGhlaWdodDogNTAwcHg7XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5ncmlkOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2OCwgNjgsIDI1NSk7XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5jYXJyaWVyIHtcXG4gIGN1cnNvcjogdXJsKCcuL2ltYWdlcy9jYXJyaWVyLnBuZycpLCBhdXRvO1xcbn1cXG5cXG5kaXYjcGxhY2UgPiBkaXYuY2FycmllclJvdGF0ZWQge1xcbiAgY3Vyc29yOiB1cmwoJy4vaW1hZ2VzL2NhcnJpZXIucm90YXRlZC5wbmcnKSwgYXV0bztcXG59XFxuXFxuZGl2I3BsYWNlID4gZGl2LmJhdHRsZXNoaXAge1xcbiAgY3Vyc29yOiB1cmwoJy4vaW1hZ2VzL2JhdHRsZXNoaXAucG5nJyksIGF1dG87XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5iYXR0bGVzaGlwUm90YXRlZCB7XFxuICBjdXJzb3I6IHVybCgnLi9pbWFnZXMvYmF0dGxlc2hpcC5yb3RhdGVkLnBuZycpLCBhdXRvO1xcbn1cXG5cXG5kaXYjcGxhY2UgPiBkaXYuZGVzdHJveWVyIHtcXG4gIGN1cnNvcjogdXJsKCcuL2ltYWdlcy9kZXN0cm95ZXIucG5nJyksIGF1dG87XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5kZXN0cm95ZXJSb3RhdGVkIHtcXG4gIGN1cnNvcjogdXJsKCcuL2ltYWdlcy9kZXN0cm95ZXIucm90YXRlZC5wbmcnKSwgYXV0bztcXG59XFxuXFxuZGl2I3BsYWNlID4gZGl2LnN1Ym1hcmluZSB7XFxuICBjdXJzb3I6IHVybCgnLi9pbWFnZXMvc3VibWFyaW5lLnBuZycpLCBhdXRvO1xcbn1cXG5cXG5kaXYjcGxhY2UgPiBkaXYuc3VibWFyaW5lUm90YXRlZCB7XFxuICBjdXJzb3I6IHVybCgnLi9pbWFnZXMvc3VibWFyaW5lLnJvdGF0ZWQucG5nJyksIGF1dG87XFxufVxcblxcbmRpdiNwbGFjZSA+IGRpdi5wYXRyb2xsZXIge1xcbiAgY3Vyc29yOiB1cmwoJy4vaW1hZ2VzL3BhdHJvbGxlci5wbmcnKSwgYXV0bztcXG59XFxuXFxuZGl2I3BsYWNlID4gZGl2LnBhdHJvbGxlclJvdGF0ZWQge1xcbiAgY3Vyc29yOiB1cmwoJy4vaW1hZ2VzL3BhdHJvbGxlci5yb3RhdGVkLnBuZycpLCBhdXRvO1xcbn1cXG5cXG5kaXYjcGxhY2UgKyBkaXYge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmRpdiNwbGFjZSArIGRpdiA+IGJ1dHRvbiB7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgd2lkdGg6IG1heC1jb250ZW50O1xcbn1cXG5cXG5kaXYjcGxheWVyIHtcXG4gIGdyaWQtYXJlYTogMiAvIDEgLyAzIC8gMjtcXG59XFxuXFxuZGl2LmdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEsIDEsIDUzKTtcXG59XFxuXFxuZGl2I2NvbXB1dGVyID4gZGl2LmdyaWQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDY4LCA2OCwgMjU1KTtcXG59XFxuXFxuZGl2LnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG59XFxuXFxuZGl2LmdhbWVib2FyZCA+IGRpdi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkICFpbXBvcnRhbnQ7XFxufVxcblxcbmRpdi5nYW1lYm9hcmQgPiBkaXYubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnBhZ2VDb3ZlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDEwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4ucG9wdXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB6LWluZGV4OiAxMDA7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgd2lkdGg6IDUwJTtcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgY29sb3I6IHJnYig1LCAyMjQsIDUpO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlcjogNXB4IHNvbGlkIHJnYig1LCAyMjQsIDUpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUsIDIyNCwgNSk7XFxuICBib3JkZXI6IDA7XFxuICBmb250LWZhbWlseTogJ3NvdXJjZUNvZGUnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcblxcbmRpdi5wb3B1cCA+IGJ1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgd2lkdGg6IDI1JTtcXG4gIGhlaWdodDogMjUlO1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDE3OSwgMCk7XFxufVxcblxcbmRpdi5mb290ZXIge1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IHJnYig1LCAyMjQsIDUpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMWNhODMxNTJkM2FjYzk5MmZiZDRhZjIyYjFlZTQ1MzgubXAzXCI7IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBEb20gZnJvbSAnLi9kb20vZG9tLmpzJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQvZ2FtZWJvYXJkLmpzJztcbmltcG9ydCBtcDMgZnJvbSAnLi9hdGxhbnRpc1JhZ2UubXAzJztcblxuLy8gQnVpbGRzIGFuZCBhdXRvcGxheXMgbXVzaWMgd2hlbiB0aGUgcGFnZSBpcyBsb2FkZWRcbmNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcbmF1ZGlvLnNyYyA9IG1wMztcbmF1ZGlvLmF1dG9wbGF5ID0gdHJ1ZTtcbmF1ZGlvLmxvb3AgPSB0cnVlO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGF1ZGlvKTtcblxuLy8gQmVnaW4gdGhlIGdhbWVcbmNvbnN0IGRvbSA9IG5ldyBEb20oKTtcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuXG5kb20uZGlzcGxheVBsYWNlQm9hcmQoKTtcblxucGxheWVyQm9hcmQudXNlclBsYWNlU2hpcHMoZG9tKTtcbiJdLCJuYW1lcyI6WyJEb20iLCJjcmVhdGVHcmlkcyIsImJvYXJkIiwiaSIsImdyaWRTcXVhcmUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImRpc3BsYXlQbGFjZUJvYXJkIiwiZ2FtZWJvYXJkIiwiaWQiLCJxdWVyeVNlbGVjdG9yIiwiYnV0dG9uRGl2IiwiZGlyZWN0aW9uQnV0dG9uIiwidGV4dENvbnRlbnQiLCJoaWRlUGxhY2VtZW50IiwicGxhY2VCb2FyZCIsInN0eWxlIiwiZGlzcGxheSIsImxvYWRCb2FyZHMiLCJwbGF5ZXJXcmFwcGVyIiwicGxheWVyQm9hcmQiLCJwbGF5ZXJMYWJlbCIsImFwcGVuZCIsImNvbXB1dGVyV3JhcHBlciIsImNvbXB1dGVyQm9hcmQiLCJjb21wdXRlckxhYmVsIiwiY29udGVudCIsImRpc3BsYXlTaGlwcyIsImdyaWQiLCJzaGlwcyIsImZvckVhY2giLCJzaGlwIiwiY29vcmRpbmF0ZXMiLCJjb29yZGluYXRlIiwic3F1YXJlIiwiZmluZFNxdWFyZSIsImluZGV4IiwiZmluZFNxdWFyZUluZGV4IiwiZGlzcGxheU1vdmUiLCJwbGF5ZXIiLCJoaXQiLCJtb3ZlIiwidW5kZWZpbmVkIiwiaXNTdW5rIiwidHlwZSIsImRpc3BsYXlUdXJuIiwidHVybk51bWJlciIsInR1cm4iLCJjb3ZlclBhZ2UiLCJwYWdlQ292ZXIiLCJ3aW5uZXJQb3B1cCIsIndpbm5lciIsInBvcHVwIiwicG9wdXBIZWFkZXIiLCJyZXN0YXJ0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiUGxheWVyIiwiR2FtZWJvYXJkIiwiR2FtZSIsImVuZEdhbWUiLCJkb20iLCJwbGF5R2FtZSIsImNvbXB1dGVyIiwicGxhY2VTaGlwcyIsInBsYXllckdyaWQiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29tcHV0ZXJHcmlkIiwiZXZlbnQiLCJpbmRleE9mIiwidGFyZ2V0IiwiZ2V0U3F1YXJlQXRJbmRleCIsInNlbGVjdGVkIiwicGxheWVyTW92ZSIsInJlY2VpdmVBdHRhY2siLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJNb3ZlIiwicmFuZG9tTW92ZSIsInNxdWFyZUluZGV4IiwiU3F1YXJlIiwiU2hpcCIsImNvbnN0cnVjdG9yIiwic3F1YXJlcyIsImJ1aWxkQm9hcmQiLCJidWlsZFNoaXBzIiwiaiIsInB1c2giLCJ1c2VyUGxhY2VTaGlwcyIsInNoaXBRdWV1ZSIsImRpcmVjdGlvbiIsInBsYWNlR3JpZCIsImxlbmd0aCIsInJlbW92ZSIsImNoZWNrU3F1YXJlc0FyZU9jY3VwaWVkIiwiSlNPTiIsInN0cmluZ2lmeSIsImFkZFNoaXAiLCJzaGlmdCIsImdhbWUiLCJmaW5kTGVnYWxTcXVhcmVzIiwieENvb3JkaW5hdGUiLCJ5Q29vcmRpbmF0ZSIsInNxdWFyZXNPY2N1cGllZCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInNlYXJjaENvb3JkaW5hdGVzIiwiZmluZCIsImVsZW1lbnQiLCJsZWdhbFNxdWFyZXMiLCJmaW5kU2hpcCIsImluY2x1ZGVzIiwiaXNIaXQiLCJzaW5rU2hpcCIsInNlbGVjdFNxdWFyZSIsImhpdHMiLCJzdW5rIiwibXAzIiwiYXVkaW8iLCJzcmMiLCJhdXRvcGxheSIsImxvb3AiXSwic291cmNlUm9vdCI6IiJ9