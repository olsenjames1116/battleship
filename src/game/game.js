import Player from '../player/player.js';
import Gameboard from '../gameboard/gameboard.js';
import Dom from '../dom/dom.js';

export default class Game {
    endGame(dom, winner) {
        dom.coverPage();
        dom.winnerPopup(winner);
    }

    playGame(placeBoard, dom) {
        const player = new Player('Player');
        const computer = new Player('Computer');
        const computerBoard = new Gameboard();

        const playerBoard = placeBoard;
        computerBoard.placeShips();

        dom.loadBoards();
        let turn = 0;
        dom.displayMove();
        dom.displayTurn(turn);
        const playerGrid = Array.from(document.querySelectorAll('div#player>div.grid'));
        dom.displayShips(playerBoard, playerGrid);

        const computerGrid = Array.from(document.querySelectorAll('div#computer>div.grid'));
        // dom.displayShips(computerBoard, computerGrid);
        computerGrid.forEach((grid) => {
            grid.addEventListener('click', (event) => {
                const index = computerGrid.indexOf(event.target);
                const square = computerBoard.getSquareAtIndex(index);

                if(square.selected === false) {
                    turn += 1;
                    const playerMove = computerBoard.receiveAttack(square.coordinates, computer);

                    playerMove.hit ? grid.classList.add('hit') : grid.classList.add('miss');

                    dom.displayMove(player.type, playerMove.ship, playerMove.hit);
                    dom.displayTurn(turn);

                    if(computer.ships === 0) {
                        this.endGame(dom, player.type);
                        return;
                    }

                    setTimeout(() => {
                        const computerMove = computer.randomMove(playerBoard, player);
                        const squareIndex = playerBoard.findSquareIndex(computerMove.square);
                        
                        computerMove.hit ? playerGrid[squareIndex].classList.add('hit') : playerGrid[squareIndex].classList.add('miss');
    
                        turn += 1;
                        dom.displayMove(computer.type, computerMove.ship, computerMove.hit);
                        dom.displayTurn(turn);

                        if(player.ships === 0) this.endGame(dom, computer.type);
                    }, 3000);
                }
            });
        });
    }
}