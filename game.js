
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
var globalTime= 0;
var time = 0;
var vecJump = 0;
var platforms = [];
var inventory = [0,1,1];
var platformType = 7;
var gamePause = 0;
var intro = 1;
var round = 5;
var win = 1;



var backgroundMusic = new Audio("resources/music/backgroundMusic.mp3");
backgroundMusic.controls = true;
backgroundMusic.loop = true;

var bossBackgroundMusic = new Audio("resources/music/bossBGM.wav");
var endBackgroundMusic = new Audio("resources/music/endBGM.mp3");

var jumpMusic = new Audio("resources/music/jump.wav");
var bounceMusics = [];
for(i = 0; i < 3; i++){
    bounceMusics[i] = new Audio("resources/music/bounce.mp3");
}
bounceMusics[3] = 0;

var blockPlaceMusic = new Audio("resources/music/blockPlace.mp3");
var winMusic = new Audio("resources/music/win.wav");
var throwMusics = [];
for(i = 0; i < 10; i ++){
    throwMusics[i] = new Audio("resources/music/throw.wav");
}
var hitMusics= [];
for(i = 0; i < 15; i++){
    hitMusics[i] = new Audio("resources/music/hit" + (i % 3) + ".wav");
}
hitMusics[15] = 0;

var glassBreakMusics = [];
for(i = 0; i < 6; i++){
    glassBreakMusics[i] = new Audio("resources/music/glassBreak" + (i % 3) + ".wav");
}
glassBreakMusics[6] = 0;

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

var enemy3Images = [];
for (i = 0; i < 18; i++){
    enemy3Images[i] = new Image();
    enemy3Images[i].src = "resources/enemy/3/enemy3_" + i + ".png";
}

var firework1Images = [];
for (i = 0; i < 40; i++){
    firework1Images[i] = new Image();
    firework1Images[i].src = "resources/firework1/firework1_" + i + ".png";
}

var firework2Images = [];
for (i = 0; i < 45; i++){
    firework2Images[i] = new Image();
    firework2Images[i].src = "resources/firework2/firework2_" + i + ".png";
}

var metheorImages = [];
for(i = 0; i < 190; i++){
    metheorImages[i] = new Image();
    metheorImages[i].src = "resources/metheor/metheor-" + i + ".png";
}

var backgroundImg = new Image();
backgroundImg.src = "resources/background.jpg";
var inventoryImg = new Image();
inventoryImg.src = "resources/inventory.png";
var popupImg = new Image();
popupImg.src = "resources/popup.png";
var introImg = new Image();
introImg.src = "resources/intro.png";
var carrotImg = new Image();
carrotImg.src = "resources/carrot/carrot0.png";
var nutImg = new Image();
nutImg.src = "resources/bullet/nut.png";
var bananaImg = new Image();
bananaImg.src = "resources/bullet/banana.png";
var cheeryImg = new Image();
cheeryImg.src = "resources/bullet/cheery.png";
var grapeImg = new Image();
grapeImg.src = "resources/bullet/grape.png";
var bearImg = new Image();
bearImg.src = "resources/enemy/bear.png";
var homeImg = new Image();
homeImg.src = "resources/home.png";
var endImg = new Image();
endImg.src = "resources/endImg3.png";

var tutoImages = [];
for(i = 0; i < 6; i++){
    tutoImages[i] = new Image();
    tutoImages[i].src = "resources/tutorial/tuto" + i + ".png";
}

var carrotImages = [];
for (i = 0; i < 13; i++){
    carrotImages[i] = new Image();
    carrotImages[i].src = "resources/carrot/carrot" + i + ".png";
}

var bulletImages = [];
bulletImages.push(nutImg);
bulletImages.push(bananaImg);
bulletImages.push(cheeryImg);
bulletImages.push(grapeImg);

var fireball = new Image();
fireball.src = "resources/bullet/fireball2.png";
var bossBulletImages = [];
for(i = 0; i < 3; i++){
    bossBulletImages[i] = new Image();
    bossBulletImages[i].src = "resources/bullet/bossBullet" + i + ".png";
}
bossBulletImages[3] = 0;

