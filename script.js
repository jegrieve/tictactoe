const gameBoard = (() => {
    const board = Array.from(Array(9).keys());
    const boardWinCombos = [
        [0,1,2],[3,4,5],[6,7,8], //horizontal win
        [0,3,6],[1,4,7],[2,5,8], //veritcal win
        [0,4,8],[2,4,6]          //diagonal win
    ];
    return {board, boardWinCombos};
})();

const handlers = (() => {
    const cells = document.querySelectorAll(".cells");
})();



// const gameBoard = (() => {
//     const board = [["","",""],["","",""],["","",""]];
//     const buttonElements = document.querySelectorAll(".inputButton")

//     const addEventListeners = () => {
//         buttonElements.forEach((elm) => {
//             elm.addEventListener("click", function() {console.log("hi")}) // change func
//         })
//     };
//     return {board, addEventListeners}
// })();


// const Player = (name, symbol) => {
//     this.name = name;
//     this.symbol = symbol;
//     return {name, symbol}
// };


// const Game = (player1, player2) => {
// let players = [player1, player2]
// const renderGame = () => {
    
//     };
// };
