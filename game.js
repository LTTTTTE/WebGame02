
let canvas = document.getElementById("myCanvas");
let draw = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
var playerX = 50;
var playerY = canvasHeight * 0.95;
var playerDx = 0;
var playerDy = 0;
var playerHead = 1;
var playerMoveTime = 10;
var playerMoveAction = 1;
var playerMoveActionSpeed = 4;
var time = 0;
var vecJump = 0;
var platforms = [];
var inventory = [0,1,1];
var platformType = 7;
var gamePause = 0;
var round = 0;
var win = 1;

var playerRightMoveImages = [];
var playerLeftMoveImages = [];
var boomImages = [];

for(var i = 0; i < 10; i++){
    playerRightMoveImages[i] = new Image();
    playerLeftMoveImages[i] = new Image();
    boomImages[i] = new Image();
    playerRightMoveImages[i].src = "resources/oguPng/ogu" + i + ".png";
    playerLeftMoveImages[i].src = "resources/oguPng/ogu" + i + "-1.png";
    boomImages[i].src = "resources/boom/boom" + i + ".png";
}

var platformImages = [];
for(var j = 1; j < 6; j++){
    platformImages[j] = new Image();
    platformImages[j].src = "resources/platforms/platform" + j + ".png";
}

var cloudImages = [];
for (i = 1; i < 3; i++){
    cloudImages[i] = new Image();
    cloudImages[i].src = "resources/cloud/cloud" + i + ".png";
}

var enemy1Images = [];
for (i = 0; i < 48; i++){
    enemy1Images[i] = new Image();
    enemy1Images[i].src = "resources/enemy/1/enemy1_" + i + ".png";
}

var enemy2Images = [];
for (i = 0; i < 86; i++){
    enemy2Images[i] = new Image();
    enemy2Images[i].src = "resources/enemy/2/enemy2_" + i + ".png";
}

var firework1Images = [];
for (i = 0; i < 40; i++){
    firework1Images[i] = new Image();
    firework1Images[i].src = "resources/firework1/firework1_" + i + ".png";
}

var backgroundImg = new Image();
backgroundImg.src = "resources/background.jpg";
var inventoryImg = new Image();
inventoryImg.src = "resources/inventory.png";
var popupImg = new Image();
popupImg.src = "resources/popup.png";
var carrotImg = new Image();
carrotImg.src = "resources/carrot.png";
var nutImg = new Image();
nutImg.src = "resources/bullet/nut.png";
var bananaImg = new Image();
bananaImg.src = "resources/bullet/banana.png";
var cheeryImg = new Image();
cheeryImg.src = "resources/bullet/cheery.png";
var grapeImg = new Image();
grapeImg.src = "resources/bullet/grape.png";

var bulletImages = [];
bulletImages.push(nutImg);
bulletImages.push(bananaImg);
bulletImages.push(cheeryImg);
bulletImages.push(grapeImg);

var clouds = [];
clouds.push({"img":cloudImages[1], "x":188, "y":188, "d":1});
clouds.push({"img":cloudImages[2], "x":563, "y":196, "d":-1});
clouds.push({"img":cloudImages[1], "x":820, "y":74, "d":1});
clouds.push({"img":cloudImages[2], "x":1112, "y":249, "d":-1});

var bullets = [];
var enemies = [];
var hitObjects = [];
var winFireWorks = [];


//enemies.push({"img":2,"x":1000, "y":100, "dx":0, "dy":0, "time":0, "frame":86});
//1 : 기본, 2 : 점프대, 3 : 밟을시 부서짐, 9 : 승리마크
function playerMove() {
    draw.beginPath();
    draw.fillStyle = "blue";
    gravity();
    jump();
    collision();
    drawPlayer();

    if(playerDx !== 0){
        playerMoveAction++;
        if(playerMoveAction > playerMoveActionSpeed){
            playerMoveAction = 0;
            playerMoveTime++;
        }
    }
}

