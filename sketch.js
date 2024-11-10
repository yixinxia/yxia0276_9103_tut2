let circles = []; 
let time = 0;
let numCircles = 100;
let waves = [];
let particles = [];
let numWaves = 12;
let numParticles = 30;

let flowField; // Flow field array for particle movement
let inc = 0.03; // Noise increment value
let scl = 10;  // Grid cell size
let cols, rows; // Grid dimensions
let zoff = 0; // Z-offset for 3D noise
let flowParticles = []; // Array to store flow particles
let numFlowParticles = 10; // Number of flow particles to create

let mouseInfluenceRadius = 200; // Radius of mouse influence on circles
let maxRepelForce = 5; // Maximum repulsion force from mouse

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(128, 139, 140);

    // Initialize flow field grid dimensions
cols=floor(width/scl);
rows=floor(height/scl);
flowField=new Array(cols*rows);
  // Initialize flow particles array
  for (let i = 0; i < numFlowParticles; i++) {
    flowParticles[i] = new FlowParticle();
  }

    // Initial wave
    for (let i = 0; i < numWaves; i++) {
      waves.push(new Wave(
        20 + i * 5,  // amplitude
        random(0.002, 0.005),  // frequency
        height * (i / numWaves),  // y position
        color(255, 255, 255, 10)  // color
      ));
    }
    
    // Initializing particle
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }  

  // Create a circle with random locations
  for(let i = 0; i < numCircles; i++) {
    let x, y, radius;
    let attempts = 0;
    let valid = false;
    
  // Modify the range of random locations in the setup() function
    while(!valid && attempts < 100) {
      //Expand distribution
      x = random(width * 0.2, width * 0.85);
      y = random(height * 0.2, height * 0.85);
      radius = random(60, 110);
      valid = true;
      
      // Check the distance from the existing circle
      for(let other of circles) {
        let d = dist(x, y, other.pattern.x, other.pattern.y);
        if(d < (radius + other.pattern.radius) * 1.2) {
          valid = false;
          break;
        }
      }
      attempts++;
    }
    
    if(valid) {
      let type = floor(random(4));
      circles.push({
        pattern: new CirclePattern(x, y, radius, 30),
        type: type
      });
    }
  }
}

