let kick;

function preload(){
  let kick = loadsound("/Users/chexing/Desktop/NYUSH/CCLab/sound example/assets/sounds/kick.mp3")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

}

function draw() {
  background(220);
}

function mousePressed(){
  kick.play()
}