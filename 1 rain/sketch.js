let raindrops = [];

let handlePressed = false;

let openPercent = 0;

let img;

let openumbrella;

let instruction;

let closer;

function preload(){
  img = loadImage("assets/man.png")
  openumbrella = loadSound("assets/sounds/umbrella-43325.mp3")
  instruction = loadSound("assets/sounds/insturction.m4a")
  closer = loadSound("assets/sounds/closer.m4a")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < 200; i++) {
    raindrops.push(new Raindrop());
  }

  if (!instruction.isPlaying()) {
    instruction.play(); 
  }
}

function draw() {
  background(30);
  for (let drop of raindrops) {
    drop.update();
    drop.display();
  }
  umbrella();
  // image(img,0,0)

  if (handlePressed) {
    reddot();
    image(img,270,180,img.width / 3.5, img.height / 4)
  }
  
}

class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-500, 0);
    this.len = random(10, 20);
    this.speed = random(4, 10);
    this.thickness = random(1, 2.5);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.x = random(width);
      this.y = random(-500, 0);
      this.len = random(10, 20);
      this.speed = random(4, 10);
      this.thickness = random(1, 2.5);
    }
  }

  display() {
    stroke(50, 100, 200);
    strokeWeight(this.thickness);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}

function umbrella(){
  if (handlePressed) {
    openPercent += 0.05;
    openPercent = constrain(openPercent, 0, 1);
  }
  

  push()
  fill(255)
  noStroke()
  let lX = map(openPercent,0,1,350,280) ;//350
  let lY = map(openPercent,0,1,280,220);//280;
  let rX = map(openPercent,0,1,450,520);//450;
  let rY = map(openPercent,0,1,280,220);//280;
  let mY = map(openPercent,0,1,250,220);// 250;
  triangle(lX,lY,400,150,400,mY)
  triangle(400,150,rX,rY,400,mY)
  circle(400,350,10)
  pop()

  push()
  fill(240,240,240)
  stroke(240,240,240);
  strokeWeight(3)
  line(400,200,400,350)
  pop()
  
}

function reddot(){
  noStroke()
  fill(random(0,255),0,0)
  circle(480,240,5)
  push()
  fill(255,0,0)
  textFont('Courier New');
  textSize(20)
  text("GET CLOSER",490,245)
  pop()
}

function mousePressed(){
let d= dist(mouseX,mouseY,400,350);
if(d <=5){
  handlePressed = true
  reddot()
  image(img,0,0)
  if (!openumbrella.isPlaying()) {
    openumbrella.play(); 
  }
  if (!closer.isPlaying()) {
    closer.play(); 
  }
}
let d1= dist(mouseX,mouseY,480,240);
if(d1 <=5){
  window.location.href = "../1 closerain"
}
}





//the image doesn't appear