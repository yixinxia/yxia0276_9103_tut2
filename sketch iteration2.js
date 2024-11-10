let time = 0;
let gridSize = 150; // Control the spacing between circles

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(128, 139, 140);
  
  // Count rows and columns
  let cols = ceil(width / gridSize);
  let rows = ceil(height / gridSize);
  
  // Calculate the actual spacing so that the circles are evenly distributed
  let spacingX = width / cols;
  let spacingY = height / rows;
  
  // Draw a circular grid
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      // Calculate the position of each circle
      let posX = x * spacingX + spacingX/2;
      let posY = y * spacingY + spacingY/2;
      
      // Select different circle styles depending on the location
      let patternType = (x + y) % 4;
      let pattern = new CirclePattern(posX, posY, 55, 30);
      
      switch(patternType) {
        case 0:
          pattern.display();
          break;
        case 1:
          pattern.displaySecondCircle();
          break;
        case 2:
          pattern.displayThirdCircle();
          break;
        case 3:
          pattern.displayFourthCircle();
          break;
      }
    }
  }
}

function draw() {
  // Update the time variable to create an animation effect
  time += 0.003;
  // Redraw everything
  setup();
}

class CirclePattern {
  constructor(x, y, radius, points) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.points = points;
  }
  // Adding Perlin noise effects
  addPerlinEffect(){
     // Draw white Perlin noise outline
     stroke(255);
     noFill();
     beginShape();
     for(let i=0; i< TWO_PI; i+=0.05){
      let x = this.x + this.radius * cos(i);
      let y = this.y + this.radius * sin(i);
      // Use noise functions to generate dynamic effects
      let n = noise(
        cos(i) * 0.8 + time * 22, 
        sin(i) * 0.8 + time * 22
      ); // Create flow effect
      let dx = cos(i) * n * 10;
      let dy = sin(i) * n * 10;
      vertex(x + dx, y + dy);
    }
    endShape(CLOSE);
  }

  display() {
    // Calculate the angular interval between points
    let angleStep = TWO_PI / this.points;
    fill("#B1B9B9");
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);
    // Draw radial lines and points
    for (let i = 0; i < this.points; i++) {
      let angle = i * angleStep;
      // Calculate the position of the outer circle point
      let x1 = this.x + cos(angle) * this.radius;
      let y1 = this.y + sin(angle) * this.radius;
      // Draw radial line
      stroke(255);
      strokeWeight(0.5);
      line(this.x, this.y, x1, y1);
      // Calculate the position of the inner circle point
      let innerRadius = this.radius / 2;
      let x2 = this.x + cos(angle) * innerRadius;
      let y2 = this.y + sin(angle) * innerRadius;
      // Draw inner circle points
      fill(255, 50);
      ellipse(x2, y2, 3);
      stroke(255, 150);
      line(x1, y1, x2, y2);
    }

    this.addPerlinEffect();
  }

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
}