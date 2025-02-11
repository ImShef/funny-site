const bird = document.getElementById("bird");
const obstacleTop = document.getElementById("obstacle-top");
const obstacleBottom = document.getElementById("obstacle-bottom");
const scoreElement = document.getElementById("score");

let birdY = 250;
let gravity = 5.5;
let score = 0;
let obstacleSpeed = 5;
let gameInterval;
let obstacleInterval;

// Гравитация и управление
function applyGravity() {
  birdY += gravity;
  bird.style.top = birdY + "px";
}

function jump() {
  birdY -= 50;
  bird.style.top = birdY + "px";
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

// Генерация препятствий
function moveObstacles() {
  const obstacleTopHeight = Math.random() * 200 + 50;
  const obstacleBottomHeight = 400 - obstacleTopHeight - 150;

  obstacleTop.style.height = obstacleTopHeight + "px";
  obstacleBottom.style.height = obstacleBottomHeight + "px";

  let obstacleX = 400;

  function frame() {
    obstacleX -= obstacleSpeed;
    obstacleTop.style.left = obstacleX + "px";
    obstacleBottom.style.left = obstacleX + "px";

    if (obstacleX < -60) {
      obstacleX = 400;
      score++;
      scoreElement.textContent = "Счет: " + score;
    }

    // Проверка столкновений
    const birdRect = bird.getBoundingClientRect();
    const topObstacleRect = obstacleTop.getBoundingClientRect();
    const bottomObstacleRect = obstacleBottom.getBoundingClientRect();

    if (
      birdRect.left < topObstacleRect.right &&
      birdRect.right > topObstacleRect.left &&
      (birdRect.top < topObstacleRect.bottom ||
        birdRect.bottom > bottomObstacleRect.top)
    ) {
      endGame();
    }

    if (birdY > 600) {
      endGame();
    }
  }

  obstacleInterval = setInterval(frame, 20);
}

// Завершение игры
function endGame() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  alert("ВЫ НЕ ЛЕВ ТОЛСТОЙ! Ваш счет: " + score);
  location.reload();
}

// Запуск игры
function startGame() {
  gameInterval = setInterval(applyGravity, 20);
  moveObstacles();
}

startGame();
