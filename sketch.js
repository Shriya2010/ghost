var tower,towerImg,  ghost,ghostImg,  climber,climberImg,
door,doorImg, climberGrp, doorGrp,
invisibleBlock,invisibleBlockGrp, gameState = "play"


function preload (){
  towerImg = loadImage ("tower.png")
  ghostImg  = loadImage ("ghost-standing.png")
  climberImg= loadImage  ("climber.png")
  doorImg  = loadImage  ("door.png")
} 

function setup (){
 createCanvas (600,600)
 tower = createSprite (300,100)
 tower.addImage (towerImg)
 tower.velocityY = 1
 ghost  = createSprite (300,300)
 ghost .addImage (ghostImg)
 ghost.scale = 0.3
 doorGrp = new Group ();
 climberGrp = new Group ();
 invisibleBlockGrp = new Group ();
 
}


function draw (){
  background (0);
  if(gameState === "play"){
  if(tower.y > 600){
    tower.y = 300
  }
  
  if(keyDown("space")){
    ghost.velocityY = -10
  }
  
  if(keyDown("right")){
    ghost.x += 5
  }
  
    if(keyDown("left")){
    ghost.x -= 5
  }
  
  ghost.velocityY += 0.5
  if(ghost.isTouching(climberGrp)){
    ghost.velocityY = 0
  }
  
  if(ghost.isTouching(invisibleBlockGrp)||ghost.y > 600){
    gameState = "end"
    ghost.destroy();
 }
  
  spawnDoor();
  
  drawSprites();
}

if(gameState === "end"){
fill("yellow")
  textSize (30)
text ("gameOver",250,300)
}
}
function spawnDoor (){
if(frameCount % 240 === 0) {
door = createSprite (200,-50)
door .addImage (doorImg) 
door.velocityY = 1
door.x = Math.round (random(50,500))
door.lifetime = 600
doorGrp.add (door)
ghost.depth = door.depth+1
  
climber = createSprite (200,10)
climber .addImage (climberImg) 
climber.velocityY = 1
climber.x = Math.round (random(50,500))
climber.lifetime = 600
climberGrp.add (climber)
climber.x = door.x
  
invisibleBlock = createSprite (200,15)
invisibleBlock.velocityY = 1
invisibleBlock.x = Math.round (random(50,500))
invisibleBlock.lifetime = 600
invisibleBlockGrp.add (invisibleBlock)
invisibleBlock.x = climber.x
invisibleBlock.width = climber.width
invisibleBlock.height = 2
invisibleBlock.debug = true

} 
}