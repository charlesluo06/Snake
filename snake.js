// DRAWS CANVAS

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.strokeRect(0, 0, canvas.width, canvas.height);

function clearCanvas(){
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Drawing Snake

let snake = [
    {x: 60, y: 150},
    {x: 50, y: 150},
    {x: 40, y: 150},
    {x: 30, y: 150},
    {x: 20, y: 150}
]

function drawSnakePart(snakePart) {
    ctx.strokeStyle = "darkgreen";
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

// makes the apples

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

let foodX;
let foodY;

function createFood(){
    foodX = randomTen(0, canvas.width - 10);
    foodY = randomTen(0, canvas.height - 10);

    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x === foodX && part.y === foodY;
        if (foodIsOnSnake){
            createFood();
        }
    });
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred"
    ctx.strokeRect(foodX, foodY, 10, 10);
    ctx.fillRect(foodX, foodY, 10, 10);
}

// movement for the snake

function changeDirection(event) {
    const LEFT_KEY = 37; const RIGHT_KEY = 39; const UP_KEY = 38; const DOWN_KEY = 40;

    if (changingDirection) return;
        changingDirection = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;

    if (keyPressed === LEFT_KEY && !goingRight) {
       dx = -10; dy = 0;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10; dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0; dy = -10;
    }
    if (keyPressed === DOWN_KEY && !goingUp){
        dx = 0; dy = 10;
    }
}

let score = 0;

dx = 10;
dy = 0;

function advanceSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;

    if (didEatFood){
        score += 1;
        document.getElementById("score").innerHTML = score;
        if (score === 5) {
            increaseGameSpeed();
        }
        if (score === 15) {
            increaseGameSpeed();
        }
        if (score === 30) {
            increaseGameSpeed();
        }
        if (score === 50) {
            increaseGameSpeed();
        }

        createFood();
    }
    else {
        snake.pop();
    }
}

// ends game

function didGameEnd() {
    for (let i = 4; i < snake.length; i++){
        const didSnakeCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if (didSnakeCollide){
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitBottomWall = snake[0].y > canvas.height - 10;
    const hitTopWall = snake[0].y < 0;
    return hitTopWall || hitRightWall || hitBottomWall || hitLeftWall;
}

createFood();

let gameSpeed = 130;

// How Snake Moves forever
function main() { setTimeout(function onTick() {
    if (didGameEnd()){
        document.getElementById("score").innerHTML = "You ded lol";
        return;
    }
    changingDirection = false; clearCanvas(); drawFood(); advanceSnake(); drawSnake(); main();}, gameSpeed)
}

function increaseGameSpeed() {
    gameSpeed -= 15;
}

main();

// snake changes direction when an arrow is pressed
document.addEventListener("keydown", changeDirection);

drawSnake();


