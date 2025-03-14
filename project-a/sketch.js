let lightOn = true;
let blinkTimer = 0;
let blinkInterval = 1000; // Faster blink interval (1 second)
let blinkDuration = 200; // Duration for each blink
let lastBlinkTime = 0;
let blinkState = false;
let clouds = [];
let stars = []; 
let raindrops = [];

let tears = []; // Array to store multiple falling tears
let pondLevel = 0; // Level of the tear pond (accumulation on the ground)
let pondWidth = 0; // Horizontal radius of the tear pond (elliptical spread)
let pondHeight = 0; // Vertical radius of the tear pond
let tearTimer = 0; // Timer to control when a new tear falls

let creatureVisible = false; // Track whether the creature is visible
let noiseOffset = 0;
let radius = 60;
let angle = 0; // Controls movement
let speed = 0.03; // Movement speed
let isFriendly = false; // Tracks facial expression
let wingColor; // Variable to store changing wing color
let colorShift = 0; // Controls slow color transition

let tissues = [];
let draggingTissue = null;

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");

  console.log("Tissues array:", tissues);
  // Generate random stars for night mode
  for (let i = 0; i < 50; i++) {
    stars.push({ x: random(width), y: random(height / 2), size: random(2, 2.1), flicker: random(50, 255) });
     }
  push()
   // Generate random clouds for day mode
  for (let i = 0; i < 5; i++) {
    clouds.push({ x: random(width), y: random(50, 150), size: random(40, 80) });
  }
  pop()
  
  push()
   for (let i = 0; i < 5; i++) {
    tissues.push({
      x: width - random(50, 100),
      y: height - random(50, 80),
      w: random(30, 50),
      h: random(20, 40),
      offsetX: 0,
      offsetY: 0,
      beingDragged: false,
    });
  }
  pop()
}

function draw() {
  // Change background and add patterns when light is off
  if (lightOn) {
    background(130,140,200);  // Normal background when light is on
    drawHappyPattern();  // Add patterns indicating happiness
  } else {
    background(50, 50, 50);  // Dark background when light is off
    drawSadPattern();  // Add patterns indicating sadness
  }

  // Handle automatic blinking at a faster interval
  if (millis() - lastBlinkTime > blinkInterval) {
    blinkState = !blinkState;
    lastBlinkTime = millis();
  }

  // Draw two eyes in different positions
  push();
  drawEye(width / 4, height / 3, 175);
  drawEye(-165, height / 3, 175);
  pop();

  // If the light is off, make the left eye cry (falling tears)
  if (!lightOn) {
    drawFallingTears(width / 4, height / 3, 175); // Only the left eye will cry
    accumulatePond();
  }

  if (!lightOn) {
    drawTissues();
  }


  // If creature is visible, draw it
  if (creatureVisible) {
    drawCreature(width / 2, height / 2)
    fill(255,255,255)
    textSize(35)
    textStyle(BOLDITALIC)
    text("You're sad, right?", 480,100)
  }
}

function drawTissues() {
  for (let tissue of tissues) {
    fill(220);
    stroke(180);
    rect(tissue.x, tissue.y, tissue.w, tissue.h, 5);
    
    // Add a visual cue for the tissue being dragged
    if (tissue.beingDragged) {
      stroke(0, 255, 0);  // Green border for dragged tissue
      noFill();
      rect(tissue.x, tissue.y, tissue.w, tissue.h, 5);
    }
  }
}


function mousePressed() {
  console.log("Mouse pressed at:", mouseX, mouseY);

  for (let tissue of tissues) {
    console.log("Checking tissue at:", tissue.x, tissue.y, tissue.w, tissue.h); // Debugging

    let insideX = mouseX >= tissue.x && mouseX <= tissue.x + tissue.w;
    let insideY = mouseY >= tissue.y && mouseY <= tissue.y + tissue.h;

    console.log("InsideX:", insideX, "InsideY:", insideY); // Debugging

    if (insideX && insideY) {
      console.log("✅ Clicked on a tissue at:", tissue.x, tissue.y); // Debugging
      tissue.beingDragged = true;
      tissue.offsetX = mouseX - tissue.x;
      tissue.offsetY = mouseY - tissue.y;
      draggingTissue = tissue;
      return;
    }
  }
}

