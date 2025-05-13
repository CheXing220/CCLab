let raindrops = [];

let handlePressed = false;

let openPercent = 0;

let img;

let openumbrella;

let instruction;

let closer;

let stage = 0; 

function preload(){
  img = loadImage("assets/man.png")
  openumbrella = loadSound("assets/sounds/umbrella-43325.mp3")
  instruction = loadSound("assets/sounds/insturction.m4a")
  closer = loadSound("assets/sounds/closer.m4a")
}


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(30);

}
