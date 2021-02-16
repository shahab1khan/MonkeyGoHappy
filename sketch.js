
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
 
  monkey_collided = loadAnimation("sprite_0.png")
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2
  console.log(ground.x)
  
  monkey.addAnimation("collided", monkey_collided);
  
  bananasGroup = createGroup();
  rocksGroup = createGroup();
  
  var survivalTime = 0;
  
}


function draw() {
  background("lightblue")
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Surival Time: " + survivalTime, 135, 50)
  
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
  }
  
  if(rocksGroup.isTouching(monkey)) {
    monkey.changeAnimation("collided", monkey_collided);
    
    rocksGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0); 
    
    ground.velocityX = 0;
    
    rocksGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    
  }
  
  monkey.velocityY = monkey.velocityY + 1.2
  monkey.collide(ground)
  
  bananas();
  rocks();

  drawSprites();
}

function rocks() {
  if(frameCount % 300 === 0) {
    var rock = createSprite(500,317,20,20);
    rock.addImage(rockImage);
    rock.scale = 0.15
    rock.velocityX = -3
    
    rock.lifetime = 220
    
    rocksGroup.add(rock)
  }
}

function bananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 220;
    
    bananasGroup.add(banana);
  }
}
