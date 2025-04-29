let petals = [];
let settledPetals = [];
let sandHeight = [];
let sandBaseY;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  sandBaseY = height - 100;

  // Initialize sand heightmap
  for (let i = 0; i < width; i++) {
    sandHeight[i] = sandBaseY + noise(i * 0.02) * 20;
  }

  // Generate petals
  for (let i = 0; i < 80; i++) {
    petals.push(new Petal());
  }
}

function draw() {
  background(255, 240, 250);

  // Update and draw falling petals
  for (let i = petals.length - 1; i >= 0; i--) {
    let p = petals[i];
    p.update();

    let sx = constrain(floor(p.x), 0, width - 1);
    if (p.y >= sandHeight[sx]) {
      // Petal hits sand and stops
      p.y = sandHeight[sx] - 2;
      settledPetals.push(p);
      petals.splice(i, 1);
      petals.push(new Petal()); // Replace with new falling one
    } else {
      p.show();
    }
  }

  // Draw settled petals
  for (let p of settledPetals) {
    p.show();
  }

  drawSand();
}

function drawSand() {
  noStroke();
  fill(237, 201, 175); // sand color
  beginShape();
  vertex(0, height);
  for (let x = 0; x < width; x++) {
    vertex(x, sandHeight[x]);
  }
  vertex(width, height);
  endShape(CLOSE);
}

function mousePressed() {
  // Depress sand at mouseX to make a hole
  let range = 30;
  for (let dx = -range; dx <= range; dx++) {
    let i = floor(mouseX + dx);
    if (i >= 0 && i < width) {
      let distance = abs(dx);
      let depression = map(distance, 0, range, 20, 0);
      sandHeight[i] = min(height, sandHeight[i] + depression);
    }
  }
}

// Petal class
class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.size = random(12, 20);
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(-0.01, 0.01);
    this.windOffset = random(TWO_PI);
    this.windSpeed = random(0.01, 0.03);
    this.fallSpeed = random(1, 2);
  }

  update() {
    this.y += this.fallSpeed;
    this.x += sin(frameCount * this.windSpeed + this.windOffset) * 1;
    this.angle += this.rotationSpeed;
  }

  show() {
    push();
    translate(this.x, this.y);
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
