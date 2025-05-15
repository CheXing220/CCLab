
let stage = 1; 


let raindrops = [];
let handlePressed = false;
let openPercent = 0;
let imgStage1, openumbrella, instruction, closer;


let imgStage2, voice11;


let drop, rain;
let tY = -250;
let bY = 500;
let isEyeClosing = true;
let eyeClosed = false;
let vision;

function preload() {

  imgStage1 = loadImage("assets/man.png");
  openumbrella = loadSound("assets/sounds/umbrella-43325.mp3");
  instruction = loadSound("assets/sounds/insturction.m4a");
  closer = loadSound("assets/sounds/closer.m4a");


  imgStage2 = loadImage("assets/man.png");
  voice11 = loadSound("assets/sounds/voice11.m4a");


  drop = loadSound("assets/sounds/dripping-water-nature-sounds-8050.mp3");
  rain = loadSound("assets/sounds/rain-echo-roof-resonance-in-the-woods-335718.mp3");
  vision = loadImage("assets/stage 2.png")
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
  if (stage === 1) {
    drawStage1();
  } else if (stage === 2) {
    drawStage2();
  } else if (stage === 3) {
    drawStage3();
  }
}


function drawStage1() {
  background(30);
  for (let drop of raindrops) {
    drop.update();
    drop.display();
  }
  umbrella();
  if (handlePressed) {
    reddot();
    image(imgStage1, 270, 180, imgStage1.width / 3.5, imgStage1.height / 4);
  }
}

function umbrella() {
  if (handlePressed) {
    openPercent += 0.05;
    openPercent = constrain(openPercent, 0, 1);
  }

  push();
  fill(255);
  noStroke();
  let lX = map(openPercent, 0, 1, 350, 280);
  let lY = map(openPercent, 0, 1, 280, 220);
  let rX = map(openPercent, 0, 1, 450, 520);
  let rY = map(openPercent, 0, 1, 280, 220);
  let mY = map(openPercent, 0, 1, 250, 220);
  triangle(lX, lY, 400, 150, 400, mY);
  triangle(400, 150, rX, rY, 400, mY);
  circle(400, 350, 10);
  pop();

  push();
  fill(240);
  stroke(240);
  strokeWeight(3);
  line(400, 200, 400, 350);
  pop();
}

function reddot() {
  noStroke();
  fill(random(0, 255), 0, 0);
  circle(480, 240, 5);
  push();
  fill(255, 0, 0);
  textFont("Courier New");
  textSize(20);
  text("GET CLOSER", 490, 245);
  pop();
}


function drawStage2() {
  background(50);
  for (let drop of raindrops) {
    drop.update();
    drop.display();
  }

  image(imgStage2, -800, -200, imgStage2.width * 2, imgStage2.height * 2);

  push();
  fill("white");
  noStroke();
  triangle(0, 200, 0, 0, 700, 0);
  pop();

  push();
  fill(240);
  strokeWeight(1);
  quad(100, -10, 120, -20, 180, 500, 160, 510);
  pop();

  push();
  fill(255);
  textFont("Courier New");
  textSize(30);
  text("I need space.", 450, 200);
  pop();
}

function drawStage3() {
  image(vision,0,0,width,height)

  if (isEyeClosing) {

    fill(0);
    noStroke();
    rect(0, tY, width, height / 2);
    rect(0, bY, width, height / 2);

    tY += 6;
    bY -= 6;

    if (tY >= 0 && bY <= height / 2) {
      isEyeClosing = false;
      eyeClosed = true;
    }
  } else if (eyeClosed) {

    if (!rain.isPlaying()) {
      rain.loop();
    }
    if (!drop.isPlaying()) {
      drop.loop();
    }

    background(0); 
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

function mousePressed() {
  if (stage === 1) {
    let d = dist(mouseX, mouseY, 400, 350);
    if (d <= 5) {
      handlePressed = true;
      if (!openumbrella.isPlaying()) openumbrella.play();
      if (!closer.isPlaying()) closer.play();
    }

    let d1 = dist(mouseX, mouseY, 480, 240);
    if (d1 <= 5) {
      stage = 2;
      if (!voice11.isPlaying()) voice11.play();
    }
  }
}

function keyPressed() {
  if (stage === 2 && key === ' ') {
    stage = 3;
  }
}
