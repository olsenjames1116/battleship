export default class Dom {
    createGrids(board) {
        for(let i = 0; i<100; i++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid');
            board.appendChild(gridSquare);
        }
    }

    loadBoards() {
        const playerBoard = document.createElement('div');
        playerBoard.classList.add('gameboard');
        playerBoard.id = 'player';
        const computerBoard = document.createElement('div');
        computerBoard.classList.add('gameboard');
        computerBoard.id = 'computer';
        
        const content = document.querySelector('div.content');
        content.append(playerBoard, computerBoard);

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
}