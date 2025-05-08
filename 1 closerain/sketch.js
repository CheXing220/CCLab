let raindrops = [];

let img;

let voice11;

function preload(){
  img = loadImage("assets/man.png")
  voice11 = loadSound("assets/sounds/voice11.m4a")

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < 200; i++) {
    raindrops.push(new Raindrop());
  }

  if (!voice11.isPlaying()) {
    voice11.play(); 
  }



}

function draw() {
background(50);
for (let drop of raindrops) {
  drop.update();
  drop.display();
}
image(img,-800,-200,img.width *2,img.height* 2 )
push()
fill("white")
noStroke()
triangle(0,200,0,0,700,0)
pop()
push()
fill(240,240,240)
strokeWeight(1)
quad(100,-10,120,-20,180,500,160,510)
pop()
push()
fill(255)
textFont('Courier New');
textSize(30)
text("I need space.",450,200)
pop()
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
      this.speed = random(4, 6);
      this.thickness = random(1, 2.5);
    }
  }

  display() {
    stroke(50, 100, 200);
    strokeWeight(this.thickness);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}

function keyPressed() {
  if (key === ' ') { 
    window.location.href = "../1 silence";}
  }