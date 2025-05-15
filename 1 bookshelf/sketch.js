
let img;

let books;

let bgm; 

function preload(){
  img = loadImage("assets/FJ9wsE_UUAAV7Ed.jpg_large")
  bo = loadImage("assets/books-3981515_640.png")
  books = loadSound("assets/sounds/books.m4a")
  bgm = loadSound ("assets/sounds/Our Last Hope Lost Hope - Dagsvärk ／ The Underpass.mp3")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  if (!books.isPlaying()) {
    books.play(); 
  }
  if (!bgm.isPlaying()) {
    bgm.loop(); 
  }
}


function draw() {
  background(0);

  bookshelf();
  // book1();

  tint(255);
  image(bo,75,60,455,420);

  push();
  tint(200,140);
  image(img,0,0,width,height);
  // image(bo,75,60,455,420);
  pop();

  // bookshelf();
  // book1();
  // book2();
  // book3();
  if(mouseX>=115 && mouseX<= 135 && mouseY>= 90 && mouseY <= 146){
    cursor(HAND);
    console.log(5)
  }else if(mouseX >= 455 &&mouseX <= 470 && mouseY >=325 && mouseY<= 365){
    cursor(HAND);
  }else{
    cursor(ARROW);
  }

  image(bo,75,60,455,420);


}

function bookshelf(){
  fill(255)
  quad(50,20,550,20,525,40,75,40)
  quad(75,460,525,460,550,480,50,480)
  noStroke()
  rect(75,40,10,420)
  rect(515,40,10,420)
  rect(85,145,430,10)
  rect(85,217,430,10)
  rect(85,290,430,10)
  rect(85,365,430,10) 
  rect(85,445,430,10)
  // fill(100,0,0)


  triangle(525,40,670,250,525,460)
  triangle(670,250,800,40,800,460)

  fill(0,0,100)
  triangle(525,70,670,250,525,145)
  triangle(525,155,670,250,525,217)
  triangle(525,227,670,250,525,290)
  triangle(525,300,670,250,525,365)
  triangle(525,375,670,250,525,445)

  triangle(670,250,800,70,800,145)
  triangle(670,250,800,155,800,217)
  triangle(670,250,800,227,800,290)
  triangle(670,250,800,300,800,365)
  triangle(670,250,800,375,800,445)


}

function book1(){ //have interactive content
fill(34, 47, 62)
rect(85,80,20,65) //book1
rect(455,325,15,40) //book4
}

function book2(){ //blank but can type into
fill(189, 147, 106)
rect(105,100,10,45) //book2


}

function book3(){ // garbage website
fill(111, 78, 163)
rect(115,90,20,56) //book3
}

function light(){
  line()
}

function mousePressed(){
  if(mouseX>=115 && mouseX<= 135 && mouseY>= 90 && mouseY <= 146){
    window.location.href = "../1 flower";
    cursor(HAND);
  }
  if(mouseX >= 455 &&mouseX <= 470 && mouseY >=325 && mouseY<= 365){
    window.location.href = "../1 wholerain";
  }
}

