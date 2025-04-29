let petals = [];
let settledPetals = [];
let sandHeightMap = [];
let sandBaseY;
let sandPuffs = [];
let sandMounds = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  sandBaseY = height - 100;
  for (let i = 0; i < width; i++) {
    sandHeightMap[i] = sandBaseY + noise(i * 0.02) * 20;
  }
  for (let i = 0; i < 80; i++) {
    petals.push(new Petal());
  }
}

function draw() {
  background(255, 240, 250);

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
