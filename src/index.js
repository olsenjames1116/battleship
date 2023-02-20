import './style.css';
import Dom from './dom/dom.js';
import Gameboard from './gameboard/gameboard.js';

const dom = new Dom();
const playerBoard = new Gameboard();

dom.displayPlaceBoard();

playerBoard.userPlaceShips(dom);