function drawPlayer() {
    var x = playerX += 5*playerDx;
    var y = playerY += playerDy;
    if(playerHead === 1){
        draw.drawImage(playerRightMoveImages[playerMoveTime % 10],x-20,y-20,50,45);
        //draw.drawImage(playerHoldImgRight,x-20,y-20,50,45);
    } else {
        draw.drawImage(playerLeftMoveImages[playerMoveTime % 10],x-20,y-20,50,45);
        //draw.drawImage(playerHoldImgLeft,x-20,y-20,50,45);
    }

    draw.fill();
}

function display() {
    drawBackground();
    drawPlatform();
    drawInventory();
    drawCloud();
    drawBullets();
    drawEnemy();
    hitEnemy();
    hitPlayer();
    drawHitAnimation();
    drawWinFireWork();
    if(win === 1) showWin();
}

function drawBackground() {
    draw.drawImage(backgroundImg,0,0,canvasWidth,canvasHeight);
}

function drawPopup() {
    draw.drawImage(popupImg,610,370,280,210);
}

function drawInventory(){
    draw.drawImage(inventoryImg,0,0,420,100);
    draw.fillStyle = "#000000";
    draw.font = '20px Arial';
    draw.textBaseline = "top";
    draw.fillText("x"+inventory[0],121,48);
    draw.fillText("x"+inventory[1],227,48);
    draw.fillText("x"+inventory[2],333,48);
}

function drawCloud() {
    for (i = 0; i < clouds.length; i++){
        draw.drawImage(clouds[i].img,clouds[i].x,clouds[i].y,200,80);
        if(clouds[i].x < 0){
            clouds[i].d = 1;
        }
        if(clouds[i].x > canvasWidth){
            clouds[i].d = -1;
        }
        clouds[i].x += clouds[i].d;
    }

}

function drawBullets() {
    for(i = 0; i < bullets.length; i++){
        draw.drawImage(bullets[i].img,bullets[i].x,bullets[i].y,30,30);
        bullets[i].x += bullets[i].dx;
        bullets[i].dy += bullets[i].time * bullets[i].time * 25;
        bullets[i].y += bullets[i].dy;
        bullets[i].time += 0.01;

        if(bullets[i].x > canvasWidth || bullets[i].x < 0 || bullets[i].y > canvasHeight){
            bullets.splice(i,1);
        }
    }
}

function drawEnemy() {
    for(i = 0; i < enemies.length; i++){
        enemies[i].time++;
        if(enemies[i].img === 1) {
            draw.drawImage(enemy1Images[enemies[i].time % enemies[i].frame], enemies[i].x, enemies[i].y, 120, 130);
        }
        if(enemies[i].img === 2) {
            draw.drawImage(enemy2Images[enemies[i].time % enemies[i].frame], enemies[i].x, enemies[i].y, 240, 260);
        }
    }

}

function drawHitAnimation() {
    for(i = 0; i < hitObjects.length; i ++){
        if(hitObjects[i].time > 9){
            hitObjects.splice(i,1);
            continue;
        }
        console.log("폭팔!",hitObjects[i].x,);
        draw.drawImage(boomImages[hitObjects[i].time],hitObjects[i].x,hitObjects[i].y,40,40);
        hitObjects[i].temp++;
        if(hitObjects[i].temp > 2){
            hitObjects[i].time++;
            hitObjects[i].temp = 0;
        }
    }
}

function drawWinFireWork() {
    for(i = 0; i < winFireWorks.length; i ++){

        if(winFireWorks[i].time >= 40){
            continue;
        }
        draw.drawImage(firework1Images[winFireWorks[i].time],winFireWorks[i].x,winFireWorks[i].y,500,300);
        winFireWorks[i].temp++;
        if(winFireWorks[i].temp > 3){
            winFireWorks[i].time++;
        }
    }
}

function gravity() {
    if (playerY <= canvasHeight - 20) {
        playerDy = 5 * time * time * 0.7;
        time += 0.03;
    } else {
        playerDy = 0;
        time = 0;
    }

}

function jump() {
    playerDy += -vecJump / 5 + (playerDy);

    if (vecJump > 0) {
        vecJump -= 9.8 * time * 30 / 60;
    } else {
        vecJump = 0;
    }
}

function main() {
    display();
    playerMove();
}

