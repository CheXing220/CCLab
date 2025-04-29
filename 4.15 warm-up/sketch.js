let balls = [];


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // let b = new Ball(100, 250);
  // balls.push(b)
}

function draw() {
  background(20, 20, 50);

  
  let b = new Ball(100, 250);
  balls.push(b)
  
  // display all balls
  for(let i = 0; i < balls.length; i++){
    balls[i].update();
    balls[i].display();
  }

  // text on canvas
  fill(255);
  textSize(20)
  text("number of balls in array: " + balls.length, 20, 40)

  for (let i=balls.length-1; i>=0; i--){
    if(balls[i].onCanvas = false){
      balls.splice (i,1);
    }
  }
}

class Ball{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.xSpeed = random(1, 3);
    this.ySpeed = random(-1, 1);
    this.size = random(20, 50)
    this.onCanvas = true;
  }
  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.x > width){
      this.onCanvas = false;
   }
  }
  display(){
    push();
    translate(this.x, this.y);
    fill(255, 200);
    noStroke();
    circle(0, 0, this.size)
    pop();
  }

}