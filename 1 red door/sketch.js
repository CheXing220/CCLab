let doorS;

let doorHandlePressed = false;
let openPercent = 0;


let here;

let bgm;


// let doorSound = false;

// if (doorSound == true){
//   door.play()
// }
 
function preload(){
  doorS = loadSound ("assets/sounds/mixkit-scary-wooden-door-opening-190.wav")
  here = loadSound ("assets/sounds/why.m4a")
  bgm = loadSound("assets/sounds/Cliff Martinez - Touch of Crude Part 1.mp3")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  if (!here.isPlaying()) {
    here.play(); 
  }
  if (!bgm.isPlaying()) {
    bgm.loop(); 
  }
}

function draw() {
  background(0);
  Door();
  // fill("white")
  // rect(250,20,300,10)
  // fill("grey")
  // rect(250,22,circleX-250,8)
  // if (doorSound == true){
  //   doorS.play()
  // }
}


function Door(){
  
 fill(200,0,0) 
 rect(250, 50, 300, 400)
 noStroke()


 fill(0,0,random(200,255))
 rect(270, 65, 260, 370)

 fill(random(0,255))
 rect(370,220,50,50)

 if(doorHandlePressed == true){
  openPercent = map(mouseX,270,530,0,1); //0;
  openPercent = constrain(openPercent, 0, 1);
  openPercent2 = 0//map(mouseX,290,520,0,1)
 }

 fill("red")
let tlX =  map(openPercent, 0, 1, 270, 530);  //270;
let tlY =  map(openPercent,0,1,65,200);
let trX = 530;
let trY = 65;
let blX =  map(openPercent, 0, 1, 270, 530);  //270;
let blY =  map(openPercent,0,1,435,390);
let brX = 530;
let brY = 435;
 quad(tlX,tlY,trX,trY,brX,brY,blX,blY)

 fill(random(200, 255),random(200, 255),random(0, 50));
//  circle (290,250,30)
let circleX = map(openPercent,0,1,290,520); //290
let circleY = map(openPercent,0,1,250,240);
let dia = map(openPercent,0,1,30,0);
circle(circleX,circleY,dia)

fill("white")
rect(250,20,240,10)
fill("grey")
rect(250,22,circleX-280,8)
 
//  fill(random(0,255))
//  rect(370,220,50,50)



 //fill("red")

//  if(doorHandlePressed == true){
//   openPercent = map(mouseX,270,530,0,1); //0;
//   openPercent = constrain(openPercent, 0, 1);
//   openPercent2 = 0//map(mouseX,290,520,0,1)
//  }


// let tlX =  map(openPercent, 0, 1, 270, 530);  //270;
// let tlY =  map(openPercent,0,1,65,200);
// let trX = 530;
// let trY = 65;
// let blX =  map(openPercent, 0, 1, 270, 530);  //270;
// let blY =  map(openPercent,0,1,435,390);
// let brX = 530;
// let brY = 435;
//  quad(tlX,tlY,trX,trY,brX,brY,blX,blY)

//  fill(random(200, 255),random(200, 255),random(0, 50));
// //  circle (290,250,30)
// let circleX = map(openPercent,0,1,290,520); //290
// let circleY = map(openPercent,0,1,250,240);
// let dia = map(openPercent,0,1,30,0);
// circle(circleX,circleY,dia)
 //quad(x1, y1, x2, y2, x3, y3, x4, y4, [detailX], [detailY]) 点位顺时针
 fill("grey")
 quad(250,450,550,450,600,500,200,500)
}



function mousePressed(){
  // door.play() = true
  let d= dist(mouseX,mouseY,290,250);
   if (d<=15 &&!doorS.isPlaying()){
    doorHandlePressed = true;
    // // console.log("hi")
    // doorSound = true;
    doorS.play()
   }else{
    !doorS.play()
   }
   if (mouseX >= 370 && mouseX <= 420 && mouseY >= 220 && mouseY <= 270) {
       window.location.href = "../1 bookshelf"
  }
}

function mouseReleased(){
  doorHandlePressed = false;
  // doorSound = false;
  // window.location.href = "../1 timetravel";
}