function addPlatform(x, y){

    if(platformType === 1 && inventory[platformType - 1] > 0) {
        platforms.push({"x": x - 15, "y": y - 15, "width": 30, "height": 30, "type" : 1});
        inventory[platformType - 1]--;
    }
    if(platformType === 2 && inventory[platformType - 1] > 0) {
        platforms.push({"x": x - 15, "y": y - 15, "width": 30, "height": 30, "type" : 2});
        inventory[platformType - 1]--;
    }
    if(platformType === 3 && inventory[platformType - 1] > 0) {
        platforms.push({"x": x - 15, "y": y - 15, "width": 30, "height": 30, "type" : 3});
        inventory[platformType - 1]--;
    }
    if(platformType === 9) {
        platforms.push({"x": x - 15, "y": y - 15, "width": 30, "height": 30, "type" : 9});
    }
}

function deletePlatform(x, y) {
    for (var i in platforms){
        if(platforms[i].x <= x && x <= platforms[i].x + 30 && platforms[i].y <= y && y <= platforms[i].y + 30){
            platforms.splice(i,1);
        }
    }
}

function drawPlatform(){
    for(var i in platforms){
        if(platforms[i].type === 1){

            draw.drawImage(platformImages[platforms[i].type],platforms[i].x,platforms[i].y,platforms[i].width,platforms[i].height);
        }
        if(platforms[i].type === 2){

            draw.drawImage(platformImages[platforms[i].type],platforms[i].x,platforms[i].y,platforms[i].width,platforms[i].height);
        }
        if(platforms[i].type === 3){

            draw.drawImage(platformImages[platforms[i].type],platforms[i].x,platforms[i].y,platforms[i].width,platforms[i].height);
        }
        if(platforms[i].type === 9){

            draw.drawImage(carrotImg,platforms[i].x,platforms[i].y,platforms[i].width + 5,platforms[i].height + 5);
        }
    }
}

function collision(){
    for(var i in platforms) {

        //collision form top
        if(platforms[i].x - 5 <= playerX && playerX <= platforms[i].x + 35 && platforms[i].y - 20 <= playerY && playerY <= platforms[i].y + 10){
            if(platforms[i].type === 2){
                jumpPlatform();
                break;
            }
            if(platforms[i].type === 3){
                breakPlatform();
                platforms.splice(i,1);
                break;
            }
            if(winLogic(i))break;
            console.log("collision top","DY : "+playerDy,"time : "+time,"vecJump : "+vecJump);
            playerY = platforms[i].y - 20;
            time = 0;
            break;
        }
        //collision from left
        if(platforms[i].x - 20 <= playerX && playerX <= platforms[i].x + 10  && platforms[i].y <= playerY && playerY <= platforms[i].y + 30){
            if(winLogic(i))break;
            console.log("collision left");
            playerX = platforms[i].x - 20;
            break;
        }
        //collision from right
        if(platforms[i].x + 10  <= playerX && playerX <= platforms[i].x + 50 && platforms[i].y <= playerY && playerY <= platforms[i].y + 30){
            if(winLogic(i))break;
            console.log("collision right");
            playerX = platforms[i].x + 50;
            break;
        }
        //collision form bottom
        if(platforms[i].x - 5 <= playerX && playerX <= platforms[i].x + 35 && platforms[i].y + 10 <= playerY && playerY <= platforms[i].y + 50){
            if(winLogic(i))break;
            console.log("collision bottom","DY : "+playerDy,"time : "+time,"vecJump : "+vecJump);
            playerY = platforms[i].y + 50;
            vecJump = 0;
            break;
        }
    }

    if(playerY > canvasHeight - 20){
        playerY = canvasHeight - 20;
    }
}

function jumpPlatform(){
    time = 0;
    vecJump = 75;
}

function breakPlatform(){
    time = 0;
    vecJump = 50;
}

function winLogic(i){
    if(platforms[i].type === 9){
        console.log("winRound");
        winFireWorks.push({"x":platforms[i].x - 250, "y":platforms[i].y - 150, "time":0, "temp":0});
        platforms.splice(i,1);
        win = 1;
        return true;
    }
    return false;
}