function mouseDragged() {
  if (draggingTissue) {
    draggingTissue.x = mouseX - draggingTissue.offsetX;
    draggingTissue.y = mouseY - draggingTissue.offsetY;
    console.log("Dragging tissue to:", draggingTissue.x, draggingTissue.y); // Debugging
  }
}

function mouseReleased() {
  if (draggingTissue) {
    draggingTissue.beingDragged = false;
    draggingTissue = null;
    console.log("Released tissue"); // Debugging
  }


  }
function drawEye(x, y, size) {
  // White of the eye
  fill(255);
  noStroke(); // No stroke for the eye
  ellipse(x, y, size * 2, size);
  
  // Pupil and iris
  fill(100, 0, 0);
  ellipse(x, y, size * 0.8, size * 0.8);
  
  fill(0);
  ellipse(x, y, size * 0.3, size * 0.3);
  
  // Light reflection
  fill(255);
  noStroke();
  ellipse(x - size * 0.15, y - size * 0.15, size * 0.1, size * 0.1);

  // Draw the eyelid (for blinking effect)
  if (blinkState) {
    drawEyelid(x, y, size);
  }
}

function drawEyelid(x, y, size) {
  // Eyelid is now an ellipse that covers the eye fully (corrected orientation)
  fill(230, 180, 150);  // More natural skin-like color
  noStroke();
  ellipse(x, y - 20, size * 2, size); // Fully covers the white ellipse
}

function drawFallingTears(x, y, size) {
  // Only allow a new tear to fall once every 500ms
  if (millis() - tearTimer > 500) {
    let tearSize = random(15, 25); // Varying size for the tears

    // Add new tears to the tears array for constant falling
    tears.push({x: x - 30, y: y + 60, size: tearSize});
    tearTimer = millis(); // Update the timer
  }

  // Draw each tear individually falling down
  for (let i = 0; i < tears.length; i++) {
    let tear = tears[i];
    
    // Shape of the tears (more like real tears)
    fill(0, 0, 255);
    beginShape();
    vertex(tear.x, tear.y);
    bezierVertex(tear.x, tear.y + tear.size * 0.6, tear.x + tear.size * 0.5, tear.y + tear.size, tear.x + tear.size, tear.y + tear.size * 0.5);
    bezierVertex(tear.x + tear.size * 0.5, tear.y - tear.size * 0.5, tear.x, tear.y - tear.size * 0.5, tear.x, tear.y);
    endShape(CLOSE);

    // Update the tear's position to fall vertically
    tear.y += 2; // Falling speed of tears (still slower)
  }

  // Remove tears that have gone off the screen
  tears = tears.filter(tear => tear.y < height - 30); // Keep them above the pond
}

