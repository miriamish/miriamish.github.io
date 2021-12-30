const addres = "../image/speed/";
let background = document.getElementById("container");
const gameData = {
  screen: {
    top: 0,
    bottom: window.innerHeight,
    left: 0,
    right: window.innerWidth,
  },
  life: 3,
  gameOver: false,
  level: JSON.parse(localStorage.getItem("level")),
  fruits: [{
      fruit: "watermelon.png",
      halfFruit: ["halfwatermelon.png", "halfwatermelon2.png"],
      spot: "redSpot.png",
      speed: 0.8,
    },
    {
      fruit: "orange.png",
      halfFruit: ["halforange.png", "halforange2.png"],
      spot: "orangeSpot.png",
      speed: 0.9,
    },
    {
      fruit: "strawberry.png",
      halfFruit: ["halfstrawberry.png", "halfstrawberry2.png"],
      spot: "redSpot.png",
      speed: 1.1,
    },
    {
      fruit: "grape.png",
      halfFruit: [
        "halfgrape.png",
        "halfgrape2.png",
        "halfgrape3.png",
        "halfgrape4.png",
        "halfgrape5.png",
        "halfgrape6.png",
      ],
      spot: "purpleSpot.png",
      speed: 1,
    },
    {
      fruit: "banana.png",
      halfFruit: [
        "halfbanana2.png",
        "halfbanana2.png",
        "halfbanana.png",
        "halfbanana.png",
      ],
      spot: "yellowSpot.png",
      speed: 1.1,
    },
    {
      fruit: "apple.png",
      halfFruit: ["halfapple2.png", "halfapple.png"],
      spot: "greenSpot.png",
      speed: 0.85,
    },
    {
      fruit: "kiwi.png",
      halfFruit: ["halfkiwi2.png", "halfkiwi2.png"],
      spot: "greenSpot.png",
      speed: 1,
    },

    {
      fruit: "mango.png",
      halfFruit: ["halfmango2.png", "halfmango.png", "halfmango3.png"],
      spot: "yellowSpot.png",
      speed: 0.75,
    },
    {
      fruit: "pineapple.png",
      halfFruit: [
        "halfpineapple2.png",
        "halfpineapple.png",
        "halfpineapple1.png",
      ],
      spot: "yellowSpot.png",
      speed: 1.2,
    },
    {
      fruit: "palm.png",
      halfFruit: ["halfpalm2.png", "halfpalm.png"],
      spot: "purpleSpot.png",
      speed: 1.5,
    },
  ],
  fruitCut: 0,
};

function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function fruitFall() {
  let fruit = document.createElement("img");
  const stop = () => window.clearInterval(fruit._id);
  let random = getRnd(0, gameData.level.fruitInUse);
  document.body.append(fruit);
  fruit.src = addres + gameData.fruits[random].fruit;
  fruit.className = "fruit";
  fruit._type = random;
  fruit.addEventListener("click", fruitPressed);
  let y = 0;
  let x = getRnd(gameData.screen.left, gameData.screen.right - 90);
  fruit.style.left = x + "px";
  fruit._id = setInterval(() => {
    isGameOver(fruit._id);
    if (y >= gameData.screen.bottom - 90) {
      stop();
      fruit.remove();
      removeLife();
    } else {
      y += gameData.fruits[random].speed;
      fruit.style.top = y + "px";
    }
    fruit.style.transform = `rotate(${y}deg)`;
  }, 5);
}

function removeLife() {
  if (gameData.life <= 0) {
    gameOver();
  } else {
    gameData.life--;
    let x = document.createElement("img");
    x.className = "x";
    x.src = addres + "RedX.svg.png";
    background.prepend(x);
  }
}

function bombFall() {
  let bomb = document.createElement("img");
  bomb.src = addres + "bomb.png";
  document.body.append(bomb);
  bomb.className = "bomb";
  bomb.addEventListener("click", bombPreesed);
  let y = 0;
  let x = getRnd(gameData.screen.left, gameData.screen.right - 90);
  bomb.style.left = x + "px";
  let id = setInterval(() => {
    if (y >= gameData.screen.bottom - 90) {
      window.clearInterval(id);
      bomb.remove();
    } else {
      y++;
      bomb.style.top = y + "px";
    }
    bomb.style.transform = `rotate(${y}deg)`;
    isGameOver(id);
  }, 5);
}

