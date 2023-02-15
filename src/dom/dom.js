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
}