import Player from '../player/player.js';
import Gameboard from '../gameboard/gameboard.js';

// Creates a game object to control the game
export default class Game {
  // Displays the winner and offers a new game at the end of a game
  endGame(dom, winner) {
    dom.coverPage();
    dom.winnerPopup(winner);
  }

  // Called to control the execution of the game
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
    const playerGrid = Array.from(
      document.querySelectorAll('div#player>div.grid')
    );
    dom.displayShips(playerBoard, playerGrid);

    const computerGrid = Array.from(
      document.querySelectorAll('div#computer>div.grid')
    );
    // Executes the turn for both the player and computer after a move has been made by the player
    computerGrid.forEach((grid) => {
      grid.addEventListener('click', (event) => {
        const index = computerGrid.indexOf(event.target);
        const square = computerBoard.getSquareAtIndex(index);

        // If a grid square has not been selected yet, the move is executed
        if (square.selected === false) {
          turn += 1;
          // Begin the player's turn
          const playerMove = computerBoard.receiveAttack(
            square.coordinates,
            computer
          );

          playerMove.hit
            ? grid.classList.add('hit')
            : grid.classList.add('miss');

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
            const squareIndex = playerBoard.findSquareIndex(
              computerMove.square
            );

            computerMove.hit
              ? playerGrid[squareIndex].classList.add('hit')
              : playerGrid[squareIndex].classList.add('miss');

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
