const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const gameOver = document.querySelector(".game-over");

let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 4) {
          clearInterval(downInterval);
          position = 4;
          dino.style.bottom = position + "px";
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add("cactus");
  cactus.style.left = cactusPosition + "px";
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 16 && cactusPosition < 76 && position < 60) {
      clearInterval(leftInterval);
      clearTimeout(cactusTimeout);
      gameOver.style.display = "block";
      background.style.animationPlayState = "paused";
      background.removeChild(dino);
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  let cactusTimeout = setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener("keyup", handleKeyUp);