function halfFall(x, y, src) {
  let calc = 0.01 * Math.random() * 2;
  let halfFruit = document.createElement("img");
  halfFruit.src = addres + src;
  halfFruit.className = "halfFruit";
  document.body.append(halfFruit);
  halfFruit.style.top = y + "px";
  halfFruit.style.left = x + "px";
  let random = Math.random() * 2 - 1;
  let id = setInterval(() => {
    isGameOver(id);
    if (y > gameData.screen.bottom - 70) {
      clearInterval(id);
      halfFruit.remove();
    } else {
      if (x < gameData.screen.left || x > gameData.screen.right - 70) {
        random = -random;
      }
      x -= random;
      y = y - 2 + calc;
      halfFruit.style.top = y + "px";
      halfFruit.style.left = x + "px";
      calc += 0.02;
    }
    halfFruit.style.transform = `rotate(${calc * 100}deg)`;
  }, 5);
}

function spot(x, y, src) {
  let dirt = document.createElement("img");
  dirt.src = addres + src;
  dirt.className = "spot";
  dirt.style.top = y + "px";
  dirt.style.left = x + "px";
  document.body.append(dirt);
  setTimeout(() => {
    dirt.className = "spotHide";
  }, 3000);
  setTimeout(() => {
    dirt.remove();
  }, 5000);
}
let soundfruit = document.createElement("audio");
soundfruit.src = "../audio/soundfruit.mp3";

function fruitPressed(e) {
  gameData.fruitCut++;
  soundfruit.play();
  let type = e.srcElement._type;
  window.clearInterval(e.srcElement._id);
  e.srcElement.remove();
  spot(e.clientX, e.clientY, gameData.fruits[type].spot);
  for (let i = 0; i < gameData.fruits[type].halfFruit.length; i++) {
    halfFall(e.clientX, e.clientY, gameData.fruits[type].halfFruit[i]);
  }
}

function bombPreesed(e) {
  var soundbomb = document.createElement("audio");
  soundbomb.src = "../audio/soundbomb.mp3";
  soundbomb.play();
  e.srcElement.src = addres + "boom.png";
  e.srcElement.className = "boom";
  gameOver();

  e.srcElement.style.transform = "rotate(0deg)";
  setTimeout(() => {
    userManage.showMessage("נכשלת!");
    gameData.life = 0;
  }, 1000);
}
let gameRun;
let timer;
let countdown = document.getElementById("countdown");
countdown.innerHTML = gameData.level.time;
let next = document.getElementById("next");
next.addEventListener("click", startGame);

function startGame() {
  startTimer();
  gameRun = setInterval(() => {
    if (gameData.life <= 0) {
      gameOver();
    }
    fruitFall();
    let random = Math.random() * 10;
    if (random < gameData.level.bombNum) {
      bombFall();
    }
  }, gameData.level.fallTime);

  next.remove();
}
let countItDown = function () {
  let currentTime = parseFloat(countdown.textContent);
  if (currentTime > 0) {
    countdown.textContent = currentTime - 1;
  } else {
    clearInterval(timer);
    window.clearInterval(gameRun);
    setTimeout(() => {
      if (gameData.life > 0) {
        gameWon();
      } else {
        gameOver();
      }
    }, 6000);
  }
};

function startTimer() {
  timer = window.setInterval(countItDown, 1000);
}

function gameOver() {
  window.clearInterval(gameRun);
  window.clearInterval(timer);
  gameData.gameOver = true;
  if (gameData.level.isRecord) {
    let xp = userManage.currentUser.xp + gameData.fruitCut;
    userManage.setUserData("xp", xp);
    userManage.showMessage(`יפה מאד\nהרווחת ${gameData.fruitCut} נקודות`);
  } else {
    userManage.showMessage("נכשלת!");
  }
  setTimeout(() => {
    window.location.assign("./speedMenu.html");
  }, 3000);
}

function isGameOver(num) {
  if (gameData.gameOver) {
    window.clearInterval(num);
  }
}

function gameWon() {
  if (userManage.currentUser.speedLevels < gameData.level.level) {
    userManage.setUserData("speedLevels", gameData.level.level);
  }
  let xp = userManage.currentUser.xp + gameData.level.xp + 2 * gameData.life;
  userManage.setUserData("xp", xp);
  userManage.showMessage(
    `ניצחת\nהרווחת ${gameData.level.xp + 2 * gameData.life} נקודות`
  );
  setTimeout(() => window.location.assign("./speedMenu.html"), 2000);
}