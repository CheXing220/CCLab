
let img;

let books;

function preload(){
  img = loadImage("assets/FJ9wsE_UUAAV7Ed.jpg_large")
  books = loadSound("assets/sounds/books.m4a")

}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  if (!books.isPlaying()) {
    books.play(); 
  }
}

function draw() {
  background(0);
  bookshelf();
  // book1();

  push();
  tint(200,140);
  image(img,0,0,width,height);
  pop();

  // bookshelf();
  book1();
  book2();
  book3();
}

function bookshelf(){
  fill(255)
  quad(50,20,550,20,525,40,75,40)
  quad(75,460,525,460,550,480,50,480)
  noStroke()
  rect(75,40,10,420)
  rect(515,40,10,420)
  rect(85,145,430,10)
  rect(85,250,430,10)
  rect(85,355,430,10)
}

function book1(){ //have interactive content
fill(34, 47, 62)
rect(85,80,20,65) //book1
rect(130,70,10,75) //book4
}

function book2(){ //blank but can type into
fill(189, 147, 106)
rect(105,100,10,45) //book2


}

function book3(){ // garbage website
fill(111, 78, 163)
rect(115,55,15,90) //book3
}

function light(){
  line()
}

function mousePressed(){
  if(mouseX>=85 && mouseX<= 105 && mouseY>= 80 && mouseY <= 145){
    window.location.href = "../1 flower";
  }
  if(mouseX >= 130 &&mouseX <= 140 && mouseY >=70 && mouseY<= 145){
    window.location.href = "../1 rain";
  }
}