var JOGAR=1; 
var gameOver,gameOverImg,reiniciar,reiniciarImg
var ENCERRAR=0; 
var estadoJogo=JOGAR;
var gObstaculos,gNuvens;
var trex, trexCorrendo, solo, soloImg, soloFalso,nuvemImg,pontuacao,o1,o2,o3,o4,o5,o6;
function preload() {
  trexCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloImg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  reiniciarImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200)
  pontuacao = 0;
  trex = createSprite(50, 150, 20, 50);
  trex.addAnimation("correndo", trexCorrendo); 
  trex.scale = 0.5;
  trex.debug = true;
  trex.setCollider("circle", 0, 0, 40);


  solo = createSprite(300, 180, 600, 20);
  solo.addImage(soloImg);

soloFalso = createSprite(200,190,600,10);
soloFalso.visible = false 
var x=Math.round(random(1,100));
console.log(x);
gObstaculos = new Group();
gNuvens = new Group();

gameOver = createSprite(300,50);
gameOver.addImage(gameOverImg);
gameOver.visible = false;
gameOver.scale = 0.5;

reiniciar = createSprite(300,100);
reiniciar.addImage(reiniciarImg);
reiniciar.visible = false;
reiniciar.scale = 0.5;
}

function draw() {
  background("white"); 
  if (estadoJogo===JOGAR){
    solo.velocityX = -2;
    pontuacao = pontuacao +frameCount/200;
    if (solo.x < 0) {
      solo.x = solo.width / 2;
    }
    if (keyDown("space")&& trex.y >=150) { 
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;
    gerarNuvens();
  gerarObstaculos();
  
  if (gObstaculos.isTouching(trex)){
    estadoJogo = ENCERRAR;
  }
  }
  else if (estadoJogo===ENCERRAR){
    gObstaculos.setVelocityXEach(0);
    gNuvens.setVelocityXEach(0);
    gameOver.visible=true;
    reiniciar.visible=true;
    solo.velocityX = 0;
    trex.velocityY = 0;
    gNuvens.setLifetimeEach(-1);
    gObstaculos.setLifetimeEach(-1);
  }
  
  text("Pontuação: "+Math.round(pontuacao),500,50);
  
  

 


  trex.collide(soloFalso);
  
  drawSprites();
}
function gerarNuvens(){
  if(frameCount%60===0){
    var nuvem = createSprite(600,100,40,40);
    nuvem.velocityX = -3;
    nuvem.addImage(nuvemImg);
    nuvem.scale = 0.4;
    nuvem.y = Math.round(random(10,100));
    nuvem.depth = trex.depth;
    trex.depth++;
    nuvem.lifetime = 200;
    gNuvens.add(nuvem);
  }
}
function gerarObstaculos(){
  if(frameCount%60===0){
    var obstaculo = createSprite(600,165,10,40);
    obstaculo.velocityX = -6;
    var x = Math.round(random(1,6));
    switch (x) {
      case 1:
        obstaculo.addImage(o1);
        break;
      case 2:
          obstaculo.addImage(o2);
        break;
      case 3:
          obstaculo.addImage(o3);
        break;
      case 4:
          obstaculo.addImage(o4);
        break;
      case 5:
          obstaculo.addImage(o5);
        break;
      case 6:
          obstaculo.addImage(o6);
        break;
      default:
        break;
    }
    gObstaculos.add(obstaculo);

obstaculo.scale = 0.5 ; 
obstaculo.lifetime = 100;
  }  
}