function draw() {
  push();
  noStroke();
  // Create a gradient background
  for(let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(
      color(128, 139, 140, 100),  // Top color
      color(150, 139, 140, 100),  // Bottom color
      inter
    );
    fill(c);
    rect(0, y, width, 1);
  }
  pop();

  time += 0.01;

// Generate flow field using Perlin noise
let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      // Calculate angle using 3D Perlin noise
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
     // Create vector from angle
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.5); // Set vector magnitude
      flowField[index] = v;
      xoff += inc; // Increment x offset
    }
    yoff += inc; // Increment y offset
  }
  zoff += 0.0003; // Slowly increment z offset for animation
  
  // Update and display flow particles
  for (let particle of flowParticles) {
    particle.follow(flowField); // Make particle follow flow field
    particle.update(); // Update particle position
    particle.edges();  // Check and handle edges
    particle.show();  // Display particle
  }
  // Draw waves
  waves.forEach(wave => wave.display());
  
  particles.forEach(particle => {
    particle.update();
    particle.display();
  });

  circles.forEach(circle => {
    circle.pattern.handleMouseInteraction();
  });

  // Update the position before drawing the circle
  circles.forEach(circle => {
    switch(circle.type) {
    }
  });

  // Draw all circles
  circles.forEach(circle => {
    switch(circle.type) {
      case 0:
        circle.pattern.display();
        break;
      case 1:
        circle.pattern.displaySecondCircle();
        break;
      case 2:
        circle.pattern.displayThirdCircle();
        break;
      case 3:
        circle.pattern.displayFourthCircle();
        break;
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Dynamically adjust the number of circles based on the screen area
  numCircles = floor((width * height) / 50000);
  
  // Adjust the circle size range according to the screen size
  let minRadius = width * 0.05;
  let maxRadius = width * 0.1;
  
  // Empty existing circle
  circles = [];
  
  // Recreate the circle
  for(let i = 0; i < numCircles; i++) {
    let x, y, radius;
    let attempts = 0;
    let valid = false;
    
    while(!valid && attempts < 100) {
      x = random(width * 0.1, width * 0.9);
      y = random(height * 0.1, height * 0.9);
      // Use dynamic calculations of the radius range
      radius = random(minRadius, maxRadius);
      valid = true;
      
      for(let other of circles) {
        let d = dist(x, y, other.pattern.x, other.pattern.y);
        if(d < (radius + other.pattern.radius) * 1.5) {
          valid = false;
          break;
        }
      }
      attempts++;
    }
    
    if(valid) {
      let type = floor(random(4));
      circles.push({
        pattern: new CirclePattern(x, y, radius, 30),
        type: type
      });
    }
  }
}
// Flow Particle class
class FlowParticle {
  constructor() {
    this.pos = createVector(random(width), random(height)); // Random initial position
    this.vel = createVector(0, 0); // Initial velocity vector
    this.acc = createVector(0, 0); // Initial acceleration vector
    this.maxSpeed = 2; // Maximum speed limit
    this.prevPos = this.pos.copy(); // Store previous position for trail effect
     // Add color properties
     this.alpha = random(1, 2); // Trail transparency, adjustable range
     this.strokeWeight = random(0.1, 0.3); // Line thickness, adjustable range
  }
  
  update() {
    this.vel.add(this.acc); // Add acceleration to velocity
    this.vel.limit(this.maxSpeed); // Limit velocity to max speed
    this.pos.add(this.vel);// Update position based on velocity
    this.acc.mult(0); // Reset acceleration
  }
  
  follow(vectors) {
    // Calculate grid position
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    // Get force from flow field
    let force = vectors[index];
    if (force) {
      this.applyForce(force);
    }
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  show() {
    // Check whether there is a collision with the circle
    let canDraw = true;
    for (let circle of circles) {
      let d = dist(this.pos.x, this.pos.y, circle.pattern.x, circle.pattern.y);
      if (d < circle.pattern.radius * 1.2) {
        canDraw = false;
        break;
      }
    }
    
    if (canDraw) {
      stroke(255,  this.alpha);
      strokeWeight(this.strokeWeight);
     // Draw a tail with gradient transparency
     let steps = 5;  // Tail segment number
     for(let i = 0; i < steps; i++) {
       let alpha = map(i, 0, steps, this.alpha, 0);  // Opacity gradients from this.alpha to 0
       stroke(255, alpha);
       let x = lerp(this.prevPos.x, this.pos.x, i/steps);
       let y = lerp(this.prevPos.y, this.pos.y, i/steps);
       let nextX = lerp(this.prevPos.x, this.pos.x, (i+1)/steps);
       let nextY = lerp(this.prevPos.y, this.pos.y, (i+1)/steps);
       line(x, y, nextX, nextY);
     }
   }
    this.updatePrev();
  }
  
  updatePrev() {
// Update the previous position of the particle
// Used to create a continuous motion trajectory effect
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
// Handle particles reaching the edge of the canvas
// When the particle exceeds the canvas boundary, it is transmitted to the opposite edge
// Create an infinite loop effect

    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}

class Wave {
  constructor(amplitude, frequency, yBase, color) {
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.yBase = yBase;
    this.color = color;
    this.offset = random(1000);
  }
  
  display() {
    noFill();
    stroke(this.color);
    strokeWeight(2);
    beginShape();
    
    for (let x = 0; x <= width; x += 10) {
      let xoff = (x * this.frequency) + this.offset;
      let yoff = time * 0.5;
      let y = this.yBase + 
              this.amplitude * noise(xoff, yoff);
      
      // Check for collision with the circle
      let finalY = y;
      circles.forEach(circle => {
        let d = dist(x, y, circle.pattern.x, circle.pattern.y);
        // Modify the collision detection distance
        let collisionRadius = circle.pattern.radius * 0.3;
        
        if (d < collisionRadius) {
          let angle = atan2(y - circle.pattern.y, x - circle.pattern.x);
          // Modify the distance of the wave around the circle
          let deflectionDistance = circle.pattern.radius * 0.8;  // 1.2 改为更大的数值会让波浪绕得更远
          let newY = circle.pattern.y + sin(angle) * deflectionDistance;
          
          // Modify the smoothness of the transition
          let t = map(d, 0, collisionRadius, 1, 0);  // 第二个参数改小会让过渡更平滑
          finalY = lerp(y, newY, t);
        }
      });
      
      vertex(x, finalY);
    }
    
    endShape();
    this.offset += 0.005;
  }
}

// particle class
class Particle {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 5);
    this.speed = random(0.5, 2);
    this.offset = random(1000);
  }
  
  update() {
    let xoff = this.offset;
    let yoff = this.offset + 1000;
    // Update position using Perlin noise for smooth random movement
    this.x += map(noise(xoff, time), 0, 1, -this.speed, this.speed);
    this.y += map(noise(yoff, time), 0, 1, -this.speed, this.speed);
    
    // Check canvas boundaries
    if (this.x < 0 || this.x > width || 
        this.y < 0 || this.y > height) {
      this.reset();
    }
    
    // Check collision with circles
    circles.forEach(circle => {
      let d = dist(this.x, this.y, circle.pattern.x, circle.pattern.y);
      if (d < circle.pattern.radius * 1.2) {
        this.reset();
      }
    });
  }
  
  display() {
    noStroke();
    fill(255, 50);
    ellipse(this.x, this.y, this.size);
  }
}

class CirclePattern {
  constructor(x, y, radius, points) {
    // Basic properties
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.points = points;
    // Add velocity and acceleration properties
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    // Store original position
    this.originalX = x;
    this.originalY = y;
    // Perlin noise offsets
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
  }
  
  addPerlinEffect() {
    // Add organic movement effect using Perlin noise
    stroke(255,80);
    noFill();
    beginShape();
    for(let i = 0; i < TWO_PI; i += 0.05) {
      // Calculate base circle points
      let x = this.x + this.radius * cos(i);
      let y = this.y + this.radius * sin(i);
      
      // Apply Perlin noise displacement
      let n = noise(x * 0.05, y * 0.05, time);
      let dx = cos(i) * n * 20;
      let dy = sin(i) * n * 20;
      
      vertex(x + dx, y + dy);
    }
    endShape(CLOSE);
  }

  // Methods for different circle variations
  display() {
    // First circle variation - basic pattern with inner points
    let angleStep = TWO_PI / this.points;
    fill("#B1B9B9");
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);

    for (let i = 0; i < this.points; i++) {
      let angle = i * angleStep;
      let x1 = this.x + cos(angle) * this.radius;
      let y1 = this.y + sin(angle) * this.radius;
      stroke(255);
      strokeWeight(0.5);
      line(this.x, this.y, x1, y1);

      let innerRadius = this.radius / 2;
      let x2 = this.x + cos(angle) * innerRadius;
      let y2 = this.y + sin(angle) * innerRadius;
      fill(255, 50);
      ellipse(x2, y2, 3);
      stroke(255, 150);
      line(x1, y1, x2, y2);
    }
    this.addPerlinEffect();
  }

  // Second circle variation - larger with black lines
  displaySecondCircle() {
    let angleStep = TWO_PI / this.points;
    fill("#7D8B8C");
    noStroke();
    ellipse(this.x, this.y, this.radius * 1.2, this.radius * 1.2);

    for (let i = 0; i < this.points; i++) {
      let angle = i * angleStep;
      let x1 = this.x + cos(angle) * this.radius;
      let y1 = this.y + sin(angle) * this.radius;
      stroke(0);
      strokeWeight(0.5);
      line(this.x, this.y, x1, y1);
      ellipse(x1, y1, 4);
    }
    this.addPerlinEffect();
  }

  // Third circle variation - warm colors
  displayThirdCircle() {
    let angleStep = TWO_PI / this.points;
    fill("#F2BF80");
    noStroke();
    ellipse(this.x, this.y, this.radius * 1.4, this.radius * 1.4);

    for (let i = 0; i < this.points; i++) {
      let angle = i * angleStep;
      let x1 = this.x + cos(angle) * this.radius;
      let y1 = this.y + sin(angle) * this.radius;
      stroke("#D99D8F");
      strokeWeight(0.5);
      line(this.x, this.y, x1, y1);
      ellipse(x1, y1, 4);
    }
    this.addPerlinEffect();
  }

  // Fourth circle variation - largest with yellow tint
  displayFourthCircle() {
    let angleStep = TWO_PI / this.points;
    fill("#F2D888");
    noStroke();
    ellipse(this.x, this.y, this.radius * 1.6, this.radius * 1.6);

    for (let i = 0; i < this.points; i++) {
      let angle = i * angleStep;
      let x1 = this.x + cos(angle) * this.radius;
      let y1 = this.y + sin(angle) * this.radius;
      stroke("#555E5F");
      strokeWeight(0.5);
      line(this.x, this.y, x1, y1);
      ellipse(x1, y1, 4);
    }
    this.addPerlinEffect();
  }

  handleMouseInteraction() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < mouseInfluenceRadius) {
    // Use Perlin noise for natural repulsion force variation
    let noiseVal = noise(
      this.noiseOffsetX,
      this.noiseOffsetY,
      time * 0.5  // Reduce time influence
    );
    
    // Map noise value to force range
    let force = map(d, 0, mouseInfluenceRadius, maxRepelForce * 2, 0);
    force *= map(noiseVal, 0, 1, 0.8, 1.2);  // Add natural variation
    
    // Calculate avoidance angle
    let angle = atan2(this.y - mouseY, this.x - mouseX);
    // Add slight angle perturbation
    angle += map(noiseVal, 0, 1, -PI/16, PI/16);
    
    // Apply force
    this.acc.x += cos(angle) * force;
    this.acc.y += sin(angle) * force;
  }
  
  // Use Perlin noise to affect return force
  let returnForce = createVector(
    this.originalX - this.x,
    this.originalY - this.y
  );
  let returnNoiseVal = noise(
    this.noiseOffsetX + 1000,
    this.noiseOffsetY + 1000,
    time * 0.3
  );
  returnForce.mult(0.15 * map(returnNoiseVal, 0, 1, 0.8, 1.2));
  this.acc.add(returnForce);
  
  // Update velocity and position
  this.vel.add(this.acc);
  this.vel.mult(0.75);  // Add damping effect
  this.x += this.vel.x;
  this.y += this.vel.y;
  
  // Reset acceleration
  this.acc.mult(0);
  
  // Update noise offsets
  this.noiseOffsetX += 0.003;  // Reduce offset speed
  this.noiseOffsetY += 0.003;
}
}

