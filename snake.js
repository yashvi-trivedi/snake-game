const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
let dx = 1;
let dy = 0;
let score = 0;
let gameOver = false;
let speed = 250; // Initial speed

function draw() {
  if (gameOver) return;

  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Check collisions
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    gameOver = true;
    document.getElementById("restartBtn").style.display = "inline-block";
    document.getElementById("gameState").textContent="Game Over!";
    //alert("Game Over!");
    return;
  }

  snake.unshift(head);

  // Check food
  if (head.x === food.x && head.y === food.y) {
    score += 1;
    speed -= 10; // Speed up as snake eats food
    placeFood();
  } else {
    snake.pop(); // Remove tail if not eating
  }

  // Draw background
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "lime";
  snake.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Update score
  document.getElementById("score").textContent = "Score: " + score;
}
/*
function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}
*/

function placeFood() {
  let newFood;
  let isOnSnake;

  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };

    // Check if food is on the snake
    isOnSnake = snake.some(part => part.x === newFood.x && part.y === newFood.y);

  } while (isOnSnake); // Keep trying until food is not on snake

  food = newFood;
}


function changeDirection(e) {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -1;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = 1;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -1; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = 1; dy = 0;
  }
}
/*
function restartGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: 5, y: 5 };
  dx = 1;
  dy = 0;
  score = 0;
  speed = 150;
  gameOver = false;
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("score").textContent = "Score: 0";
  setInterval(draw, speed);
}
*/

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    dx = 1;
    dy = 0;
    score = 0;
    gameOver = false;
    speed = 250; // Initial speed
    document.getElementById("restartBtn").style.display = "none"; // Hide the button again
    document.getElementById("gameState").textContent="Playing...";
}

document.getElementById("restartBtn").addEventListener("click", restartGame);
document.addEventListener("keydown", changeDirection);
setInterval(draw, speed); // Game loop