function showWin() {
    drawPopup();
    draw.fillStyle = "#ffffff";
    draw.font = '70px Arial';
    draw.textBaseline = "top";
    if(round === 0){
        draw.fillText("Ready", (canvasWidth - 200) / 2, (canvasHeight - 90) / 2);
        draw.font = '25px Arial';
        draw.fillText("START : Enter", (canvasWidth - 180) / 2, (canvasHeight - 150) / 1.5);
    } else {
        draw.fillText("승리!", (canvasWidth - 150) / 2, (canvasHeight - 90) / 2);
        draw.font = '25px Arial';
        draw.fillText("다음라운드 : Enter", (canvasWidth - 200) / 2, (canvasHeight - 150) / 1.5);
    }
}

function showPauseMenu(){
    draw.fillStyle = "#ffffff";
    draw.font = '70px Arial';
    draw.textBaseline = "top";
    draw.fillText("일시정지", (canvasWidth - 150) / 2, (canvasHeight - 100) / 2);
}

function setRound(){
    platforms = [];
    enemies = [];
    playerX = 50;
    playerY = canvasHeight * 0.95;
    console.log("라운드 : "+round + ", win = "+win);
    if(round === 1){
        platformPush(410,806);
        platformPush(575,715);
        platformPush(779,615);
        platformPush(957,525);
        platformPush(1155,420);
        platformPush(1300,288);
        platformPushType(1298,160,9);
        enemies.push({"img":1,"x":1000, "y":300, "dx":0, "dy":0, "time":0, "frame":48, "hp":10});
    }
    if(round === 2){
        inventory = [1,0,0];
        platformPush(410,806);
        platformPush(575,715);
        platformPush(779,615);
        platformPush(957,525);
        platformPush(1300,288);
        platformPushType(1298,160,9);
    }
}

function platformPush(x,y){
    platforms.push({"x": x, "y": y, "width": 30, "height": 30, "type" : 1});
}
function platformPushType(x,y,t){
    platforms.push({"x": x, "y": y, "width": 30, "height": 30, "type" : t});
}
function platformPushSize(x,y,w,h,t){
    platforms.push({"x": x, "y": y, "width": w, "height": h, "type" : t});
}

function playerShot(x,y){
    if(bullets.length < 3){
        console.log("playerBulletsPush");
        var bulletPosX = (x-playerX);
        if(bulletPosX >= 300){
            bulletPosX = 300;
        }
        var bulletPosY = (y-playerY);
        if(bulletPosY <= -300){
            bulletPosY = -300;
        }
        bullets.push({"img":bulletImages[Math.floor(Math.random()*4)], "x":playerX, "y":playerY, "tx":x, "ty":y, "dx":bulletPosX / 30, "dy":bulletPosY / 30, "time":0});
    }
}

function addEnemy(x,y){
    enemies.push({"img":1,"x":x, "y":y, "dx":0, "dy":0, "time":0, "frame":48, "hp": 10});
    enemies.push({"img":2,"x":x, "y":y, "dx":0, "dy":0, "time":0, "frame":87, "hp": 100});
}

function hitEnemy(){
    for(j = 0; j < enemies.length; j++){
        if(enemies[j].hp <= 0){
            enemies.splice(j,1);
            continue;
        }
        for(i = 0; i < bullets.length; i++){
            if(bullets[i].x <= enemies[j].x + 120 && bullets[i].x >= enemies[j].x &&
                bullets[i].y <= enemies[j].y + 130 && bullets[i].y >= enemies[j].y){
                enemyHitAnimation(bullets[i].x,bullets[i].y);
                bullets.splice(i,1);
                enemies[j].hp--;
            }
        }
    }
}

function enemyHitAnimation(x,y){
    hitObjects.push({"x":x, "y":y, "time":0, "temp":0});
}

function hitPlayer(){
    for(j = 0; j < enemies.length; j++){
        if(playerX <= enemies[j].x + 120 && playerX >= enemies[j].x &&
            playerY <= enemies[j].y + 130 && playerY >= enemies[j].y){
            setRound();
        }
    }
}

