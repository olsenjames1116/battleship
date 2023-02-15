export default class Dom {
    loadBoards() {
        const playerBoard = document.createElement('div');
        playerBoard.classList.add('gameboard');
        const computerBoard = document.createElement('div');
        computerBoard.classList.add('gameboard');
        
        const content = document.querySelector('div.content');
        content.append(playerBoard, computerBoard);

        for(let i = 0; i<100; i++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid');
            playerBoard.appendChild(gridSquare);
        }

        for(let i = 0; i < 100; i++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid');
            computerBoard.appendChild(gridSquare);
        }
    }
}