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

        const playerGrid = Array.from(document.querySelectorAll('div#player>div.grid'));
        const computerGrid = Array.from(document.querySelectorAll('div#computer>div.grid'));
        computerGrid.forEach((grid) => {
            grid.addEventListener('click', (event) => {
                const index = computerGrid.indexOf(event.target);
                const square = computerBoard.getSquareAtIndex(index);

                if(square.selected === false) {
                    let hit = computerBoard.receiveAttack(square.coordinates, computer);

                    hit ? grid.classList.add('hit') : grid.classList.add('miss');

                    const computerMove = computer.randomMove(playerBoard, player);
                    const squareIndex = playerBoard.findSquareIndex(computerMove.square);
                    
                    computerMove.hit ? playerGrid[squareIndex].classList.add('hit') : playerGrid[squareIndex].classList.add('miss');
                }
            });
        });

        this.endGame();
    }
}