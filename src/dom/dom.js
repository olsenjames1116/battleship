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
            console.log(ship.coordinates);
            ship.coordinates.forEach((coordinate) => {
                const square = gameboard.findSquare(coordinate);
                const index = gameboard.findSquareIndex(square);
                grid[index].classList.add('ship');
            });
        });
    }
}