let mainSchedule = setInterval(main, 20);

document.body.addEventListener('keydown', (arg)=>{
    // console.log("down "+arg.code,"x:" + playerX,"y:" + playerY);
    // console.log("dx:"+playerDx);
    if(arg.code === 'KeyA' && playerDx >= 0){
        console.log("playerDx--");
        playerHead = -1;
        playerDx--;
    }
    if(arg.code === 'KeyD' && playerDx <= 0){
        console.log("playerDx++");
        playerHead = 1;
        playerDx++;
    }
    if(arg.code === 'KeyR' && playerDx <= 0){
        console.log("Replay");
        setRound();
    }
    if(arg.code === 'Digit1'){
        platformType = 1;
        console.log("platformType = 1");
    }
    if(arg.code === 'Digit2'){
        platformType = 2;
        console.log("platformType = 2");
    }
    if(arg.code === 'Digit3'){
        platformType = 3;
        console.log("platformType = 3");
    }
    if(arg.code === 'Digit4'){
        platformType = 4;
        console.log("platformType = 4");
    }
    if(arg.code === 'Digit9'){
        platformType = 9;
        console.log("platformType = 9");
    }
    if(arg.code === 'Enter' && win === 1){
        round++;
        win = 0;
        setRound();
    }
    if(arg.code === 'Space'){
        //console.log("time : "+time, "DY:"+playerDy,"vecJump:"+vecJump);
        if(playerDy < 0.01 && vecJump < 0.1){
            time = 0;
            vecJump = 50;
        } else {
            //console.log("점프불가" + playerDy , vecJump)
        }
        arg.preventDefault();
    }
    if(arg.code === 'Escape'){
        if(gamePause === 0 && win === 0) {
            gamePause = 1;
            showPauseMenu();
            clearInterval(mainSchedule);
        } else {
            gamePause = 0;
            mainSchedule = setInterval(main, 20);
        }
    }
});

document.body.addEventListener('keyup', (arg)=>{
    console.log("up "+arg.code,"x:" + playerX,"y:" + playerY);
    console.log("dx:"+playerDx);
    if(arg.code === 'KeyA'){
        playerDx++;
    }
    if(arg.code === 'KeyD'){
        playerDx--;
    }
});

canvas.addEventListener('click',(arg)=>{
    console.log("click X:" + arg.clientX,"click Y:" + arg.clientY);
    if(arg.buttons === 4){
        arg.preventDefault();
        alert("middle");
    }

    if(arg.clientX < 400 && arg.clientY < 90){
        if(arg.clientX >= 70 && arg.clientX <= 114 && arg.clientY >= 28 && arg.clientY <= 68){
            platformType = 1;
            console.log("changed platformType : " + platformType);
            canvas.style.cursor = "url('resources/cursor/platform1.cur'),auto";
            return;
        }
        if(arg.clientX >= 177 && arg.clientX <= 220 && arg.clientY >= 28 && arg.clientY <= 68){
            platformType = 2;
            console.log("changed platformType : " + platformType);
            canvas.style.cursor = "url('resources/cursor/platform2.cur'),auto";
            return;
        }
        if(arg.clientX >= 282 && arg.clientX <= 325 && arg.clientY >= 28 && arg.clientY <= 68){
            platformType = 3;
            console.log("changed platformType : " + platformType);
            canvas.style.cursor = "url('resources/cursor/platform3.cur'),auto";
            return;
        }
        canvas.style.cursor = "url(''),auto";
        return;
    }
    if(gamePause === 1 || round === 0){
        return;
    }

    addPlatform(arg.clientX,arg.clientY);
}, false);

canvas.addEventListener('contextmenu',(arg)=>{
    console.log("rightClick");
    arg.preventDefault();
    if(gamePause === 1){
        return;
    }
    console.log("click X:" + arg.clientX,"click Y:" + arg.clientY);
    deletePlatform(arg.clientX, arg.clientY);
}, false);

canvas.addEventListener('wheel',(arg)=>{
    playerShot(arg.x,arg.y);
    arg.preventDefault();
});