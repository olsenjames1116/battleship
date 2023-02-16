import Player from '../player/player.js';
import Gameboard from '../gameboard/gameboard.js';
import Dom from '../dom/dom.js';

export default class Game {
    endGame() {
        // Display winner and lock screen until reload for new game
    }

    playGame() {
        const player = new Player('Player');
        const computer = new Player('Computer');
        const playerBoard = new Gameboard();
        const computerBoard = new Gameboard();

        playerBoard.placeShips();
        computerBoard.placeShips();

        const dom = new Dom();
        dom.loadBoards();
        let turn = 0;
        dom.displayMove(turn);
        const playerGrid = Array.from(document.querySelectorAll('div#player>div.grid'));
        dom.displayShips(playerBoard, playerGrid);

        const computerGrid = Array.from(document.querySelectorAll('div#computer>div.grid'));
        computerGrid.forEach((grid) => {
            grid.addEventListener('click', (event) => {
                const index = computerGrid.indexOf(event.target);
                const square = computerBoard.getSquareAtIndex(index);

                if(square.selected === false) {
                    turn += 1;
                    let hit = computerBoard.receiveAttack(square.coordinates, computer);

                    hit ? grid.classList.add('hit') : grid.classList.add('miss');

                    dom.displayMove(turn, player.type, hit);

                    setTimeout(() => {
                        const computerMove = computer.randomMove(playerBoard, player);
                        const squareIndex = playerBoard.findSquareIndex(computerMove.square);
                        
                        computerMove.hit ? playerGrid[squareIndex].classList.add('hit') : playerGrid[squareIndex].classList.add('miss');
    
                        turn += 1;
                        dom.displayMove(turn, computer.type, computerMove.hit);
                    }, 2000);
                }
            });
        });

        this.endGame();
    }
}