function accumulatePond() {
  // Accumulate the tears and create a pond on the ground (elliptical pond)
  noStroke();
  fill(0, 0, 255, 100);  // Semi-transparent blue for the pond

  // Loop through all tears to draw them on the ground
  for (let i = 0; i < tears.length; i++) {
    ellipse(tears[i].x, tears[i].y + tears[i].size / 2, tears[i].size * 0.8, tears[i].size * 0.5);
  }

  // Increase the pond's width and height as more tears fall
  pondWidth += 0.05; // Gradual increase in pond width
  pondHeight += 0.05; // Gradual increase in pond height

  // Make the pond grow, with an irregular edge
  fill(0, 0, 255, 150); // More opaque blue for the pond on the ground
  beginShape();
  for (let i = 0; i < 360; i++) {
    let angle = radians(i);
    let xOffset = random(-3, 3); // Irregularity of the pond edge
    let xPos = width / 4 + cos(angle) * (pondWidth + xOffset);
    let yPos = height - 10 + sin(angle) * (pondHeight + xOffset);
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
  
  // Limit the maximum size of the pond
  if (pondWidth > 100) {
    pondWidth = 100;
  }
  if (pondHeight > 50) {
    pondHeight = 50;
  }
}

// Key press to toggle light on/off
function keyPressed() {
  if (key === ' ') {
    lightOn = !lightOn; // Toggle the light on/off with the space key
  }
}

// Add happy patterns when the light is on
function drawHappyPattern() {
  noFill();
  stroke(255, 255, 0, 150); // Yellow color for happiness
  strokeWeight(3);
  
  // Draw moving clouds
  noStroke();
  fill(255, 255, 255, 180);
  for (let cloud of clouds) {
    ellipse(cloud.x, cloud.y, cloud.size * 1.5, cloud.size);
    cloud.x += 0.3; // Slow movement
    if (cloud.x > width + 50) cloud.x = -50; // Loop around
  }
  
  // Draw complex sun rays with some variation
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI);
    let x1 = width / 2 + cos(angle) * 150;
    let y1 = height / 2 + sin(angle) * 150;
    let x2 = width / 2 + cos(angle) * 250;
    let y2 = height / 2 + sin(angle) * 250;
    line(x1, y1, x2, y2);
  }

  // Add random flowing wave pattern in soft green
  noFill();
  stroke(0, 255, 0, 100);
  strokeWeight(2);
  for (let i = 0; i < 5; i++) {
    beginShape();
    for (let j = 0; j <= width; j += 5) {
      let yOffset = sin(j * 0.05 + i) * 20;
      vertex(j, height / 2 + yOffset);
    }
    endShape();
  }

  // Add soft cloud patterns
  noFill();
  stroke(255, 255, 255, 80); // Faint white clouds
  strokeWeight(2);
  for (let i = 0; i < 3; i++) {
    beginShape();
    for (let j = 0; j <= width; j += 15) {
      let yOffset = cos(j * 0.1 + i) * 30;
      vertex(j, height / 2 - yOffset);
    }
    endShape();
  }

  // Create a glowing effect (abstract happy pattern)
  noFill();
  stroke(255, 200, 0, 150); // Yellow-orange glow
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < width; i += 10) {
    let yOffset = cos(i * 0.1) * 30;
    vertex(i, height / 2 + yOffset);
  }
  endShape();
}

// Add sad patterns when the light is off
function drawSadPattern() {
  noFill();
  stroke(0, 0, 255, 150); // Blue color for sadness
  strokeWeight(2);
  

  
  push()
  // Draw raindrops
  stroke(100, 100, 255, 200);
  strokeWeight(2);
  if (frameCount % 5 === 0) {
    raindrops.push({ x: random(width), y: 0, length: random(10, 20) });
  }
  for (let drop of raindrops) {
    line(drop.x, drop.y, drop.x, drop.y + drop.length);
    drop.y += 4; // Falling speed
  }
  raindrops = raindrops.filter(drop => drop.y < height);
  pop()
  
  push()
  // Draw stars with flickering effect
  noStroke();
  for (let star of stars) {
    fill(255, 255, 200, star.flicker);
    ellipse(star.x, star.y, star.size);
    star.flicker = random(50, 255); // Random flickering effect
  }
  pop()
  
  push()
  // Draw falling raindrops in varying sizes and speeds
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height / 2);
    let dropSize = random(10, 20);
    ellipse(x, y, dropSize, dropSize * 2);
  }
  pop()
  
  // Add misty swirls (sad abstract pattern)
  noFill();
  stroke(100, 100, 255, 100);
  strokeWeight(2);
  for (let i = 0; i < 4; i++) {
    beginShape();
    for (let j = 0; j <= width; j += 5) {
      let yOffset = cos(j * 0.05 + i) * 30;
      vertex(j, height / 2 + yOffset);
    }
    endShape();
  }
}

