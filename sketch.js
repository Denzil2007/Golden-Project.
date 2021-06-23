var canvas;
var alien,alienImg;
var asteroid,asteroidImg;
var drink,drinkImg;
var bg,bgImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround;
var asteroidsGroup;
var drinksGroup;
var gameOver, restart;

function preload(){
    alienImg = loadAnimation("images/Alien.png");
    asteroidImg = loadImage("images/Asteroid.png");
    drinkImg = loadImage("images/Drink.png")
    bgImg = loadImage("images/Bg.jpg")
    gameOverImg = loadImage("images/gameOver.png");
    restartImg = loadImage("images/restart.png");
}

function setup(){
    canvas = createCanvas(1200,600);    
    
    bg = createSprite(600,300,1200,600);
    bg.addImage("bg",bgImg);
    bg.scale = 1.5;
    bg.x = bg.width /2;
    bg.velocityX = -(6 + 3*score/100);
    
    alien = createSprite(150,450);
    alien.addAnimation("alien",alienImg);
    alien.scale = 0.4;
    alien.setCollider("circle",0,0,175);
    alien.debug = true;

    gameOver = createSprite(600,200);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(600,300);
    restart.addImage(restartImg);
  
    gameOver.scale = 1;
    restart.scale = 1;

    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround = createSprite(600,500,1200,10);
    invisibleGround.visible = false;    

    asteroidsGroup = new Group();
    drinksGroup = new Group();
}

function draw() {
    background(0);
    if (gameState===PLAY){

        spawnAsteroid();
        spawnDrink();

        if(drinksGroup.isTouching(alien)){
            score = score + 100;
            drinksGroup.destroyEach();
        }

        bg.velocityX = -(6 + 3*score/100);

        if(keyDown("up")) {
            alien.y = alien.y -15;
        }
    
        if(keyDown("down")) {
            alien.y = alien.y +10;
        }

        if(keyDown("up")) {
            alien.y = alien.y -15;
        }
    
        if(keyDown("down")) {
            alien.y = alien.y +10;
        }

        alien.velocityY = alien.velocityY + 0.8
    
        if (bg.x < 500){
            bg.x = bg.width/2;
        }
    
        alien.collide(invisibleGround);

        if(asteroidsGroup.isTouching(alien)){
            gameState = END;
        }
    }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
    
        //set velcity of each game object to 0
        bg.velocityX = 0;
        alien.velocityY = 0;
        asteroidsGroup.setVelocityXEach(0);
        drinksGroup.setVelocityXEach(0);
        
        //set lifetime of the game objects so that they are never destroyed
        asteroidsGroup.setLifetimeEach(-1);
        drinksGroup.setLifetimeEach(-1);

        if(mousePressedOver(restart)) {
        reset();
        }
    }
    
    drawSprites();
    textSize(35);
    text("Score : " + score , 500,50);
}

    

function spawnAsteroid(){
    if(frameCount % 250 === 0){
        asteroid = createSprite(1150,510);
        asteroid.addImage("asteroid",asteroidImg)
        asteroid.setCollider("circle",0,0,175);
        asteroid.debug = true;
        asteroid.scale = 0.4;
        asteroid.velocityX = -3;
        asteroidsGroup.add(asteroid);
    }
}

function spawnDrink(){
    if(frameCount % 300 === 0){
        drink = createSprite(1150,300);
        drink.addImage("drink",drinkImg)
        drink.scale = 0.2;
        drink.velocityX = -3;
        drinksGroup.add(drink);
    }
}
    
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    asteroidsGroup.destroyEach();
    drinksGroup.destroyEach();

    score = 0;
    
  }