let petals = [];
let settledPetals = [];
let sandHeightMap = [];
let sandBaseY;
let sandPuffs = [];
let sandMounds = [];
let img1;
let img2;
let img3; 
let bgm; 



function preload(){
  img1 = loadImage("assets/94773005-light-blue-sky-with-clouds-oil-painting-background.jpg")
  img2 = loadImage("assets/Tree+Brandch+2.png")
  img3 = loadImage("assets/return-button-icon-13.jpg")
  bgm = loadSound("assets/sounds/坂本龍一 - Energy Flow.mp3")
}
// let content = '花香渐渐消逝远去…… '
// let yStart = 0;
// let customFont;


// function preload() {
//   customFont = loadFont('assets/花香渐渐消逝远去......txt'); 
// }



// }
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  if (!bgm.isPlaying()) {
    bgm.loop(); 
  }
  // image(img1,0,0,width,height)
  // image(img2,0,0,width,height)

  // image(img3,0,0,width,height)
  sandBaseY = height - 100;
  for (let i = 0; i < width; i++) {
    sandHeightMap[i] = sandBaseY + noise(i * 0.02) * 20;
  }
  for (let i = 0; i < 80; i++) {
    petals.push(new Petal());
  }
  // textFont(customFont);
  // textAlign(CENTER, CENTER);
  // textSize(20);
}

function draw() {
  background(255, 240, 250);

  image(img1,0,0,width,height)
  image(img2,600,200,width/3.5,height/2)
  image(img2,600,0,width/3.5,height/2)

  image(img3,0,0,width/10,height/8.5)


// if (millis() >= 5000){
//   console.log("show")
//   image(img2,500,0)
//  }




  // for (let y = yStart; y < height; y += 28) { //use a for loop to draw the line of text multiple times down the vertical axis
  //   fill(255, y / 2 + 55, 100); //create a gradient by associating the fill color with the y location of the text
  //   text(content, width / 2, y); //display text
  // }
  // yStart--; //move the starting point of the loop up to create the scrolling animation, yStart-- is the same as yStart = yStart -1 or yStart-=1



  for (let i = petals.length - 1; i >= 0; i--) {
    let petalInstance = petals[i];
    petalInstance.update();

    let index = constrain(floor(petalInstance.positionX), 0, width - 1);
    if (petalInstance.positionY >= sandHeightMap[index]) {
      petalInstance.positionY = sandHeightMap[index] - 2;
      settledPetals.push(petalInstance);
      petals.splice(i, 1);
      petals.push(new Petal());
    } else {
      petalInstance.display();
    }
  }

  for (let petalInstance of settledPetals) {
    petalInstance.display();
  }

  for (let mound of sandMounds) {
    mound.display();

    image(img3,700,100,width/10,height/10)
  }

  drawSand();

  for (let i = sandPuffs.length - 1; i >= 0; i--) {
    let puff = sandPuffs[i];
    puff.update();
    puff.display();
    if (puff.isFinished()) {
      sandPuffs.splice(i, 1);
    }
  }
}

function drawSand() {
  noStroke();
  fill(237, 201, 175);
  beginShape();
  vertex(0, height);
  for (let x = 0; x < width; x++) {
    vertex(x, sandHeightMap[x]);
  }
  vertex(width, height);
  endShape(CLOSE);
}

function mousePressed() {

  if(mouseX>=10 && mouseX <= 80 && mouseY >= 10 && mouseY <= 50){
    window.location.href = "../1 bookshelf";
  }

  let radius = 20;

  for (let i = sandMounds.length - 1; i >= 0; i--) {
    if (sandMounds[i].isClicked(mouseX)) {
      sandMounds[i].fillDepression();
      sandMounds.splice(i, 1);
      return;
    }
  }

  let averageHeight = 0;
  for (let dx = -radius; dx <= radius; dx++) {
    let index = floor(mouseX + dx);
    if (index >= 0 && index < width) {
      averageHeight += sandHeightMap[index];
    }
  }
  averageHeight /= radius * 2 + 1;

  if (averageHeight > sandBaseY + 10) return;

  for (let dx = -radius; dx <= radius; dx++) {
    let index = floor(mouseX + dx);
    if (index >= 0 && index < width) {
      let depth = map(abs(dx), 0, radius, 20, 0);
      sandHeightMap[index] = min(height, sandHeightMap[index] + depth);
    }
  }

  let side = random() < 0.5 ? -1 : 1;
  let moundX = constrain(mouseX + side * random(30, 60), 20, width - 20);
  sandMounds.push(new SandMound(moundX, mouseX));
}

