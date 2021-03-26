const Engine = Matter.Engine,
 World = Matter.World,
 Events = Matter.Events,
 Bodies = Matter.Bodies;

var PLAY =1;
var END =0; 
var plinkos = [];
var divisions = [];
var particle;
var divisionHeight=300;
var score,turn;
var gamestate = PLAY;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,375));
    }
  
    score =0;  
    turn = 0;
    
}
 


function draw() {
  background("black");
  textSize(20)
  Engine.update(engine);

   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

    ground.display()
    text("Score : "+score,20,30);
    text("500",26,527);
    text("500",103,527);
    text("500",180,527);
    text("500",263,527);
    text("100",344,527);
    text("100",422,527);
    text("100",502,527);
    text("200",584,527);
    text("200",663,527);
    text("200",744,527);

    if(turn===6){
      gamestate=END;
    }    

    if (particle && gamestate!==END){
      particle.display();

      if (particle.body.position.y>760){
        if(particle.body.position.x<320 && particle.body.position.x>0){
          score = score+500;
        }
         else
             {
              if(particle.body.position.x<620 && particle.body.position.x>321){
                score = score+100;
              } else
                    {
                      if(particle.body.position.x<800 && particle.body.position.x>621){
                        score = score+200;
                      }
                    }
             }
             particle = null;
      }
    }
    
    if(gamestate===END){
      textSize(100);
      text("Game Over",150,250)
    }
}

function mousePressed(){
  if (gamestate!==END ){
    if(particle===undefined || particle===null){
    particle = new Particle(mouseX,10,10);
    turn = turn+1;
  }}
}