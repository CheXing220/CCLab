let x = 200;
let y = 100;


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(100,200,100);
  fill(random(200,255), 0, 0);
  stroke(255);
  strokeWeight(2);
  ellipse(x, y, 30, 30); 
  x+=random(-2,2)
  y-=random(-2,2)

}
