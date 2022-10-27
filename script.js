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
    console.log(yPosition, xPosition, snakeDirection)

    for (let i = 0; i < 3; i++){
        if (snakeDirection === 'up') yPosition++;
        if (snakeDirection === 'down') yPosition--;
        if (snakeDirection === 'left') xPosition--;
        if (snakeDirection === 'right') xPosition++;

        const snakeElement = document.querySelector(`[data-x="${xPosition}"][data-y="${yPosition}"]`);
        console.log(snakeElement);
        snakeElement.classList.add('snake')
        snakeElements.unshift(snakeElement);
    }
}

createBoard();
initSnake();