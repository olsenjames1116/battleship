import Player from '../player/player.js';
import Gameboard from '../gameboard/gameboard.js';
import Dom from '../dom/dom.js';

export default class Game {
    endGame() {
        // Display winner and lock screen until reload for new game
    }

    playGame() {
        const player = new Player('player');
        const computer = new Player('computer');
        const playerBoard = new Gameboard();
        const computerBoard = new Gameboard();

        playerBoard.placeShips();
        computerBoard.placeShips();

        const dom = new Dom();
        dom.loadBoards();
        
        this.endGame();
    }
}