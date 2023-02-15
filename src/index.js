import './style.css';
import Game from './game/game.js';

const game = new Game();
game.playGame();

const computerGrid = document.querySelectorAll('div#computer>div.grid');
computerGrid.forEach((grid) => {
    grid.addEventListener('click', () => {
        console.log('grid click');
    });
});