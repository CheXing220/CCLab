let raindrops = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < 200; i++) {
    raindrops.push(new Raindrop());
  }
}

function draw() {
  background(200, 220, 255);
  for (let drop of raindrops) {
    drop.update();
    drop.show();
  }
}

class Raindrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-500, 0);
    this.len = random(10, 20);
    this.speed = random(4, 10);
    this.thickness = random(1, 2.5);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.reset();
    }
  }

  show() {
    stroke(50, 100, 200);
    strokeWeight(this.thickness);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}