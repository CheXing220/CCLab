let doorS;

let doorHandlePressed = false;
let openPercent = 0;


let here;

let bgm;


 
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


  let d = dist(mouseX, mouseY, 290, 250); 
  let overHandle = d <= 15;


  if (mouseIsPressed && overHandle) {
    fill(random(0,255),100,100)
    text("Don't release the handle! You only have on chance.",265,43)
    doorHandlePressed = true;
  }

  if (mouseIsPressed && doorHandlePressed) {
    fill(random(0,255),100,100)
    text("Don't release the handle! You only have on chance.",265,43)
    if (!doorS.isPlaying()) {
      doorS.play();
    }
  } else {
    if (doorS.isPlaying()) {
      doorS.stop();
    }
  }

  Door();

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
  openPercent = map(mouseX,270,530,0,1); 
  openPercent = constrain(openPercent, 0, 1);
  openPercent2 = 0
 }

 fill("red")
let tlX =  map(openPercent, 0, 1, 270, 530); 
let tlY =  map(openPercent,0,1,65,200);
let trX = 530;
let trY = 65;
let blX =  map(openPercent, 0, 1, 270, 530);  
let blY =  map(openPercent,0,1,435,390);
let brX = 530;
let brY = 435;
 quad(tlX,tlY,trX,trY,brX,brY,blX,blY)

 fill(random(200, 255),random(200, 255),random(0, 50));

let circleX = map(openPercent,0,1,290,520); 
let circleY = map(openPercent,0,1,250,240);
let dia = map(openPercent,0,1,30,0);
circle(circleX,circleY,dia)

fill("white")
rect(250,20,240,10)
fill("grey")
rect(250,22,circleX-280,8)
 

 fill("grey")
 quad(250,450,550,450,600,500,200,500)
}




function mousePressed() {
  if (mouseX >= 370 && mouseX <= 420 && mouseY >= 220 && mouseY <= 270) {
    cursor(HAND)
    window.location.href = "../1 bookshelf";
  }
}



function mouseReleased(){
  doorHandlePressed = false;
}