var enemyBulletImages = [];
enemyBulletImages.push(fireball);

var clouds = [];
clouds.push({"img":cloudImages[1], "x":188, "y":188, "d":1});
clouds.push({"img":cloudImages[2], "x":563, "y":196, "d":-1});
clouds.push({"img":cloudImages[1], "x":820, "y":74, "d":1});
clouds.push({"img":cloudImages[2], "x":1112, "y":249, "d":-1});

var bullets = [];
var enemies = [];
var hitObjects = [];
var winFireWorks = [];
var enemiesBullets = [];


//enemies.push({"img":2,"x":1000, "y":100, "dx":0, "dy":0, "time":0, "frame":86});
//1 : 기본, 2 : 점프대, 3 : 밟을시 부서짐, 9 : 승리마크
//적img1 : 불쏘시개 //적img2 보스 // 적img3 새 // 적img4 잠만보
function main() {
    display();
    playerMove();
    globalTime++;
}

function display() {
    drawBackground();
    drawPlatform();
    drawInventory();
    drawTutorial();
    drawCloud();
    drawBullets();
    drawEnemy();
    playBackgroundMusic();
    hitEnemy();
    hitPlayer();
    drawHitAnimation();
    drawWinFireWork();
    enemyAttack();
    drawEnemyBullets();
    bulletConflict();
    if(win === 1) showWin();
}

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

    if(playerX < 18){
        playerX = 18;
    }
    if(playerX > canvasWidth - 60){
        playerX = canvasWidth - 60;
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

function drawBackground() {
    draw.drawImage(backgroundImg,0,0,canvasWidth,canvasHeight);
}

function drawPopup() {
    draw.drawImage(popupImg,590,124,380,470);
}

function drawInventory(){
    if(round === 0){
        return;
    }
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
        if(enemies[i].img === 3) {
            draw.drawImage(enemy3Images[Math.floor(enemies[i].time/3) % enemies[i].frame], enemies[i].x, enemies[i].y, 80, 120);
        }
        if(enemies[i].img === 4) {
            draw.drawImage(bearImg, enemies[i].x, enemies[i].y, 120, 120);
        }
    }

}

function drawHitAnimation() {
    for(i = 0; i < hitObjects.length; i ++){
        if(hitObjects[i].time > 9){
            hitObjects.splice(i,1);
            continue;
        }
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


        if(winFireWorks[i].type === 1){
            if(winFireWorks[i].time >= 40){
                winFireWorks.splice(i,1);
                continue;
            }
            draw.drawImage(firework1Images[winFireWorks[i].time],winFireWorks[i].x,winFireWorks[i].y,500,300);
        }
        if(winFireWorks[i].type === 2){
            if(winFireWorks[i].time >= 44){
                winFireWorks.splice(i,1);
                continue;
            }
            draw.drawImage(firework2Images[winFireWorks[i].time],winFireWorks[i].x + 130,winFireWorks[i].y + 60,500,500);
        }
        winFireWorks[i].temp++;
        if(winFireWorks[i].temp > 3){
            winFireWorks[i].time++;
        }
    }
}

function drawEnemyBullets() {
    for(i = 0; i < enemiesBullets.length; i++){
        if(enemiesBullets[i].img === 2){
            draw.drawImage(bossBulletImages[enemiesBullets[i].type], enemiesBullets[i].x ,enemiesBullets[i].y, 30,30);
            bossBulletImages[3]++
        }

        if(enemiesBullets[i].img === 1){
            draw.drawImage(enemyBulletImages[enemiesBullets[i].img - 1], enemiesBullets[i].x ,enemiesBullets[i].y, 30,30);
        }

        if(enemiesBullets[i].img === 3){
            draw.drawImage(metheorImages[enemiesBullets[i].time % 190],enemiesBullets[i].x,enemiesBullets[i].y,450,450);
            enemiesBullets[i].time++;
        }

        enemiesBullets[i].x -= enemiesBullets[i].dx + 0.7;
        enemiesBullets[i].y -= enemiesBullets[i].dy + 0.7;
        if(enemiesBullets[i].x < 0 || enemiesBullets[i].x > canvasWidth
            || enemiesBullets[i].y < -300 || enemiesBullets[i].y > canvasHeight){
            enemiesBullets.splice(i, 1);
        }
    }
}

