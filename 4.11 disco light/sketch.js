let disco = [];
let numDisco = 1;  
let backgroundHUE;
let kick;
let music;



function preload(){
  kick = loadSound("kick.mp3")
  music=loadSound ("Bad Boys Blue - You're a Woman.mp3")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  music.play()
 

  for (let i = 0; i < numDisco; i++) {
    disco.push(new Disco(width / 2, height / 2));
  }

  colorMode(HSB, 255, 255, 255, 255);
  backgroundHUE = random(0, 255);
}

function draw() {

  background(0)


  for (let i = 0; i < disco.length; i++) {
    disco[i].update();
    disco[i].display();
  }

  text (disco.length,20,20)
  fill(200,100,200)
  text ("Press the mouse with the beat and go disco.",20,50)

  DiscoBall (400,150,80)
}

class Disco {
  constructor(startX, startY) {
    this.x = startX;
    this.y = 400;
    this.size = 50;
    this.x1 = 300
    this.y1 = 200                                 

    this.speedX = random(-10,10);
    this.speedY = random(-1, -3);

    this.speedx1 = random(-100,150)
    this.speedy1 = random(-100,100)

  
    let shine = random(87,255);
    this.color = color(shine,shine-100,shine);

    this.angle = 0;
    this.rotationSpeed = random(0.02, 0.05);
  }

  update() {
  this.x += this.speedX;
  if(this.x <= 100 || this.x >=680){
    this.speedX = - this.speedX
    this.angle += this.rotationSpeed;
    this.x1 += this.speedx1
    this.y1 += this.speedy1
  }
  }

  display() {
  push();
  translate(this.x, this.y);

  fill(this.color);
  noStroke();
  ellipse(0, 0, this.size, 10);

  rotate(this.angle);
  ellipse(0, 0, this.size, 10);
  pop();

  push()
  translate(this.x1,this.y1)
  noStroke()
  let shine = random(87,255);
  fill(shine,shine-100,shine,100)
  circle(0,0,100)
  pop()

  push()
  translate(this.x1,this.y1)
  noStroke()
  fill(0)
  circle(0,0,25)
  pop()
  }
}

function DiscoBall (x,y,r){
  push()
  fill(255)
  rect(400,2,4,200)
  pop()
  let blinkSize = 10
  fill(100,300,100)
  ellipse (x,y,2*r)

  for (let i=0; i<2*r/blinkSize; i++){
    for (let j = 0; j< 2*r/blinkSize; j++){
      let x1 = x- r + i*blinkSize
      let y1 = y- r + j*blinkSize
      let d = dist(x1 + blinkSize/2, y1 + blinkSize/2, x, y);
       if (d<r){
      let shine = random(87,255);
      fill(shine,shine-100,shine)
      rect (x1,y1,blinkSize - 1, blinkSize - 1)
    }
  }
  }
  
}

function mousePressed(){
  for (let i = 0; i < numDisco; i++) {
    disco.push(new Disco(width / 2, height / 2));
  }
  kick.play()
}

