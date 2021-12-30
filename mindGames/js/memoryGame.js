function init() {
  /*general function*/
  let imgClicked = (e) => {
    if (gameData.disable) {
      let img = document.createElement("img");
      img.src = e.srcElement.src;
      let divs = document.querySelectorAll(".insertBar");
      divs[gameData.selectedImgs.length].append(img);
      gameData.selectedImgs.push(img.src);
      if (gameData.selectedImgs.length === gameData.set.length) {
        gameFunc.checkAnswer();
        gameData.selectedImgs = [];
        gameData.disable = false;
      }
    }
  };
  let getRnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  /* all the game information*/
  const gameData = {
    //the sources for the images
    sources: [
      "../image/1.png",
      "../image/2.png",
      "../image/3.png",
      "../image/4.png",
      "../image/5.png",
      "../image/6.png",
      "../image/7.png",
      "../image/8.png",
      "../image/9.png",
      "../image/10.png",
    ],
    level: JSON.parse(localStorage.getItem("level")),
    set: [], //current set of images to remember
    selectedImgs: [], //the user selected of images
    imgShown: 0, //how much image the code already show
    disable: false, //if you can press the images
  };

  /* all the game function*/
  const gameFunc = {
    displayImg: () => {
      let tryinterval = setInterval(() => {
        let img = document.getElementById("display");
        img.classList.add("show");
        if (gameData.imgShown < gameData.set.length) {
          //the code didnt show all the previus images yet
          img.src = gameData.set[gameData.imgShown]; //show one of the previus images
          gameData.imgShown++; //increase the number of shown images
        } else {
          //get a random image from the image in use
          let randNum = getRnd(
            gameData.level.imageInUse[0],
            gameData.level.imageInUse[1]
          );
          img.src = gameData.sources[randNum]; //add a random image to the shown images
          gameData.set.push(img.src); //add the image to the set
          clearInterval(tryinterval); //stop showing more images
          gameData.imgShown = 0; //reset the number of shown images
          gameData.disable = true;
        }
        setTimeout(() => {
          img.classList.remove("show");
        }, gameData.level.timePerImage - 100);
      }, gameData.level.timePerImage);
    },
    imgBar: () => {
      let start = gameData.level.imageInUse[0]; //finding the start and the end according to image in use
      let end = gameData.level.imageInUse[1];
      for (let i = start; i <= end; i++) {
        let temp = document.createElement("img"); //create an image
        temp.src = gameData.sources[i]; //chose a source between the start to the end
        temp.className = "imgBar"; //give the image the class imgBar
        temp.addEventListener("click", imgClicked); //give the image the event imgClicked
        document.getElementById("upperBar").prepend(temp); //append the image
      }
    },
    insertBar: () => {
      let bar = document.querySelectorAll("#bar div");
      if (bar) {
        //clean all the divs from previus stages (null return false)
        for (let i = 0; i < bar.length; i++) {
          bar[i].remove();
        }
      }
      for (
        let i = 0; i < gameData.set.length + 1; i++ //create new divs according to the number of images in set
      ) {
        let temp = document.createElement("div"); //create a div
        temp.className = "insertBar"; //give the div the class insertBar
        temp.style.backgroundImage = "url('../image/bar.png')";
        document.getElementById("bar").append(temp); //append the div
      }
    },
    checkAnswer: () => {
      //run on all the images and find out if the user had a mistake
      for (let i = 0; i < gameData.set.length; i++) {
        if (gameData.set[i] !== gameData.selectedImgs[i]) {
          gameFunc.worng(); //user had a mistake
          return false;
        }
      }
      gameFunc.right(); //user didnt have a mistake
      return true;
    },
    worng: () => {
      if (gameData.level.isRecord) {
        gameFunc.setRecord(gameData.set.length - 1);
      } else {
        userManage.showMessage("!נכשלת");
        setTimeout(() => {
          window.location.assign("./memoryMenu.html");
        }, 2000);
      }
    },
    right: () => {
      fall();
      if (gameData.set.length === gameData.level.setLength) {
        setTimeout(() => {
          userManage.showMessage(`נצחת! הרווחת ${gameData.level.xp} נקודות`);
        }, 2000);
        userManage.setUserData(
          "xp",
          userManage.currentUser.xp + gameData.level.xp
        );
        if (userManage.currentUser.memoryLevels < gameData.level.level) {
          userManage.setUserData("memoryLevels", gameData.level.level);
        }
        setTimeout(() => {
          window.location.assign("./memoryMenu.html");
        }, 4000);
      }
    },
    setRecord: (record) => {
      if (userManage.currentUser.memoryRecord < record) {
        userManage.setUserData("memoryRecord", record);
        let xp = gameData.set.length * 10;
        userManage.showMessage(
         `יפה מאד! הרוחת ${xp} נקודות`
        );
        userManage.setUserData(
          "xp",
          userManage.currentUser.xp + xp
        );
      }
      let highestRecord = userManage.getMemoryRecord();
      userManage.showMessage(
        ` המשתמש הכי טוב הוא  ${highestRecord[0]}\nעם שיא של ${highestRecord[1]} תמונות ברצף`
      );
      setTimeout(() => {
        window.location.assign("./memoryMenu.html");
      }, 3000);
    },
  };
  gameFunc.imgBar();
  document.getElementById("next").addEventListener("click", () => {
    gameFunc.insertBar();
    gameFunc.displayImg();
    document.getElementById("next").remove();
  });

  function fall() {
    let sound = document.createElement("audio");
    sound.src = "../audio/masoa.mp3";
    sound.play();
    let candies = document.querySelectorAll(".insertBar img");
    let end = parseFloat(document.getElementById("barEnd").offsetLeft);
    for (let i = 0; i < candies.length; i++) {
      let temp = candies[i];
      let y = parseFloat(temp.offsetTop);
      let start = y;
      let x = parseFloat(temp.offsetLeft);
      temp._number = i;
      let id = setInterval(() => {
        if (x >= end + 40) {
          clearInterval(id);
          let id2 = setInterval(() => {
            if (y > start + 74) {
              clearInterval(id2);
              if (temp._number == 0) {
                gameFunc.insertBar();
                gameFunc.displayImg();

              }
              temp.remove();
            }
            temp.style.top = y + "px";
            temp.style.transform = `rotate(${y - 180}deg)`;
            y++;
          }, 5);
        }

        temp.style.left = x + "px";
        x++;
      }, 5);
    }
  }
}
init();