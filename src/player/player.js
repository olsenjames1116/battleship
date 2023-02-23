// Creates a player object to represent the player and computer
export default class Player {
    constructor(type) {
        this.type = type;
        this.ships = 5;
    }

    // Remove a ship that has been sunk from the player
    sinkShip() {
        this.ships -= 1;
    }

    // Makes a random legal move for the computer
    randomMove(gameboard, player) {
        let square;
        let move;

        // Generates a set of coordinates for a move until it finds a square that has not been selected
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