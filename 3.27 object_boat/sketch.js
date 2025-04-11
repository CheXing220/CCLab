function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(30,50,240);
  boat1.display();
}

class Boat1{
  constructor(){
    this.x = 100;
    this.y = 100;
    this.scaleFactor = 1;
  }
  display(){
    push();
    translate (this.x, this.y);

    noStroke();
    

    arc (0,-20,150,90,0,PI);
    push();
    translate (0,-50);
    triangle(0,-30,20,0,0,30)

    fill("green")
    circle(0,0,5)
    pop();

    fill("red")
    cicle(0,0,5)
    pop();
  }
}