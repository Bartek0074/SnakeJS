const board = document.querySelector('.board')
const snakeElements = [];
let food;
let gameOver = false;
let snakeDirection = getDirection();

function getDirection() {
    const directions = ['up', 'right', 'down', 'left'];

    return directions[Math.floor(Math.random() * directions.length)];
}

const createBoard = () => {
    console.log(board);
    for (let i = 1; i < 20; i++) {
        for (let j = 1; j < 20; j++) {
            const div = document.createElement('div');
            div.className = "board__element";
            div.dataset.y = i;
            div.dataset.x = j;
            board.appendChild(div)
        }
    }
}

createBoard();