const board = document.querySelector('.board');
const scoreText = document.querySelector('.score__score-text');
const highestScoreText = document.querySelector('.score__highest-score-text');
const gameInfo = document.querySelector('.game-info');
const gameInfoText = document.querySelector('.game-info__text');
let snakeElements = [];
let food;
let gameOver = false;
let snakeDirection = getDirection();
let score = 0;
let highestScore = 0;

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

        const snakeElement = getBoardElement(xPosition, yPosition);
        snakeElement.classList.add('snake')
        snakeElements.unshift(snakeElement);
    }

    moveSnake();
    controlSnake();
    createFood();
}

const moveSnake = () => {
    let gameInterval = setInterval(() => {
        let nextX = snakeElements[0]["dataset"]["x"];
        let nextY = snakeElements[0]["dataset"]["y"];

        if (snakeDirection === 'up') nextY--;
        if (snakeDirection === 'down') nextY++;
        if (snakeDirection === 'left') nextX--;
        if (snakeDirection === 'right') nextX++;

        if (isGameOver(nextX, nextY)) {
            clearInterval(gameInterval);
            setHighestScore();
            gameInfo.classList.add('game-info--on');
            gameInfoText.innerHTML = `GAME OVER!!!<br>YOUR SCORE: ${score}<br>PRESS ANY KEY TO CONTINUE`;
        }

        else {
            const nextSnakeElement = getBoardElement(nextX, nextY);
            nextSnakeElement.classList.add('snake');
            snakeElements.unshift(nextSnakeElement);
            snakeElements[snakeElements.length - 1].classList.remove('snake');

            if (nextSnakeElement !== food) {
                snakeElements.pop();
            }
            else {
                food.classList.remove('food');
                createFood();
                setScore();
            }

        }
        actualizeSnakeHead();
    }, 200)
}

const isGameOver = (x, y) => {
    // checking if snake hit wall or himself
    if  (x < 1 || x > 20 || y < 1 || y > 20 ||
        snakeElements.some(({dataset}) => dataset.x == x && dataset.y == y )) {
        return true;
    }
    else return false;
}

const controlSnake = () => {
    window.addEventListener('keydown', (e) => {
        // preventing page from scroll
        e.preventDefault()

        // changing direction for all cases
        if (e.code === 'ArrowLeft' && snakeDirection !== "right") snakeDirection = 'left';
        if (e.code === 'ArrowRight' && snakeDirection !== "left") snakeDirection = 'right';
        if (e.code === 'ArrowUp' && snakeDirection !== "down") snakeDirection = 'up';
        if (e.code === 'ArrowDown' && snakeDirection !== "up") snakeDirection = 'down';
    })
}

const createFood = () => {
    let xPosition;
    let yPosition;

    do {
        xPosition = Math.floor(Math.random() * 20) + 1
        yPosition = Math.floor(Math.random() * 20) + 1
    } 
    while (snakeElements.some(({dataset}) => dataset.x == xPosition && dataset.y == yPosition))

    food = getBoardElement(xPosition, yPosition);
    food.classList.add('food');
}

const setScore = () => {
    score += 10;
    scoreText.textContent = `SCORE: ${score}`;
}

const setHighestScore = () => {
    if (highestScore < score) {
        highestScore = score;
        highestScoreText.textContent = `HIGHEST SCORE: ${highestScore}`;
    }
}

const initSnakeHead = () => {
    if (snakeDirection === 'up') {
        snakeElements[0].classList.add('snake__head--vertical');
        snakeElements[0].innerHTML = '<span class="snake__tongue snake__tongue--up"></span>'
    }
    if (snakeDirection === 'down') {
        snakeElements[0].classList.add('snake__head--vertical');
        snakeElements[0].innerHTML = '<span class="snake__tongue snake__tongue--down"></span>'
    }
    if (snakeDirection === 'left') {
        snakeElements[0].classList.add('snake__head--horizontal');
        snakeElements[0].innerHTML = '<span class="snake__tongue snake__tongue--left"></span>'
    }
    if (snakeDirection === 'right') {
        snakeElements[0].classList.add('snake__head--horizontal');
        snakeElements[0].innerHTML = '<span class="snake__tongue snake__tongue--right"></span>'
    }
}

const actualizeSnakeHead = () => {
    snakeElements.forEach(snakeElement => {
        snakeElement.classList.remove('snake__head--vertical');
        snakeElement.classList.remove('snake__head--horizontal');
        snakeElement.innerHTML = '';
    })
    initSnakeHead();
}

const getBoardElement = (xPosition, yPosition) => {
    return document.querySelector(`[data-x="${xPosition}"][data-y="${yPosition}"]`);
}

const clearBoard = () => {
    // removing classes from every board element
    board.childNodes.forEach(boardElement => {
        boardElement.classList.remove('snake');
        boardElement.classList.remove('food');
        boardElement.classList.remove('snake__head--vertical');
        boardElement.classList.remove('snake__head--horizontal');
        boardElement.innerHTML = '';
    })

    food = null;
    snakeElements = [];
    snakeDirection = getDirection();
    score = 0;
    scoreText.textContent = `SCORE: ${score}`;
}

const startGame = () => {
    if (gameInfo.classList.contains('game-info--on')){
        clearBoard();
        initSnake();
        initSnakeHead();
        gameInfo.classList.remove('game-info--on');
    }
    else {
        console.log('crash')
    }
}

createBoard();

window.addEventListener('keydown', () => startGame());
window.addEventListener('click', () => startGame());