// Petal class
class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.positionX = random(width);
    this.positionY = random(-height, 0);
    this.size = random(12, 20);
    this.angle = random(TWO_PI);
    this.rotationAmount = random(-0.01, 0.01);
    this.waveOffset = random(TWO_PI);
    this.waveSpeed = random(0.01, 0.03);
    this.fallSpeed = random(1, 2);
  }

  update() {
    this.positionY += this.fallSpeed;
    this.positionX += sin(frameCount * this.waveSpeed + this.waveOffset);
    this.angle += this.rotationAmount;
  }

  display() {
    push();
    translate(this.positionX, this.positionY);
    rotate(this.angle);
    noStroke();
    fill(255, random(120, 160), random(160, 200), 220);
    beginShape();
    vertex(0, 0);
    bezierVertex(-this.size / 4, -this.size / 2, -this.size / 2, -this.size, 0, -this.size);
    bezierVertex(this.size / 2, -this.size, this.size / 4, -this.size / 2, 0, 0);
    endShape(CLOSE);
    pop();
  }
}

// Sand Puff
class SandPuff {
  constructor(positionX, positionY) {
    this.particles = [];
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        positionX: positionX + random(-5, 5),
        positionY: positionY + random(-5, 5),
        velocityX: random(-0.5, 0.5),
        velocityY: random(-1.5, -0.5),
        alpha: 255,
        size: random(2, 5)
      });
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.positionX += particle.velocityX;
      particle.positionY += particle.velocityY;
      particle.alpha -= 3;
    }
  }

  display() {
    noStroke();
    for (let particle of this.particles) {
      fill(237, 201, 175, particle.alpha);
      ellipse(particle.positionX, particle.positionY, particle.size);
    }
  }

  isFinished() {
    return this.particles.every(p => p.alpha <= 0);
  }
}

// Sand Mound
class SandMound {
  constructor(positionX, targetPositionX) {
    this.positionX = positionX;
    this.targetPositionX = targetPositionX;
    this.radius = 25;
  }

  display() {
    noStroke();
    fill(222, 190, 160);
    beginShape();
    for (let offset = -this.radius; offset <= this.radius; offset++) {
      let x = this.positionX + offset;
      let y = sandHeightMap[floor(x)] - map(abs(offset), 0, this.radius, 20, 0);
      vertex(x, y);
    }
    vertex(this.positionX + this.radius, height);
    vertex(this.positionX - this.radius, height);
    endShape(CLOSE);
  }

  isClicked(mouseXPosition) {
    return abs(mouseXPosition - this.positionX) < this.radius;
  }

  fillDepression() {
    let radius = 20;
    for (let offset = -radius; offset <= radius; offset++) {
      let index = floor(this.targetPositionX + offset);
      if (index >= 0 && index < width) {
        let raise = map(abs(offset), 0, radius, 20, 0);
        sandHeightMap[index] = max(sandBaseY + noise(index * 0.02) * 20, sandHeightMap[index] - raise);
      }
    }

    sandPuffs.push(new SandPuff(this.targetPositionX, sandHeightMap[floor(this.targetPositionX)]));

    settledPetals = settledPetals.filter(petal => {
      let x = constrain(floor(petal.positionX), 0, width - 1);
      return !(petal.positionX > this.targetPositionX - radius &&
               petal.positionX < this.targetPositionX + radius &&
               petal.positionY >= sandHeightMap[x] - 2);
    });
  }
}

