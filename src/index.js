import './style.css';
import Dom from './dom/dom.js';
import Gameboard from './gameboard/gameboard.js';
import mp3 from './atlantisRage.mp3';

const audio = document.createElement('audio');
audio.src = mp3;
audio.autoplay = true;
audio.loop = true;
document.querySelector('body').appendChild(audio);

const dom = new Dom();
const playerBoard = new Gameboard();

dom.displayPlaceBoard();

playerBoard.userPlaceShips(dom);
