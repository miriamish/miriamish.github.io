let setGameLevel = (e) => {
  let classList = e.srcElement.classList;
  console.log(classList[1]);
  const level = {};
  switch (classList[0]) {
    case "beginer":
      level.timePerImage = 2000;
      level.xp = 1;
      level.setLength = 2;
      level.imageInUse = [0, 2];
      level.level = 1;
      break;
    case "medium":
      level.timePerImage = 1500;
      level.xp = 10;
      level.setLength = 6;
      level.imageInUse = [1, 4];
      level.level = 6;
      break;
    case "profession":
      level.timePerImage = 1000;
      level.xp = 20;
      level.setLength = 10;
      level.imageInUse = [2, 6];
      level.level = 11;
      break;
    case "record":
      level.timePerImage = 800;
      level.setLength = 10000;
      level.imageInUse = [0, 2];
      level.isRecord = true;
    default:
      console.log("ERROR");
  }
  switch (classList[1]) {
    case "level1":
      break;
    case "level2":
      level.timePerImage -= 100;
      level.xp += 2;
      level.setLength++;
      level.imageInUse[1]++;
      level.imageInUse[0]++;
      level.level += 1;
      break;
    case "level3":
      level.timePerImage -= 200;
      level.xp += 4;
      level.setLength += 2;
      level.imageInUse[1] += 2;
      level.imageInUse[0] += 2;
      level.level += 2;
      break;
    case "level4":
      level.timePerImage -= 300;
      level.xp += 6;
      level.setLength += 3;
      level.imageInUse[1] += 2;
      level.imageInUse[0] += 2;
      level.level += 3;
      break;
    case "level5":
      level.timePerImage -= 400;
      level.xp += 8;
      level.setLength += 3;
      level.imageInUse[1] += 3;
      level.imageInUse[0] += 3;
      level.level += 4;
      break;
    default:
      console.log("ERROR");
  }
  localStorage.setItem("level", JSON.stringify(level));
  window.location.assign("./memoryGame.html");
};
let buttons = document.querySelectorAll("#levelsMenu button");

let currentLevel = userManage.currentUser.memoryLevels;
for (let i = 0; i < currentLevel +1 && i < 15; i++) {
  buttons[i].addEventListener("click", setGameLevel);
}
document.querySelector('.record').addEventListener("click",setGameLevel);
if (currentLevel < 5) {
  enterBeigner(currentLevel + 1);
} else if (currentLevel < 10) {
  enterBeigner(5);
  enterMedium(currentLevel - 4);
} else if (currentLevel < 15) {
  enterBeigner(5);
  enterMedium(5);
  enterProf(currentLevel - 9);
} else{
  enterBeigner(5);
  enterMedium(5);
  enterProf(5);
}
function enterBeigner(num) {
  let sound = document.createElement("audio");
    sound.src = "../audio/machine.WAV";
    sound.play();
  let levels = document.querySelectorAll("#beginer button");
  let machine = document.querySelector("#beginer .machine");
  let top =
    parseFloat(machine.offsetTop) + (parseFloat(machine.height) / 3) * 2.5;
  let left =
    parseFloat(machine.offsetLeft) + (parseFloat(machine.width) / 5) * 1.3;
  let i = 0;
  let allLevels = setInterval(() => {
    
    let target = left + 60 * (num - i);
    let x = left;
    levels[i].style.top = top + "px";
    levels[i].style.display = "inline-block";
    let current = i;
    let id = setInterval(() => {
      if (x >= target) {
        clearInterval(id);
      }
      levels[current].style.left = x + "px";
      x++;
    }, 5);
    i++;
    if (i >= num) {
      clearInterval(allLevels);
    }
  }, 1000);
}
function enterMedium(num) {
  let levels = document.querySelectorAll("#medium button");
  let machine = document.querySelector("#medium .machine");
  let top =
    parseFloat(machine.offsetTop) + (parseFloat(machine.height) / 3) * 2.5;
  let right =
    parseFloat(machine.offsetLeft) + (parseFloat(machine.width) / 5) * 3.7;
  let i = 0;
  let allLevels = setInterval(() => {
    let target = right - 60 * (num - i);
    let x = right;
    levels[i].style.top = top + "px";
    levels[i].style.display = "inline-block";
    let current = i;
    let id = setInterval(() => {
      if (x <= target) {
        clearInterval(id);
      }
      levels[current].style.left = x + "px";
      x--;
    }, 5);
    i++;
    if (i >= num) {
      clearInterval(allLevels);
    }
  }, 1000);
}
function enterProf(num) {
  let levels = document.querySelectorAll("#profession button");
  let machine = document.querySelector("#profession .machine");
  let top =
    parseFloat(machine.offsetTop) + (parseFloat(machine.height) / 3) * 2.5;
  let left =
    parseFloat(machine.offsetLeft) + (parseFloat(machine.width) / 5) * 1.3;
  let i = 0;
  let allLevels = setInterval(() => {
    let target = left + 60 * (num - i);
    let x = left;
    levels[i].style.top = top + "px";
    levels[i].style.display = "inline-block";
    let current = i;
    let id = setInterval(() => {
      if (x >= target) {
        clearInterval(id);
      }
      levels[current].style.left = x + "px";
      x++;
    }, 5);
    i++;
    if (i >= num) {
      clearInterval(allLevels);
    }
  }, 1000);
}
