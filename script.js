const players = (() => {
    const human = "X";
    const computer = "O";
    return {human, computer}
})();

const gameData = (() => {
    const board = Array.from(Array(9).keys());
    const winCombos = [
         [0,1,2],[3,4,5],[6,7,8], //horizontal win
         [0,3,6],[1,4,7],[2,5,8], //veritcal win
         [0,4,8],[2,4,6]          //diagonal win
    ];
    const cells = document.querySelectorAll(".cell")
    return {board, winCombos, cells};
})();

const gamePlay = (() => {
    const startGame = function() {
        gameData.board = Array.from(Array(9).keys());
        const cells = gameData.cells;
        document.querySelector(".endgame").style.display = "none";
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = "";
            cells[i].style.removeProperty("background-color");
            cells[i].addEventListener("click", gamePlay.takeTurn, false);
        };
    };
    const takeTurn = function(clickEvent) {
        if (typeof gameData.board[clickEvent.target.id] === "number") {
            gamePlay.turn(clickEvent.target.id, players.human);
            if (!checkTie()) turn(bestSpot(), players.computer);
        };
    };
    const turn = function(cellId, player) {
        gameData.board[cellId] = player;
        document.getElementById(cellId).innerText = player;
        let gameWon = checkWin(gameData.board, player);
        if (gameWon) gameOver(gameWon);
    };
    const checkWin = function(board, player) {
        let plays = board.reduce((acc, currentVal, index) => 
            (currentVal === player) ? acc.concat(index) : acc, []);
        let gameWon = null;
        for (let [index, win] of gameData.winCombos.entries()) {
            if (win.every((elem) => plays.indexOf(elem) > -1)) {
                gameWon = {index:index, player: player};
                break;
            };
        };
        return gameWon;
    };
    const gameOver = (gameWon) => {
        for (let index of gameData.winCombos[gameWon.index]) {
            document.getElementById(index).style.backgroundColor = 
            gameWon.player == players.human ? "green" : "red";
        }
        for (let i = 0; i < gameData.cells.length; i++) {
            gameData.cells[i].removeEventListener("click", gamePlay.takeTurn, false);
        }
        declareWinner(gameWon.player == players.human ? "You win!" : "You Lose!")
    };

    const declareWinner = (who) => {
        document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").innerText = who;
    };
    return {startGame, takeTurn, turn, checkWin, gameOver, declareWinner};
    
})();

//minimax algorithm for AI

const emptySquares = () => {
    let board = gameData.board.filter((val) => typeof val === "number")
    return board
};


function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (gamePlay.checkWin(newBoard, players.human)) {
		return {score: -10};
	} else if (gamePlay.checkWin(newBoard, players.computer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == players.computer) {
			var result = minimax(newBoard, players.human);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, players.computer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === players.computer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

const bestSpot = () => {
    return minimax(gameData.board, players.computer).index
};

const checkTie = () => {
    if (emptySquares().length == 0) {
        for (let i = 0; i < gameData.cells.length; i ++) {
            gameData.cells[i].style.backgroundColor = "green";
            gameData.cells[i].removeEventListener("click", turn, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

gamePlay.startGame();