let img;

let flower = [];

let content = '花香渐渐消逝远去……';
let yStart = 0;
let customFont;


function preload(){
  img = loadImage("assets2/Image/book.png")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  image(img,0,0,800,500)
  textFont(customFont);
}

function draw() {
  background(0);

  image(img,0,0,800,500)

  for(let i = 0; i < flower.length; i++){
    flower[i].update();
    flower[i].display();
    console.log("hi")
  }

 }

class Flower {
  constructor(startX,startY){
    this.x = 300;
    this.y = 400;
    this.speedX = 3;
    this.speedY = 10;
  }
  update(){

  }
  display(){
    fill("red")
    circle(this.x,this.y,100)

  }
}