function drawTutorial() {
    if(round === 1 && playerX < 300){
        draw.drawImage(tutoImages[0], playerX - 150, playerY - 200, 200, 160);
    }
    if(round === 1 && playerX >= 300 && playerX < 800){
        draw.drawImage(tutoImages[1], playerX - 150, playerY - 200, 200, 160);
    }
    if(round === 1 && playerX >= 800 && playerX < 1100){
        draw.drawImage(tutoImages[2], playerX - 150, playerY - 200, 200, 160);
    }
    if(round === 1 && playerX >= 1100 && win !== 1){
        draw.drawImage(tutoImages[3], playerX - 150, playerY - 200, 200, 160);
    }
    if(round === 2 && playerX >= 315 && playerX < 800 && inventory[0] > 2 && canvas.style.cursor !== "url(\"resources/cursor/platform1.cur\"), auto"){
        draw.drawImage(tutoImages[4], 80, 88, 200, 160);
    } else if(round === 2 && playerX >= 315 && playerX < 800 && inventory[0] > 2){
        draw.drawImage(tutoImages[4], 635, 724, 200, 160);
    }

    if(round === 0){
        return;
    }
    draw.drawImage(tutoImages[5],410, 10, 100, 100);
}

function drawIntro() {
    draw.drawImage(introImg,331,86,800,500);
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
    blockPlaceMusic.play().then(function() {
        console.log("블록설치음악 잘나옴");
    }).catch(function(error) {
        console.log("블록설치음악 안나옴 : " + error);
    });
    canvas.style.cursor = "url(''),auto";
    platformType = 0;
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
        if(platforms[i].type === 5){

            draw.drawImage(platformImages[platforms[i].type],platforms[i].x,platforms[i].y,platforms[i].width,platforms[i].height);
        }
        if(platforms[i].type === 8){
            draw.drawImage(homeImg,platforms[i].x,platforms[i].y,platforms[i].width,platforms[i].height);
        }

        if(platforms[i].type === 9){

            draw.drawImage(carrotImages[Math.floor(globalTime/2) % 13],platforms[i].x,platforms[i].y,platforms[i].width + 5,platforms[i].height + 5);
        }
    }
}

function collision(){
    for(var i in platforms) {
        //collision form top
        if(platforms[i].x - 5 <= playerX && playerX <= platforms[i].x + 35 && platforms[i].y - 20 <= playerY && playerY <= platforms[i].y + 10){
            if(platforms[i].type === 2 && vecJump < 5){
                jumpPlatform();
                break;
            }
            if(platforms[i].type === 3){
                breakPlatform();
                glassBreak();
                platforms.splice(i,1);
                break;
            }
            if(platforms[i].type === 5){
                setRound();
                break;
            }
            if(winLogic(i))break;
            console.log("collision top","DY : "+playerDy,"time : "+time,"vecJump : "+vecJump);
            playerY = platforms[i].y - 20;
            time = 0;
        }
        //collision from left
        if(platforms[i].x - 20 <= playerX && playerX <= platforms[i].x + 10  && platforms[i].y <= playerY && playerY <= platforms[i].y + 30){
            if(winLogic(i))break;
            console.log("collision left");
            playerX = platforms[i].x - 20;
        }
        //collision from right
        if(platforms[i].x + 10  <= playerX && playerX <= platforms[i].x + 50 && platforms[i].y <= playerY && playerY <= platforms[i].y + 30){
            if(winLogic(i))break;
            console.log("collision right");
            playerX = platforms[i].x + 50;
        }
        //collision form bottom
        if(platforms[i].x - 5 <= playerX && playerX <= platforms[i].x + 35 && platforms[i].y + 10 <= playerY && playerY <= platforms[i].y + 50){
            if(winLogic(i))break;
            console.log("collision bottom","DY : "+playerDy,"time : "+time,"vecJump : "+vecJump);
            playerY = platforms[i].y + 50;
            vecJump = 0;
        }
        if(platforms[i].type === 8 && playerX > 1130){
            gameEnd();
        }
    }

    if(playerY > canvasHeight - 20){
        playerY = canvasHeight - 20;
    }
}

