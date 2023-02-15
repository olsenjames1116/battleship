import './style.css';
import Game from './game/game.js';

const game = new Game();
game.playGame();

const computerGrid = Array.from(document.querySelectorAll('div#computer>div.grid'));
computerGrid.forEach((grid) => {
    grid.addEventListener('click', (event) => {
        console.log(computerGrid.indexOf(event.target));
    });
});