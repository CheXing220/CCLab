let rain;
let drop;

function preload() {
  drop = loadSound ("assets/sounds/dripping-water-nature-sounds-8050.mp3")
  rain = loadSound("assets/sounds/rain-echo-roof-resonance-in-the-woods-335718.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  if (!rain.isPlaying()) {
    rain.loop(); 
  }

  if (!drop.isPlaying()) {
    drop.loop(); 
  }
}

function draw() {
  background(0);
}
