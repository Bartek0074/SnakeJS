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
    for (let i = 1; i <= 20; i++) {
        for (let j = 1; j <= 20; j++) {
            const div = document.createElement('div');
            div.className = "board__element";
            div.dataset.y = i;
            div.dataset.x = j;
            board.appendChild(div)
        }
    }
}

const initSnake = () => {
    let xPosition = Math.floor(Math.random() * 12) + 5;
    let yPosition = Math.floor(Math.random() * 12) + 5;

    for (let i = 0; i < 3; i++){
        if (snakeDirection === 'up') yPosition--;
        if (snakeDirection === 'down') yPosition++;
        if (snakeDirection === 'left') xPosition--;
        if (snakeDirection === 'right') xPosition++;

        const snakeElement = document.querySelector(`[data-x="${xPosition}"][data-y="${yPosition}"]`);
        console.log(snakeElement);
        snakeElement.classList.add('snake')
        snakeElements.unshift(snakeElement);
    }

    moveSnake();
}

const moveSnake = () => {
    let gameInterval = setInterval(() => {
        let nextX = snakeElements[0]["dataset"]["x"];
        let nextY = snakeElements[0]["dataset"]["y"];

        if (snakeDirection === 'up') nextY--;
        if (snakeDirection === 'down') nextY++;
        if (snakeDirection === 'left') nextX--;
        if (snakeDirection === 'right') nextX++;

        const nextSnakeElement = document.querySelector(`[data-x="${nextX}"][data-y="${nextY}"]`);
        nextSnakeElement.classList.add('snake');
        snakeElements.unshift(nextSnakeElement);
        snakeElements[snakeElements.length - 1].classList.remove('snake');
        snakeElements.pop();

    }, 200)
}

createBoard();
initSnake();