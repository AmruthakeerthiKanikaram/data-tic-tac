document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("reset-btn");

    const PLAYER_X = "X";
    const PLAYER_O = "O";
    let currentPlayer = PLAYER_X;
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const index = event.target.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) {
            return;
        }

        updateBoard(index);
        checkWinner();
    }

    function updateBoard(index) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    }

    function checkWinner() {
        let roundWon = false;

        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const [a, b, c] = WINNING_COMBINATIONS[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X} Wins!`;
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            statusText.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = PLAYER_X;
        gameActive = true;
        statusText.textContent = "";
        cells.forEach(cell => (cell.textContent = ""));
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