// Toggle creature visibility when clicking on the pond
function mousePressed() {
  // Check if user clicks on the pond area
  let d = dist(mouseX, mouseY, width / 4, height - 10);
  if (d < pondWidth) {
    creatureVisible = !creatureVisible;
  }
  
  // Toggle expression of the creature when clicked
  let creatureD = dist(
    mouseX,
    mouseY,
    width / 2 + 50 * sin(angle),
    height / 2 + 30 * cos(angle * 2)
  );
  //if (creatureD < radius) {
  //  isFriendly = !isFriendly; 
    // Change the creature's expression
 // }
}

function drawCreature(x, y) {
  // Gradually change wing color over time
  let r = 200 + 55 * sin(colorShift * 0.02);
  let g = 200 + 55 * sin(colorShift * 0.015);
  let b = 200 + 55 * sin(colorShift * 0.01);
  wingColor = color(r, g, b);
  colorShift += 1; // Slows down color change

  // Floating motion
  let a = x + 50 * sin(angle);
  let c = y + 30 * cos(angle * 2);

  push();
  translate(a, c);

  // Draw wings
  drawWings(angle);

  // Draw body
  stroke(173, 216, 230);
  strokeWeight(2);
  fill(173, 216, 230, 180);
  beginShape();
  let angleStep = TWO_PI / 100;
  for (let a = 0; a < TWO_PI; a += angleStep) {
    let noiseFactor = noise(noiseOffset + cos(a), noiseOffset + sin(a));
    let r = radius + noiseFactor * 20 - 10;
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  // Draw face
  drawFace();

  pop();

  // Update movement and shape dynamics
  angle += speed;
  noiseOffset += 0.01;
}

function drawWings(a) {
  let wingFlap = sin(a * 4) * 10; // Smooth flapping motion
  let wingOffsetX = 55; // Moved closer to body

  fill(wingColor); // Apply gradually changing color
  stroke(200);
  strokeWeight(2);

  // Left wing
  push();
  translate(-wingOffsetX, -10);
  rotate(-PI / 4 + wingFlap * 0.02);
  drawFeatheredWing();
  pop();

  // Right wing (mirrored)
  push();
  translate(wingOffsetX, -10);
  scale(-1, 1); // Mirroring the wing to make it identical
  rotate(-PI / 4 + wingFlap * 0.02);
  drawFeatheredWing();
  pop();
}

function drawFeatheredWing() {
  beginShape();
  vertex(0, 0); // Wing base
  vertex(-15, -15);
  vertex(-40, -30);
  vertex(-70, -25);
  vertex(-90, -10);
  vertex(-75, 15);
  vertex(-50, 25);
  vertex(-20, 10);
  endShape(CLOSE);
}

function drawFace() {
  fill(0);
  let eyeOffsetX = 15;
  let eyeOffsetY = -10;

  // Eyes
  if (isFriendly) {
    ellipse(-eyeOffsetX, eyeOffsetY, 10, 15); // Round friendly eyes
    ellipse(eyeOffsetX, eyeOffsetY, 10, 15);
  } else {
    // Angry slanted eyes
    push();
    rotate(-PI / 6);
    ellipse(-eyeOffsetX, eyeOffsetY, 12, 8);
    pop();
    push();
    rotate(PI / 6);
    ellipse(eyeOffsetX, eyeOffsetY, 12, 8);
    pop();
  }

  // Mouth
  stroke(0);
  strokeWeight(3);
  noFill();
  if (isFriendly) {
    arc(0, 10, 20, 10, 0, PI); // Smiling mouth
  } else {
    arc(0, 15, 20, 10, PI, TWO_PI); // Evil grin
  }
}