export default class Player {
    constructor(type) {
        this.type = type;
        this.ships = 5;
    }

    sinkShip() {
        this.ships -= 1;
    }

    randomMove(gameboard, player) {
        let square;
        let move;

        do {
            move = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
            square = gameboard.findSquare(JSON.stringify(move));
        } while(square.selected === true)
        
        const computerMove = gameboard.receiveAttack(move, player);
        const hit = computerMove.hit;
        const ship = computerMove.ship;

        return { hit, ship, square };
    }
}