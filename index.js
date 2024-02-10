const boxes = document.querySelectorAll(".box ");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// function to intialize game 

function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player -${currentPlayer}`;

}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }

    // update on gameinfo X or O
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}


function checkGameOver() {
    let answer = "";
    winningPos.forEach((position) => {
        if ((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") && (
                gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check winner x or o
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //disable pointer event further game will stop here
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //change winner background
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        gameInfo.innerText = `WINNER PLAYER -- ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillcount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillcount++;
        }
    });

    if (fillcount === 9) {
        gameInfo.innerText = "GAME TIED !";
        newGameBtn.classList.add("active");

    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        //swap turn 
        swapTurn();

        //check game is over or not
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener(("click"), initGame);