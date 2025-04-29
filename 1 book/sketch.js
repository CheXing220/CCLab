let img;

function preload(){
  img = loadImage("assets2/Image/booktexture.jpg")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0);
  Book(50,20);
 
}

function Book (x,y){
  image(img, x, y, 400 - x, height - 2 * y);        
  image(img, 400, y, 400 - x, height - 2 * y);  
  fill(80, 60, 40,1);
  rect(x,y,400-x,height-2*y)
  rect(400,y,400-x,height-2*y)

  push()
  fill(210, 170, 130)
  rect(40,y,10,height-2*y)
  rect(width-x,y,10,height-2*y)
  pop()

  push()
  fill(150, 100, 70)
  rect(30,y,10,height-2*y)
  rect(width-x+10,y,10,height-2*y)
  pop()

  push()
  fill(90, 60, 40)
  rect(20,y,10,height-2*y)
  rect(width-x+20,y,10,height-2*y)
  pop()

}

