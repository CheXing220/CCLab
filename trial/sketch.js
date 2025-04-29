function setup() {
  let canvas = createCanvas(800, 500,WEBGL);
  canvas.parent("p5-canvas-container");
  
}

function draw() {
  background(100,200,100);
  
  orbitControl();

  // Style the box.
  normalMaterial();

  // Draw the box.
  box(30, 50);


}
