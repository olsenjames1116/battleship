export default class Dom {
    createGrids(board) {
        for(let i = 0; i<100; i++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid');
            board.appendChild(gridSquare);
        }
    }

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
        directionButton.textContent = 'Change orientation';
    }

    hidePlacement() {
        const placeBoard = document.querySelector('div#place');
        placeBoard.style.display = 'none';

        const buttonDiv = document.querySelector('div#place + div');
        buttonDiv.style.display = 'none';
    }

    loadBoards() {
        const playerWrapper = document.createElement('div');
        playerWrapper.classList.add('wrapper');
        const playerBoard = document.createElement('div');
        playerBoard.classList.add('gameboard');
        playerBoard.id = 'player';
        const playerLabel = document.createElement('h2');
        playerLabel.classList.add('label');
        playerLabel.textContent = 'Player\'s Board';
        playerWrapper.append(playerLabel, playerBoard);

        const computerWrapper = document.createElement('div');
        computerWrapper.classList.add('wrapper');
        const computerBoard = document.createElement('div');
        computerBoard.classList.add('gameboard');
        computerBoard.id = 'computer';
        const computerLabel = document.createElement('h2');
        computerLabel.classList.add('label');
        computerLabel.textContent = 'Computer\'s Board';
        computerWrapper.append(computerLabel, computerBoard);

        const content = document.querySelector('div.content');
        content.append(playerWrapper, computerWrapper);

        this.createGrids(playerBoard);
        this.createGrids(computerBoard);
    }

    displayShips(gameboard, grid) {
        gameboard.ships.forEach((ship) => {
            ship.coordinates.forEach((coordinate) => {
                const square = gameboard.findSquare(coordinate);
                const index = gameboard.findSquareIndex(square);
                grid[index].classList.add('ship');
            });
        });
    }

    displayMove(player, ship, hit) {
        const move = document.querySelector('p.move');

        if(player === undefined) {
            move.textContent = 'Standing by for fire mission';
            return;
        }

        if(ship !== undefined) { 
            if(ship.isSunk() && player === 'Player') {
                move.textContent = `Damage Report: Computer's ${ship.type} has been destroyed!`;
                return;
            }

            if(ship.isSunk()) {
                move.textContent = `Damage Report: Player's ${ship.type} has been destroyed!`;
                return;
            }
        }

        if(hit) {
            move.textContent = `${player} Fire Mission! Target hit!`;
        } else {
            move.textContent = `${player} Fire Mission! Target missed!`;
        }
    }

    displayTurn(turnNumber) {
        const turn = document.querySelector('p.turn');
        turn.textContent = `Turn: ${turnNumber}`;
    }

    coverPage() {
        const pageCover = document.createElement('div');
        document.querySelector('body').appendChild(pageCover);
        pageCover.classList.add('pageCover');
    }

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
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }
}