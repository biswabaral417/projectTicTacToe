//final one
// lets use an minmax algoritm
let isUsersTurn = true;
const boardUI = document.querySelector(".board")

let board = [
    [{ pos: "0-0", selectedby: "" }, { pos: "0-1", selectedby: "" }, { pos: "0-2", selectedby: "" }],
    [{ pos: "1-0", selectedby: "" }, { pos: "1-1", selectedby: "" }, { pos: "1-2", selectedby: "" }],
    [{ pos: "2-0", selectedby: "" }, { pos: "2-1", selectedby: "" }, { pos: "2-2", selectedby: "" }]
]
board.forEach(row => {
    row.forEach(el => {
        console.log(el)
        const box = document.createElement("div")
        box.id = `box${el.pos}`
        box.classList.add("box");
        box.setAttribute("selectedby", ``)
        box.addEventListener("click", (e) => {
            setSelection(e)
        })
        boardUI.appendChild(box)
    })
})



const setSelection = (e) => {
    if (!isUsersTurn) { return }
    const box = e.target
    let j = Number(box.id.substring(3, 4))
    let k = Number(box.id.substring(5, 6))
    el = board[j][k]
    let condition = el.selectedby != "user" && el.selectedby != "comp"
    if (!condition) {
        return
    }

    if (box.getAttribute("selectedby") != "user" || box.getAttribute("selectedby") != "comp") {
        console.log("Click")
        box.setAttribute("selectedby", `user`)
        box.textContent = "X"
        el.selectedby = "user"
        isUsersTurn = false
        if (CheckWinner("user") === 1) {
            document.getElementById("result").textContent = "you won"
            document.getElementById("playagain").style.display = "block"
            return
        }
        if(isBoardFull()){
            resetBoard()
        }
        compMove()
    } else {
        console.log(`alreadySelected ${box.getAttribute("selectedby")}`)
    }
}

// const compMove = () => {
//     for (row of board) {
//         for (el of row) {
//             if (el.selectedby != "user" && el.selectedby != "comp") {

//                 const box = document.getElementById(`box${el.pos}`)
//                 box.setAttribute("selectedby", `comp`)
//                 box.textContent = "0"
//                 let j = Number(el.pos.substring(0, 1))
//                 let k = Number(el.pos.substring(2, 3))
//                 console.log(j, k)
//                 board[j][k].selectedby = "comp"
//                 return
//             }
//         }
//     }
// }

const CheckWinner = (by) => {
    for (let i = 0; i < 3; i++) {
        if (board[i][0].selectedby == by && board[i][1].selectedby == by && board[i][2].selectedby == by) {
            return 1
        }
        if (board[0][i].selectedby == by && board[1][i].selectedby == by && board[2][i].selectedby == by) {
            return 1
        }
    }
    if (board[0][0].selectedby == by && board[1][1].selectedby == by && board[2][2].selectedby == by) {
        return 1
    }
    if (board[0][2].selectedby == by && board[1][1].selectedby == by && board[2][0].selectedby == by) {
        return 1
    }
    return 0
}

const minimax = (boardState, depth, isMaximizing) => {
    // Check if a terminal state is reached
    if (CheckWinner("user") === 1) return -10 + depth; // User wins
    if (CheckWinner("comp") === 1) return 10 - depth;  // Computer wins
    if (isBoardFull()) return 0;                       // Tie

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardState[i][j].selectedby === "") {
                    // Make the move
                    boardState[i][j].selectedby = "comp";
                    const score = minimax(boardState, depth + 1, false);
                    // Undo the move
                    boardState[i][j].selectedby = "";
                    bestScore = Math.max(bestScore, score);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardState[i][j].selectedby === "") {
                    // Make the move
                    boardState[i][j].selectedby = "user";
                    const score = minimax(boardState, depth + 1, true);
                    // Undo the move
                    boardState[i][j].selectedby = "";
                    bestScore = Math.min(bestScore, score);
                }
            }
        }
        return bestScore;
    }
};

const compMove = () => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j].selectedby === "") {
                // Simulate the move
                board[i][j].selectedby = "comp";
                const score = minimax(board, 0, false);
                // Undo the move
                board[i][j].selectedby = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { i, j };
                }
            }
        }
    }

    if (bestMove) {
        const { i, j } = bestMove;
        board[i][j].selectedby = "comp";
        const box = document.getElementById(`box${board[i][j].pos}`);
        box.setAttribute("selectedby", "comp");
        box.textContent = "0";

        if (CheckWinner("comp") == 1) {
            document.getElementById("result").textContent = "you lost"
            document.getElementById("playagain").style.display = "block"
            return
        }
        if(isBoardFull())(
            resetBoard
        )
        isUsersTurn = true
    }
};
const isBoardFull = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j].selectedby === "") return false;
        }
    }
    return true;
};


document.getElementById("playagain").addEventListener("click", () => {
   resetBoard()
    
})
const resetBoard=()=>{
    board = [
        [{ pos: "0-0", selectedby: "" }, { pos: "0-1", selectedby: "" }, { pos: "0-2", selectedby: "" }],
        [{ pos: "1-0", selectedby: "" }, { pos: "1-1", selectedby: "" }, { pos: "1-2", selectedby: "" }],
        [{ pos: "2-0", selectedby: "" }, { pos: "2-1", selectedby: "" }, { pos: "2-2", selectedby: "" }]
    ]
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            document.getElementById(`box${i}-${j}`).textContent = ""
        }
    }
    isUsersTurn = true
    document.getElementById("result").textContent = ""
            document.getElementById("playagain").style.display = "none"
    
}