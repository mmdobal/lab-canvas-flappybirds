const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const background = new Image();
background.src = './images/bg.png';
function drawBackground() {
  ctx.drawImage(background, 0, 0);
}

const arrayObstacle = [];

function FabyCreator() {
  this.width = 450;
  this.height = 250;
  this.speedY = 0;
  this.gravity = 0;
  this.gravitySpeed = 1;
}

function random(max, min) {
  return Math.random() * (max - min) + min;
}

function pipeY() {
  return random(-550, -700);
}

function Pipes() {
  this.topY = pipeY();
  this.topX = 900;
  this.bottomY = this.topY + 943;
}


function drawPi(pipe) {
  drawBackground();
  const img = new Image();
  // const y = pipeY();
  // const imgScale = 498 / 351;
  img.onload = function () {
    ctx.drawImage(img, pipe.topX, pipe.topY, 138, 793);
  };
  img.src = './images/obstacle_top.png';
  const img2 = new Image();
  // const img2Scale = 498 / 351;
  img2.onload = function () {
    ctx.drawImage(img2, pipe.topX, pipe.bottomY, 138, 793);
  };
  img2.src = './images/obstacle_bottom.png';
}

let faby = new FabyCreator();

function drawFaby() {
  drawBackground();
  const img = new Image();
  const imgScale = 498 / 351;
  img.onload = function () {
    ctx.drawImage(img, faby.width, faby.height, 60 * imgScale, 60);
  };
  img.src = './images/flappy.png';
}


function fall(grav, gravSpeed) {
  faby.gravity += grav;
  faby.gravitySpeed = gravSpeed;

  faby.height += grav * gravSpeed;
}

function startGame() {
  drawFaby();

  const createObstacle = setInterval(() => {
    const pipe = new Pipes();
    arrayObstacle.push(pipe);
  }, 5000);

  const render = setInterval(() => {
    for (let i = 0; i < arrayObstacle.length; i += 1) {
      if (arrayObstacle[i].topX === 0) {
        arrayObstacle.splice(arrayObstacle[i], 1);
        console.log(arrayObstacle.length);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFaby();
        arrayObstacle[i].topX -= 1;
        drawPi(arrayObstacle[i]);
      }     
    }
  }, 10);
}

window.onload = function () {
  document.getElementById('start-button').onclick = function () {
    startGame();
  };
};

document.body.onkeyup = function (e) {
  if (e.keyCode === 32) {
    // clearInterval(intervalId);

    console.log(faby.gravity, faby.gravitySpeed);
    fall(-1, 5);
    // drawFaby();
  }
};

const intervalId = setInterval(() => {
  fall(1, 5);
  drawFaby();
  console.log(faby.height);
}, 1000);
