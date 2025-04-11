//let egg1;
//let egg2;
let basket = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for(let i = 0; i< 100; i++){
    let egg = new Egg(100,100);
    basket.push(egg);
  }
  // egg1 = new Egg(100,300);
  // egg2 = new Egg(200,100);
  //basket.push (new Egg (100,100))

}


function draw() {
  background(220);
  // egg1.update();
  // egg1.display();

  // egg2.update();
  // egg2.display();
 for(let i =0; i < basket.length; i++){
  basket[i].update();
  basket[i].display();
 }


}

class Egg {
    constructor (startX,startY) {
      this.x = startX;
      this.y = startY;
      this.diaX = 80;
      this.diaY =100;
      this.r = 50;
      this.speedX = random(-2,2);
      this.speedY = random(-2,2);
      this.scaleFactor = random(0.3,1);
    }
  

  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < 0 || this.x > width){
      this.speedX = -this.speedX
    }

      if(this.y < 0 || this.y > height){
        this.speedY = -this.speedY
    }
  }

  display(){
    push()
    translate (this.x, this.y)
    fill (0,0,200)
    ellipse(0,0,this.diaX, this.diaY,PI,2*PI)
    arc(0,0,this.diaX,this.diaY,0,PI)
  }
}
 //drawEggyork makeProperty of the egg 