function jumpPlatform(){
    bounceMusics[bounceMusics[3]%3].play().then(function() {
        console.log("바운스음악 잘나옴");
        bounceMusics[3]++;
    }).catch(function(error) {
        console.log("바운스음악 안나옴 : " + error);
    });
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
        winMusic.play().then(function() {
            console.log("승리음악 잘나옴");
        }).catch(function(error) {
            console.log("승리음악 안나옴 : " + error);
        });
        winFireWorks.push({"x":platforms[i].x - 250, "y":platforms[i].y - 150, "time":0, "temp":0, "type":1});
        platforms.splice(i,1);
        win = 1;
        return true;
    }

    return false;
}

function showWin() {

    // draw.fillStyle = "#ffffff";
    // draw.font = '70px Arial';
    // draw.textBaseline = "top";
    if(round === 0){
        drawIntro();
    } else {
        drawPopup();
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
    enemiesBullets = [];
    bullets = [];
    playerX = 50;
    playerY = canvasHeight * 0.95;
    console.log("라운드 : " + round + ", win = " + win);

    if(round === 1){

        playerX = 150;
        platformPush(410,806);
        platformPush(440,806);
        platformPush(575,715);
        platformPush(605,715);
        platformPush(779,615);
        platformPush(809,615);
        platformPush(957,525);
        platformPush(987,525);
        platformPush(1155,420);
        platformPush(1185,420);
        platformPush(1300,288);
        platformPush(1330,288);
        platformPushType(1298,160,9);
        enemies.push({"img":3,"x":1000, "y":300, "dx":0, "dy":0, "time":0, "frame":17, "hp":10});

    }

    if(round === 2){
        inventory = [3,0,0];
        platformPush(410,806);
        platformPush(440,806);
        platformPush(779,615);
        platformPush(809,615);
        platformPush(957,525);
        platformPush(987,525);
        platformPush(1300,288);
        enemies.push({"img":1,"x":1000, "y":300, "dx":0, "dy":0, "time":0, "frame":48, "hp":10});
        platformPushType(1298,160,9);
    }

    if(round === 3){
        inventory = [2,2,10];
        for(i = 300; i < canvasHeight; i = i + 30){
            platformPush(500,i);
            platformPush(530,i);
        }
        for (i = 0; i < 700; i = i + 30){
            platformPush(1000,i);
        }
        for (i = 510; i < canvasHeight; i = i + 30){
            platformPushType(970, i, 3);
        }

        platformPushType(1298,160,9);
        enemies.push({"img":1,"x":561, "y":236, "dx":0, "dy":0, "time":0, "frame":48, "hp":20});
        enemies.push({"img":1,"x":1000, "y":733, "dx":0, "dy":0, "time":0, "frame":48, "hp":20});
        enemies.push({"img":3,"x":384, "y":625, "dx":0, "dy":0, "time":0, "frame":17, "hp":10});
    }

    if(round === 4){
        inventory = [2,1,0];
        for(i = 250, j = 250; i < canvasWidth; i = i + 30, j = j + 170){
            platformPushType(i,canvasHeight - 30, 5);
            platformPush(j, canvasHeight - 90);
        }
        platformPushType(1440,717,2);
        for (i = 0; i < 1300; i = i + 30){
            platformPushType(i,580,5);
        }
        for (i = 0; i < 1450; i = i + 90){
            platformPushType(i,510,3);
        }
        for(i = 250, j = 250; i < canvasWidth; i = i + 30, j = j + 170){
            platformPushType(i,300, 5);
            platformPush(j, 240);
        }

        enemies.push({"img":1,"x":1337, "y":60, "dx":0, "dy":0, "time":0, "frame":48, "hp":20});
        enemies.push({"img":1,"x":1337, "y":672, "dx":0, "dy":0, "time":0, "frame":48, "hp":20});
        enemies.push({"img":4,"x":107, "y":310, "dx":0, "dy":0, "time":0, "frame":48, "hp":20});
        platformPush(106, 429);
        platformPush(136, 429);
        platformPush(166, 429);
        platformPush(196, 429);
        platformPushType(1450,80,9);
    }

    if(round === 5) {
        inventory = [5,0,0];
        enemies.push({"img":2,"x":1000, "y":300, "dx":0, "dy":0, "time":0, "frame":86, "hp": 100});
        platformPushType(1117,454,9);
    }

    if(round === 6){
        inventory = [0,0,0];
        platformPushSize(1044,653,285,285,8);
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

        throwMusics[globalTime % 10].play().then(function() {
            console.log("던지기음악 잘나옴");
        }).catch(function(error) {
            console.log("던지기음악 안나옴 : " + error);
        });

        console.log("playerBulletsPush");
        var bulletPosX = (x-playerX);
        if(bulletPosX >= 300){
            bulletPosX = 300;
        }
        if(bulletPosX <= -300){
            bulletPosX = -300;
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
            if(enemies[j].img === 2){
                winFireWorks.push({"x":enemies[j].x - 250, "y":enemies[j].y - 150, "time":0, "temp":0, "type":2});
            }
            enemies.splice(j,1);
            continue;
        }
        for(i = 0; i < bullets.length; i++){
            if(enemies[j].img === 2){
                if(bullets[i].x <= enemies[j].x + 200 && bullets[i].x >= enemies[j].x + 50 &&
                    bullets[i].y <= enemies[j].y + 200 && bullets[i].y >= enemies[j].y + 100){
                    enemyHitAnimation(bullets[i].x,bullets[i].y);
                    enemyHitMusic();
                    bullets.splice(i,1);
                    enemies[j].hp--;
                    continue;
                }
            }
            if(bullets[i].x <= enemies[j].x + 120 && bullets[i].x >= enemies[j].x &&
                bullets[i].y <= enemies[j].y + 130 && bullets[i].y >= enemies[j].y){
                enemyHitAnimation(bullets[i].x,bullets[i].y);
                enemyHitMusic();
                bullets.splice(i,1);
                enemies[j].hp--;
            }
        }
    }
}

function enemyHitAnimation(x,y){
    hitObjects.push({"x":x, "y":y, "time":0, "temp":0});
}

function enemyHitMusic() {
    hitMusics[hitMusics[15]%15].play().then(function() {
        hitMusics[15]++;
        console.log("hit 음악 잘나옴");
    }).catch(function(error) {
        console.log("hit 음악 안나옴 : " + error);
    });
}

function hitPlayer(){
    for(j = 0; j < enemies.length; j++){
        if(playerX <= enemies[j].x + 120 && playerX >= enemies[j].x &&
            playerY <= enemies[j].y + 130 && playerY >= enemies[j].y){
            setRound();
            return;
        }
    }

    for(i = 0; i < enemiesBullets.length; i++){

        if(enemiesBullets[i].img === 3){
            if(enemiesBullets[i].x + 166 < playerX && enemiesBullets[i].x + 333 > playerX &&
                enemiesBullets[i].y + 250 < playerY && enemiesBullets[i].y + 350 > playerY){
                setRound();
                return;
            }
        }


       if(enemiesBullets[i].x < playerX + 10 && enemiesBullets[i].x > playerX - 20 &&
           enemiesBullets[i].y > playerY - 40 && enemiesBullets[i].y < playerY + 30){
            setRound();
            return;
        }
    }
}

function enemyAttack(){
    for(i = 0; i < enemies.length; i++){
        if(((enemies[i].time % 400) === Math.floor(Math.random()*300)+100) && (enemies[i].img === 1)){
            console.log("fire");
            enemiesBullets.push({"img":1, "x":enemies[i].x, "y":enemies[i].y,
                "dx":(enemies[i].x - playerX) / 100, "dy":(enemies[i].y - playerY) / 80});
        }
        if(enemies[i].img === 2 && enemies[i].time % 7 === 0){
            enemiesBullets.push({"img":2, "x":enemies[i].x + 35, "y":enemies[i].y + 130,
                "dx": Math.random()*(5) - 2, "dy": Math.random()*-5 + 2, "type": Math.floor(Math.random()*3)});
        }
        if(enemies[i].img === 2 && enemies[i].time % 1000 === 0){
            enemiesBullets.push({"img":3, "x":Math.random()*800 + 500, "y": -300,
                "dx": Math.random() - 1.2, "dy": Math.random()*(-1) - 1, "time": 0});
            console.log("메테오소환");
        }
    }
}

function bulletConflict(){
    for(i = 0; i < bullets.length; i++){
        for(j = 0; j < enemiesBullets.length; j++){
            if(enemiesBullets[j].x < bullets[i].x + 10 && enemiesBullets[j].x > bullets[i].x - 20 &&
                enemiesBullets[j].y > bullets[i].y - 40 && enemiesBullets[j].y < bullets[i].y + 30 && enemiesBullets[j].img !== 3){
                bullets.splice(i,1);
                enemiesBullets.splice(j,1);
                console.log("conflict");
                break;
            }
        }
    }
}

function glassBreak(){
    glassBreakMusics[glassBreakMusics[6] % 6].play().then(function() {
        glassBreakMusics[6]++;
        console.log("glass Break 음악 잘나옴");
    }).catch(function(error) {
        console.log("glass Break 음악 안나옴 : " + error);
    });
}

function playBackgroundMusic(){
    if(backgroundMusic.paused && round < 5){

        if(!bossBackgroundMusic.paused){
            bossBackgroundMusic.pause();
        }

        backgroundMusic.play().then(function() {
            console.log("배경음악 잘나옴");
        }).catch(function(error) {
            console.log("배경음악 안나옴 : " + error);
        });
    }

    if(round === 5 && bossBackgroundMusic.paused){
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        bossBackgroundMusic.play().then(function() {
            console.log("보스배경음악 잘나옴");
        }).catch(function(error) {
            console.log("보스음악 안나옴 : " + error);
        });
    }

    if(endBackgroundMusic.paused && round === 6){
        if(!bossBackgroundMusic.paused){
            bossBackgroundMusic.pause();
        }
        endBackgroundMusic.play().then(function() {
            console.log("엔딩배경음악 잘나옴");
        }).catch(function(error) {
            console.log("엔딩배경음악 안나옴 : " + error);
        });

    }

}

function gameEnd(){
    playerX = -100;
    draw.drawImage(endImg,0,0,canvasWidth,canvasHeight);
    clearInterval(mainSchedule);
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
            jumpMusic.play().then(function() {
                console.log("점프음악 잘나옴");
            }).catch(function(error) {
                console.log("점프음악 안나옴 : " + error);
            });
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
    if(arg.clientX >= 509 && arg.clientX <= 968 && arg.clientY >= 438 && arg.clientY <= 517 && round === 0){
        round++;
        win = 0;
        setRound();
    }
    if(gamePause === 1 || round === 0){
        return;
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
        platformType = 0;
        return;
    }

    if(canvas.style.cursor !== "url(\"\"), auto"){
        console.log(canvas.style.cursor);
        addPlatform(arg.clientX,arg.clientY);
    }
}, false);

canvas.addEventListener('contextmenu',(arg)=>{
    console.log("rightClick");
    arg.preventDefault();
    if(gamePause === 1){
        return;
    }
    console.log("click X:" + arg.clientX,"click Y:" + arg.clientY);

    //deletePlatform(arg.clientX, arg.clientY);
}, false);

canvas.addEventListener('wheel',(arg)=>{
    playerShot(arg.x,arg.y);
    arg.preventDefault();
});