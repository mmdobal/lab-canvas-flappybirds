const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const background = new Image();
background.src = './images/bg.png';
function drawBackground() {
  ctx.drawImage(background, 0, 0);
}

function FabyCreator() {
  this.width = 450;
  this.height = 250;
  this.speedY = 0;
  this.gravity = 0;
  this.gravitySpeed = 1;
}

// let faby = {
//   width: 450,
//   height: 250,
//   speedY: 0,
//   gravity: 0,
//   gravitySpeed: 1
// };
const faby = new FabyCreator();

function drawFaby() {
  drawBackground();
  const img = new Image();
  const imgScale = 498 / 351;
  img.onload = function () {
    ctx.drawImage(img, faby.width, faby.height, 60 * imgScale, 60);
  };
  img.src = './images/flappy.png';
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fall() {
  faby.height += faby.gravity * faby.speedGravity;
}


// setInterval(update, 20)

function startGame() {
  drawFaby();
  const intervalId = setInterval(() => {
    console.log(faby.height + 'hhh');
    faby.gravity = 1;
    faby.speedGravity += 2;
    fall();
    drawFaby();
    console.log(faby.gravitySpeed, faby.height);
  }, 1000);

  document.body.onkeyup = function (e) {
    if (e.keyCode === 32) {
      clearInterval(intervalId);

      faby.gravity = -1;
      faby.speedGravity = 5;
      console.log(faby.gravity, faby.gravitySpeed);
      fall();
      drawFaby();
    }
  };
}

window.onload = function () {
  document.getElementById('start-button').onclick = function () {
    startGame();
  };
};
