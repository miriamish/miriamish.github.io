let address ="../image/speed/";
let fruit =[
    "watermelon.png",
    "orange.png",
    "strawberry.png",
    "grape.png",
    "banana.png",
    "apple.png",
    "kiwi.png",
    "mango.png",
    "pineapple.png",
    "palm.png",
    "record.png"
]
function setLevel(e) {
    let source = e.srcElement.src;
    let index = fruit.findIndex((a)=> (a==source)? true: false) +1;
    const level = {};
    if (index == 11) {
        level.time = 1000;
        level.fallTime = 300;
        level.bombNum = 9;
        level.isRecord = true;
        level.fruitInUse = 10;
    }
    else {
        level.fallTime = 1000 - 50 * index;
        level.bombNum = index;
        level.time = 5 + 3 * index;
        level.level = index;
        level.fruitInUse = index;
    }
    level.xp = 6 + 2 * index;
    localStorage.setItem("level", JSON.stringify(level));
    window.location.assign("./speedGame.html");
}
for (let i = 1; i < 12; i++) {
    let imgs = document.createElement('img');
    imgs.src = address + fruit[i - 1];
    fruit[i-1] = imgs.src;
    imgs.className = "locked";
    document.getElementById("levels").append(imgs);
    animate(imgs);
    if (userManage.currentUser.speedLevels >= i - 1 || i == 11) { 
        imgs.addEventListener("click", setLevel); 
        imgs.className = "unlocked";
    }

}

function animate(img){
    let degree = 0;
    let calc = 0.3;
    let calc2 = 0.1;
    let y = Math.random()*10;
    setInterval(() => {
        img.style.transform = `rotate(${degree}deg)`;
        img.style.marginTop = y + "px"; 
        if(degree > 45){
            calc = -0.3;
        }
        if(degree < -45){
            calc = 0.3;
        }
        if(y > 10){
            calc2 = -0.1;
        }
        if(y < -10){
            calc2 = 0.1;
        }
        degree+=calc;
        y+=calc2;
    }, 5);
}


