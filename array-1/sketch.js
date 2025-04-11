//let greetings1 = "Hello";
//let greetings2 = "哈喽"
let greetings = [ "Hello", "哈喽,你吃了吗?", "Bonjour","Annyeong-haseyo", "Oyasumi", "你好","Jambo"]
let random = (0, greetinng.length -1)
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  console.log (greetings)
  console.log (greetings.length)

  randomIndex = floor (random(0,greetings.length))
}

function draw() {
  background(200,100,200);

  // text(greetings[0], width/2, height/2)
  // text(greetings[1], width/2, height/2+12)
  // text(greetings[2], width/2, height/2+24)

  for (let i=0;i<=greetings.length;i++){
    // if (i==0){
    //   fill (200,0,0)
    // }else if (i == greetings.length -1 ){
    //   fill("blue")
    // }else{
    //   fill(0,0,0)
    // }
    let randomIndex = floor (random(0,greetings.length))
    if (i==randomIndex){
      fill("yellow")
    }else{
      fill("black")
    }
    let arrayIndex = i; 
    let y = i*14
    text (greetings[arrayIndex], width/2, height/2+y)
    }
}