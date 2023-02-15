export default class Player {
    constructor(type) {
        this.type = type;
        this.ships = 5;
    }

    sinkShip() {
        this.ships -= 1;
    }

    randomMove(gameboard) {
        let square;
        let move;

        do {
            move = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
            square = gameboard.findSquare(JSON.stringify(move));
        } while(square.selected === true)
        
        const hit = gameboard.receiveAttack(move);

        return { hit, square };
    }
}