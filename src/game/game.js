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

        const computerGrid = Array.from(document.querySelectorAll('div#computer>div.grid'));
        computerGrid.forEach((grid) => {
            grid.addEventListener('click', (event) => {
                const index = computerGrid.indexOf(event.target);
                const square = computerBoard.getSquareAtIndex(index);

                if(square.selected === false) {
                    const hit = computerBoard.receiveAttack(square.coordinates, computer.type);

                    hit ? grid.classList.add('hit') : grid.classList.add('miss');
                }
            });
        });

        this.endGame();
    }
}