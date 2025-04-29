let img;
let wheat = [];
let cloud = [];


function preload(){
  img = loadImage("assets2/Image/booktexture.jpg")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  Book(50,20);
}

function draw() {
  background(0);
  Book(50,20);
  Hourglass1();
  Hourglass2();
 
 
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

function Hourglass1(){
  fill(255)
  // Parameters: x, y, width, height, start angle, end angle
  //noStorke()
  arc(215, 100, 190, 40, PI, 2*PI); //the upper surface
  arc(215, 400, 190, 40, 0, PI); //the bottom surface
  //arc(width / 2, height / 2, 200, 100, PI, 0);
  triangle(120,100,310,100,215,250)
  triangle(120,400,215,249,310,400)
}
function Hourglass2(){
  fill(255)
  arc(585, 100, 190, 40, PI, 0);
  arc(585, 400, 190, 40, 0, PI);
  triangle(490,100,680,100,585,250)
  triangle(490,400,585,249,680,400)
}

class Wheat{
  constructor(startX, startY){
    this.x = startX
    this.y = startY
  }

  update(){

  }

  display(){

  }
}

class Cloud{
  constructor(startX, startY){
    this.x = startX
    this.y = startY
  }

  update(){

  }

  display(){
    
  }
}