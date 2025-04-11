let fashionCreature;
let danceMoves = [];
let moveIndex = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  fashionCreature = new FashionCreature(width / 2, height / 2);
 // Define rhythmic dance moves
 let rhythm = [300, 500, 400, 600, 300];
 for (let i = 0; i < 5; i++) {
   danceMoves.push({
     x: sin(frameCount * 0.1) * 10,
     y: cos(frameCount * 0.1) * 10,
     angle: sin(frameCount * 0.2) * PI / 6,
     armAngle: cos(frameCount * 0.3) * PI / 4,
     legAngle: sin(frameCount * 0.3) * PI / 4,
     duration: rhythm[i]
   });
 }
 
 function updateMove() {
   moveIndex = (moveIndex + 1) % danceMoves.length;
   setTimeout(updateMove, danceMoves[moveIndex].duration);
 }
 updateMove();
}

function draw() {
 background(220);
 fashionCreature.update();
 fashionCreature.display();
}

class FashionCreature {
 constructor(x, y) {
   this.pos = createVector(x, y);
   this.angle = 0;
   this.armAngle = 0;
   this.legAngle = 0;
 }
 
 update() {
   let move = danceMoves[moveIndex];
   this.pos.x += move.x;
   this.pos.y += move.y;
   this.angle = move.angle;
   this.armAngle = move.armAngle;
   this.legAngle = move.legAngle;
   this.pos.x = constrain(this.pos.x, 100, 300);
   this.pos.y = constrain(this.pos.y, 100, 300);
 }
 
 display() {
   push();
   translate(this.pos.x, this.pos.y);
   rotate(this.angle);
   
   // New Stylish Body
   fill(0, 150, 255);
   rectMode(CENTER);
   rect(0, 0, 40, 60, 10);
   
   // Head with a cool hat
   fill(255, 204, 0);
   ellipse(0, -35, 30, 30);
   fill(0);
   rect(0, -45, 40, 10, 5);
   
   // Eyes
   fill(255);
   ellipse(-8, -38, 6, 6);
   ellipse(8, -38, 6, 6);
   fill(0);
   ellipse(-8, -38, 3, 3);
   ellipse(8, -38, 3, 3);
   
   // Arms (dancing motion)
   stroke(0);
   strokeWeight(4);
   push();
   rotate(this.armAngle);
   line(-20, 0, -35, -20);
   pop();
   push();
   rotate(-this.armAngle);
   line(20, 0, 35, -20);
   pop();
   
   // Legs (dancing motion)
   push();
   rotate(this.legAngle);
   line(-10, 30, -15, 50);
   pop();
   push();
   rotate(-this.legAngle);
   line(10, 30, 15, 50);
   pop();
   
   pop();
 }
}
