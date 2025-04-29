let imgbook;
let imgchair;

function preload(){
  imgbook = loadImage("assets2/Image/booktexture.jpg")
  // imgchair = loadImage ("assets2/Image/sitting on chair man.webp")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0);
  Book(50,20);
  push()
  scale(0.5)
  image(imgchair,100,200)
  pop()
}

function Book (x,y){
  image(imgbook, x, y, 400 - x, height - 2 * y);        
  image(imgbook, 400, y, 400 - x, height - 2 * y);  
  // image(imgchair,100,200)
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

