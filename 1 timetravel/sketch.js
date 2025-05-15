let verticalLines = [];
let horizontalLines = [];
let diagonalLines = [];
let spacing = 40;

let startX = 0;
let startY = 0;
let moveSpeed = 100;

let worldWidth = 3000;
let worldHeight = 2000;

let Ex = 2000;
let Ey = 1000;

let bgm;
let img;

let lost;

let targetX = 0; //
let targetY = 0; //

let startTime;


function preload(){
  bgm = loadSound("assets/sounds/Jcy East - 星际穿越（钢琴版）.mp3")
  lost = loadSound("assets/sounds/lost.m4a")
  img = loadImage("assets/Find something in the matrix to get you out.png")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  startTime = millis();

  startX = targetX;
  startY = targetY;


  bgm.play();
  if (!lost.isPlaying()) {
    lost.play(); 
  }
  stroke(255);

  for (let x = 0; x <= worldWidth; x += spacing) {
    verticalLines.push(new VerticalLine(x, 0, worldHeight));
  }

  for (let y = 0; y <= worldHeight; y += spacing) {
    horizontalLines.push(new HorizontalLine(0, worldWidth, y));
  }

  for (let i = -worldHeight; i <= worldWidth; i += spacing) {
    diagonalLines.push(new DiagonalLine45(i));
  }
}

function draw() {
  background(10);


  startX = lerp(startX, targetX, 0.1);
  startY = lerp(startY, targetY, 0.1);


  console.log("...", verticalLines.length)

  push();
  translate(startX, startY);

  fill(random(200,255), 0, 0);
  stroke(255);
  strokeWeight(2);
  ellipse(Ex, Ey, 30, 30); 
  Ex+=random(-2,2)
  Ey-=random(-2,2)

    for(let i = 0; i < verticalLines.length; i++){
      verticalLines[i].update();
      verticalLines[i].display();
    }

    for(let i = 0; i < horizontalLines.length; i++){
      horizontalLines[i].update();
      horizontalLines[i].display();
    }

    for(let i = 0; i <diagonalLines.length; i++){
      diagonalLines[i].update();
      diagonalLines[i].display();
    }

  pop();



    if (millis() - startTime < 5000) {
      image(img,0,0,width,height)
    }
  
  let worldMouseX = mouseX - startX;
  let worldMouseY = mouseY - startY;
  let d = dist(worldMouseX, worldMouseY, Ex, Ey);

  if (d < 15) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  

}

function keyPressed() {
  if (key == "a") {
    targetX += moveSpeed;
  } else if (key == "d") {
    targetX -= moveSpeed;
  } else if (key == "w") {
    targetY += moveSpeed;
  } else if (key == "s") {
    targetY -= moveSpeed;
  }
}




class VerticalLine {
  constructor(x, y1, y2) {
    this.baseX = x;
    this.x = x;
    this.y1 = y1;
    this.y2 = y2;
    this.distToMouse = 0;
  }

  update() {
    this.distToMouse = abs(mouseX - (this.x - startX)); 
    let effect = map(this.distToMouse, 0, 150, 10, 0, true); 

    this.x = this.baseX + sin(frameCount * 0.03 + this.baseX * 0.01) * effect;
  }

  display() {
    stroke(lerpColor(color(255), color(0, 200, 255), constrain(1 - this.distToMouse / 150, 0, 1)));
    line(this.x, this.y1, this.x, this.y2);
  }
}

class HorizontalLine {
  constructor(x1, x2, y) {
    this.baseY = y;
    this.y = y;
    this.x1 = x1;
    this.x2 = x2;
    this.distToMouse = 0;
  }

  update() {
    this.distToMouse = abs(mouseY - (this.y - startY));
    let amp = map(this.distToMouse, 0, 150, 8, 1, true);
    this.y = this.baseY + cos(frameCount * 0.04 + this.baseY * 0.01) * amp;
  }

  display() {
    let proximity = constrain(1 - this.distToMouse / 150, 0, 1);
    stroke(lerpColor(color(255), color(255, 150, 0), proximity));
    line(this.x1, this.y, this.x2, this.y);
  }
}

class DiagonalLine45 {
  constructor(startX) {
    this.baseStartX = startX;
    this.startX = startX;
  }

  update() {
    this.startX = this.baseStartX + sin(frameCount * 0.02 + this.baseStartX * 0.01) * 3;
  }

  display() {
    line(this.startX, worldHeight, this.startX + worldHeight, 0);
  }
}


function mousePressed(){
  let worldMouseX = mouseX - startX;
  let worldMouseY = mouseY - startY;

  let d = dist(worldMouseX, worldMouseY, Ex, Ey);

  if (d < 15) {
    window.location.href = "../1 red door";
  }
}