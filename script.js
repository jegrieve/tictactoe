
const Gameboard = (() => {
    const board = [[" "," "," "],[" "," "," "],[" "," "," "]];
    const gameOver = () => {
        return false;
    };
    //win condition
    const placeSymbol = (sym, pos) => {
        [y,x] = pos;
        board[y][x] = sym;
    };
    return {board, gameOver, placeSymbol};
})();

const Player = (name, symbol) => {
    this.name = name;
    this.symbol = symbol;
    const getInput = () => { //temporary
        let input = prompt("Enter pos (EX: 0 0 )").split(" ");
        return input;
    };
    return {name, symbol, getInput}
};

const Game = (board, ...players) => {
    while (!board.gameOver()) {
        let currentPlayer = players[0];
        input = currentPlayer.getInput();
        posInput = input.map(Number);
        board.placeSymbol(currentPlayer.symbol, posInput);
        renderGame(board.board);
        previousPlayer = players.shift();
        players.push(previousPlayer);
    };
};

const renderGame = (board) => {
    alert(`${board}`);
}




