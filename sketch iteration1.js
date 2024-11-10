function setup() {
  createCanvas(windowWidth, windowHeight);
  background(128, 139, 140);
  noLoop(); 

  //Jiaqi
  new CircularGradientWithRays(width/2-195, height/2-195, 65).display();
  new DotAndLineSquare(width/2-130, height/2-260, 130, 130).display();
  new GradientRingWithLinesAndHoles(width/2-65, height/2-65, 65, 20).display(); 
  new ComplexCircleWithDotsAndShapes(width/2-195, height/2-65, 65).display();

  //Elia
  new PatternedCircle(width/2+195, height/2-195, 65).display();
  new ConcentricCircle(width/2+195, height/2-65, 65).display();
  new BisectorCircle(width/2+195, height/2+65, 65).display();
  new RoundpieCircle(width/2+195, height/2+195, 65).display();
  
  //Luna
  new RadiantCircle(width/2-195, height/2+195).display();
  new RadiantCircleWithRays(width/2-65, height/2+65).display(); 
  new RadiantRaysWithConcentricCircles(width/2-195, height/2+65, 2).display();
  new OuterDots(width/2-195, height/2+65, 65, 30).display();
  new RadiantRaysWithTargetCircles(width/2-65, height/2+195).display();
  new CrossLines(width/2-65, height/2+195, 65).display();
  new OuterDots2(width/2-65, height/2+195, 65, 12).display();
  
  //Yixing
  let pattern = new CirclePattern(width/2+65, height/2-195, 65, 30);
  pattern.display();
  let pattern2 = new CirclePattern(width/2+65, height/2-65, 65, 30);
  pattern2.displaySecondCircle();
  let pattern3 = new CirclePattern(width/2+65, height/2+65, 65, 30);
  pattern3.displayThirdCircle();
  let pattern4 = new CirclePattern(width/2+65, height/2+195, 65, 30);
  pattern4.displayFourthCircle();
}

function draw() {
  translate(width / 2, height / 2);
}

class CircularGradientWithRays {
  constructor(cx, cy, r) {
    // Center coordinates and radius
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.colors = [
      // Gradient array
      color(231, 209, 170), color(195, 151, 125), color(173, 135, 134),
      color(135, 134, 138), color(101, 114, 127), color(117, 141, 160),
      color(142, 166, 171), color(165, 186, 187), color(224, 236, 217),
      color(230, 229, 204)
    ];
  }

  display() {
    let numSegments = 200;// Number of gradient segments
    let angleStep = TWO_PI / numSegments;

    for (let i = 0; i < numSegments; i++) {
      let inter = map(i, 0, numSegments, 0, 1);
      let colorIndex = floor(inter * (this.colors.length - 1));
      let c = lerpColor(
        this.colors[colorIndex], 
        this.colors[colorIndex + 1], 
        (inter * (this.colors.length - 1)) % 1
      );
      fill(c);
      noStroke();
      arc(
        this.cx, this.cy, this.r * 2, this.r * 2, 
        i * angleStep, (i + 1) * angleStep, PIE
      );
    }

    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < 60; i++) {
      let angle = i * (TWO_PI / 60);
      let xEnd = this.cx + cos(angle) * this.r;
      let yEnd = this.cy + sin(angle) * this.r;
      line(this.cx, this.cy, xEnd, yEnd);
    }
  }
}
class DotAndLineSquare {
  constructor(x,y,w,h){
    // Properties of a square
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // Properties of dots
    this.dotSpacing = 10;
    this.largeDotSpacing = 20;
    this.largeDotRadius = 12;
    this.smallDotRadius = 4;
  }
  display(){
    // Draw the top half of the small dot array
  for (let j = 0; j < this.h / 2; j += this.dotSpacing) {
    let offset = (j / this.dotSpacing) % 2 === 0 ? 0 : this.dotSpacing / 2;
    for (let i = 0; i < this.w / 2; i += this.dotSpacing) {
      fill(0);
      noStroke();
      ellipse(this.x + i + offset, this.y + j, this.smallDotRadius, this.smallDotRadius);
    }
  }
  // Draw the large dot array for the bottom half
  for (let i = 0; i < this.w / 2; i += this.largeDotSpacing) {
    for (let j = this.h / 2; j < this.h; j += this.largeDotSpacing) {
      fill(0);
      noStroke();
      ellipse(this.x + i + this.largeDotSpacing / 2, this.y + j, this.largeDotRadius, this.largeDotRadius);
    }
  }
// Draw a vertical line for the right half
  stroke(0);
  strokeWeight(1);
  for (let i = this.w / 2; i < this.w; i += 8) {
    line(this.x + i, this.y, this.x + i, this.y + this.h);
  }
  line(this.x + this.w / 2, this.y + this.h / 4, this.x + this.w, this.y + this.h / 4);
  line(this.x + this.w / 2, this.y + (3 * this.h) / 4, this.x + this.w, this.y + (3 * this.h) / 4);
}
}
class GradientRingWithLinesAndHoles {
  constructor(cx, cy, outerR, thickness) {
    // Properties of the ring
    this.cx = cx;
    this.cy = cy;
    this.outerR = outerR;
    this.thickness = thickness;
    this.colors = [
      color(240, 240, 240), color(180, 180, 180), color(100, 100, 100),
      color(60, 60, 60), color(173,135,134), color(135,134,138),
      color(101,114,127), color(117,141,160), color(142,166,171),
      color(165,186,187), color(224,236,217)
    ];
  }

  display() {
    let numSegments = 100;// Number of gradient segments
    let angleStep = TWO_PI / numSegments;
    // Draw a gradient ring
    for (let i = 0; i < numSegments; i++) {
      let inter = map(i, 0, numSegments, 0, 1);
      let colorIndex = floor(inter * (this.colors.length - 1));
      let c = lerpColor(this.colors[colorIndex], this.colors[colorIndex + 1], (inter * (this.colors.length - 1)) % 1);
      fill(c);
      noStroke();
      arc(this.cx, this.cy, this.outerR * 2, this.outerR * 2, i * angleStep, (i + 1) * angleStep, PIE);
    }
    // Draw the inner circle
    let innerRadius = (this.outerR - this.thickness) * 1.3 / 2;
    fill(128, 139, 140);
    noStroke();
    ellipse(this.cx, this.cy, (this.outerR - this.thickness) * 1.3);
    // Draw radial lines
    stroke(0);
    for (let i = 0; i < numSegments; i++) {
      let angle = i * angleStep;
      let xStart = this.cx + cos(angle) * innerRadius;
      let yStart = this.cy + sin(angle) * innerRadius;
      let xEnd = this.cx + cos(angle) * this.outerR;
      let yEnd = this.cy + sin(angle) * this.outerR;
      line(xStart, yStart, xEnd, yEnd);
    }
    // Draw holes
    for (let i = 0; i < 15; i++) {
      let angle = random(TWO_PI);
      let distance = random(innerRadius, this.outerR);
      let holeX = this.cx + cos(angle) * distance;
      let holeY = this.cy + sin(angle) * distance;
      fill(128, 139, 140);
      noStroke();
      ellipse(holeX, holeY, random(3, 10));
    }
  }
}
class ComplexCircleWithDotsAndShapes {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.dotColors = [
      color(100, 100, 100), color(220, 180, 180), color(101, 114, 127),
      color(6, 5, 6), color(191, 194, 195), color(217, 184, 155)
    ];
    // Properties of overlay circles
    this.overlayCircles = [
      {x: cx + 30, y: cy - 20, size: r * 0.8, color: color(224, 177, 165, 120)},
      {x: cx + 40, y: cy + 20, size: r * 0.6, color: color(231, 209, 170, 100)},
      {x: cx + 20, y: cy + 10, size: r * 0.3, color: color(230, 229, 204, 80)},
      {x: cx + 25, y: cy - 30, size: r * 0.8, color: color(142, 166, 171, 80)},
      {x: cx + 10, y: cy + 40, size: r * 0.6, color: color(101, 114, 127, 150)}
    ];
  }

  display() {
    stroke(0);
    strokeWeight(1);
    noFill();
    ellipse(this.cx, this.cy, this.r * 2);
    // Draw a dot pattern
    let dotSize = 15;
    let dotSpacing = 20;
    let colorIndex = 0;
    // Draw a colored dot matrix inside the circle
    for (let j = -2; j <= 2; j++) {
      for (let i = -1; i <= 1; i++) {
        let xPos = this.cx - this.r / 2 + i * dotSpacing;
        let yPos = this.cy + j * dotSpacing;
        if (dist(xPos, yPos, this.cx, this.cy) < this.r) {
          fill(this.dotColors[colorIndex % this.dotColors.length]);
          noStroke();
          ellipse(xPos, yPos, dotSize);
          colorIndex++;
        }
      }
    }
    // Draw a translucent overlay circle
    for (let circle of this.overlayCircles) {
      fill(circle.color);
      noStroke();
      ellipse(circle.x, circle.y, circle.size);
    }
  }
}

//Elia
class PatternedCircle {
  constructor(centerX, centerY, maxRadius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.maxRadius = maxRadius;
    this.colors = [
      [231, 209, 170], [195, 151, 125], [173, 135, 134],
      [135, 134, 138], [101, 114, 127], [117, 141, 160],
      [142, 166, 171], [165, 186, 187], [224, 236, 217],
      [230, 229, 204]
    ];
  }

  display() {
    // Define four main Angle points
    let angles = [PI / 2, PI, (3 * PI) / 2, TWO_PI];
    // Draw concentric circle layers from outside to inside
    for (let r = this.maxRadius; r > 0; r -= 20) {
      // Draw four sector areas
      for (let i = 0; i < 4; i++) {
        let randomColor = random(this.colors);
        fill(randomColor);
        stroke(0);
        beginShape();
        // Draw the sector path
        for (let angle = (i * PI) / 2; angle <= angles[i]; angle += 0.01) {
          let x = this.centerX + cos(angle) * r;
          let y = this.centerY + sin(angle) * r;
          vertex(x, y);
        }
        vertex(this.centerX, this.centerY);
        endShape(CLOSE);
      }
    }
    // Draw a cross line
    stroke(0);
    strokeWeight(1);
    line(this.centerX - this.maxRadius, this.centerY, this.centerX + this.maxRadius, this.centerY);
    line(this.centerX, this.centerY - this.maxRadius, this.centerX, this.centerY + this.maxRadius);
    // Add random points to decorate
    for (let i = 0; i < 200; i++) {
      let angle = random(TWO_PI);
      let radius = random(this.maxRadius);
      let x = this.centerX + cos(angle) * radius;
      let y = this.centerY + sin(angle) * radius;
      stroke(0, 50);
      point(x, y);
    }

    for (let i = 0; i < 2; i++) {
      let randomColor = random(this.colors);
      fill(randomColor);
      stroke(2);
      let x = this.centerX + (i === 0 ? -this.maxRadius * 0.5 : this.maxRadius * 0.5);
      let y = this.centerY + (i === 0 ? -this.maxRadius * 0.5 : this.maxRadius * 0.5);
      ellipse(x, y, i === 0 ? 30 : 50);
    }
  }
}

class BisectorCircle {
  constructor(centerX, centerY) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.colors = [
      [231, 209, 170], [195, 151, 125], [173, 135, 134],
      [135, 134, 138], [101, 114, 127], [117, 141, 160],
      [142, 166, 171], [165, 186, 187], [224, 236, 217],
      [230, 229, 204]
    ];
    this.layers = 15;
    this.petals = 12;
    this.maxRadius = 65;
  }

  display() {
    for (let i = 0; i < this.layers; i++) {
      // Calculate the radius of the current layer
      let layerRadius = map(i, 0, this.layers, 10, this.maxRadius);
      // Add random angular offset
      let angleOffset = random(0, TWO_PI);

      for (let j = 0; j < this.petals; j++) {
        let angleStart = j * (TWO_PI / this.petals) + angleOffset;
        let angleEnd = angleStart + TWO_PI / this.petals - 0.1;
        let col = this.colors[int(random(this.colors.length))];
        
        fill(col[0], col[1], col[2]);
        noStroke();
        arc(this.centerX, this.centerY, layerRadius * 2, layerRadius * 2, angleStart, angleEnd, PIE);
      }
    }
  }
}

class RoundpieCircle {
  constructor(centerX, centerY, maxRadius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.maxRadius = maxRadius;
    this.layers = 10;
    this.colors = [
      [231, 209, 170], [195, 151, 125], [173, 135, 134],
      [135, 134, 138], [101, 114, 127], [117, 141, 160],
      [142, 166, 171], [165, 186, 187], [224, 236, 217],
      [230, 229, 204]
    ];
  }

  display() {
    // Draw circular layers from outside to inside
    for (let i = this.layers; i > 0; i--) {
      // Calculate the radius of the current layer
      let radius = map(i, 0, this.layers, 0, this.maxRadius);
      // Determine the number of segments randomly
      let segments = int(random(5, 20));
      let angleStep = TWO_PI / segments;
      // Draw segments
      for (let j = 0; j < segments; j++) {
        // Calculate the range of angles for each segment
        let angleStart = j * angleStep;
        let angleEnd = angleStart + angleStep;
        let col = this.colors[int(random(this.colors.length))];
        // Draw the sector
        fill(col[0], col[1], col[2]);
        arc(this.centerX, this.centerY, radius * 2, radius * 2, angleStart, angleEnd, PIE);
      }
    }
  }
}

class ConcentricCircle {
  constructor(centerX, centerY, maxRadius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.maxRadius = maxRadius;
    this.colors = [
      color(231, 209, 170),
      color(195, 151, 125),
      color(173, 135, 134),
      color(135, 134, 138),
      color(101, 114, 127),
      color(117, 141, 160),
      color(142, 166, 171),
      color(165, 186, 187),
      color(224, 236, 217),
      color(230, 229, 204)
    ];
  }

  display() {
    // Draw gradual concentric circles from outside to inside
    for (let r = this.maxRadius; r > 0; r -= 15) {
      let colorIndex = floor(map(r, 0, this.maxRadius, 0, this.colors.length - 1));
      fill(this.colors[colorIndex]);
      noStroke();
      ellipse(this.centerX, this.centerY, r * 2);
    }
    // Add radial lines for visual effect
    stroke(0);
    strokeWeight(0.5);
    for (let angle = 0; angle < TWO_PI; angle += PI / 12) {
      let x2 = this.centerX + cos(angle) * this.maxRadius;
      let y2 = this.centerY + sin(angle) * this.maxRadius;
      line(this.centerX, this.centerY, x2, y2);
    }
    // Draw the center point
    fill(0);
    noStroke();
    ellipse(this.centerX, this.centerY, 5, 5);
  }
}

class RadiantCircle {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.numRays = 30;
    this.maxRadius = 65;
    this.innerRadius = 20;
  }

  display() {
    // Create a radial dot matrix effect
    for (let i = 0; i < this.numRays; i++) {
      let angle = map(i, 0, this.numRays, 0, TWO_PI);
      // Draw points of gradient size on each ray
      for (let r = this.innerRadius; r < this.maxRadius; r += random(8,12)) {
        let x = this.cx + cos(angle) * r;
        let y = this.cy + sin(angle) * r;
        //The size of the point varies with distance
        let dotSize = map(r, this.innerRadius, this.maxRadius, 3, 8);
        fill(0);
        noStroke();
        ellipse(x, y, dotSize, dotSize);
      }
    }
    
    fill(0);
    noStroke();
    ellipse(this.cx, this.cy, 3, 3);
  }
}
class RadiantCircleWithRays {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.numRays = 50;
    this.maxRadius = 65;
  }

  display() {
    fill(150, 170, 180, 200);
    ellipse(this.cx-30, this.cy-30, 50, 50);
    fill(173,135,134);
    ellipse(this.cx+30, this.cy+10, 40, 40);
    fill(213, 177, 146);
    ellipse(this.cx-30, this.cy+30, 20, 20);

    for (let i = 0; i < this.numRays; i++) {
      let angle = map(i, 0, this.numRays, 0, TWO_PI);
      let endX = this.cx + cos(angle) * this.maxRadius;
      let endY = this.cy + sin(angle) * this.maxRadius;
      
      strokeWeight(1);
      stroke(3);
      line(this.cx, this.cy, endX, endY);
    }
    
    fill(0);
    noStroke();
    ellipse(this.cx, this.cy, 50, 50);
    fill(128, 139, 140);
    ellipse(this.cx, this.cy, 40, 40);
  }
}

class RadiantRaysWithConcentricCircles {
  constructor(cx, cy, radiusCount) {
    this.cx = cx;
    this.cy = cy;
    this.radiusCount = radiusCount;
    this.numRays = 30;
    this.radiusStep = 25;
    this.maxRadius = 65;
  }

  display() {
    fill(0);
    stroke(0);
    ellipse(this.cx, this.cy, this.radiusStep * 4, this.radiusStep * 4);
    // Create a gradient ring effect
    let numSegments = 360;
    for (let i = 0; i < numSegments; i++) {
      let angleStart = map(i, 0, numSegments, 0, TWO_PI);
      let angleEnd = map(i + 1, 0, numSegments, 0, TWO_PI);
      let gradientColor = this.getGradientColor(i, numSegments);
      fill(gradientColor);
      noStroke();
      arc(this.cx, this.cy, this.radiusStep * 5, this.radiusStep * 5, angleStart, angleEnd, PIE);
    }
    // Add radial lines
    for (let i = 0; i < this.numRays; i++) {
      let angle = map(i, 0, this.numRays, 0, TWO_PI);
      let endX = this.cx + cos(angle) * this.maxRadius;
      let endY = this.cy + sin(angle) * this.maxRadius;
      stroke(0);
      strokeWeight(1);
      line(this.cx, this.cy, endX, endY);
    }

    fill(0);
    noStroke();
    ellipse(this.cx, this.cy, 6, 6);
  }
  // Auxiliary method for obtaining gradient color
  getGradientColor(index, totalSegments) {
    let colors = [
      color(231,209,170), color(195,151,125), color(173,135,134),
      color(135,134,138), color(181,114,127), color(117,141,160),
      color(142,166,171), color(165,186,187), color(224,236,217),
      color(230,229,204)
    ];
    
    let segment = index / (totalSegments / (colors.length - 1));
    let colorIndex = floor(segment);
    let t = segment - colorIndex;
    return lerpColor(colors[colorIndex], colors[colorIndex + 1], t);
  }
}

class OuterDots {
  constructor(cx, cy, radius, numDots) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.numDots = numDots;
  }
  // Evenly distributed points on the circumference
  display() {
    for (let i = 0; i < this.numDots; i++) {
      // Calculate the angular position of each point
      let angle = map(i, 0, this.numDots, 0, TWO_PI);
      // Calculate the coordinates of the point
      let dotX = this.cx + cos(angle) * this.radius;
      let dotY = this.cy + sin(angle) * this.radius;

      fill(0);
      noStroke();
      ellipse(dotX, dotY, 5, 5);
    }
  }
}
class RadiantRaysWithTargetCircles {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.radiusStep = 20;
  }

  display() {
    fill(0);
    stroke(0);
    ellipse(this.cx, this.cy, this.radiusStep, this.radiusStep);
    // Create a gradient ring effect
    let numSegments = 360;
    for (let i = 0; i < numSegments; i++) {
      let angleStart = map(i, 0, numSegments, 0, TWO_PI);
      let angleEnd = map(i + 1, 0, numSegments, 0, TWO_PI);
      let gradientColor = this.getGradientColor(i, numSegments);
      fill(gradientColor);
      noStroke();
      arc(this.cx, this.cy, this.radiusStep * 5, this.radiusStep * 5, angleStart, angleEnd, PIE);
    }
       noFill();
    stroke(0);
    strokeWeight(0.3);
    for (let i = 40; i <= 120; i += 20) {
      ellipse(this.cx, this.cy, i, i);
    }
  }

  getGradientColor(index, totalSegments) {
    let colors = [
      color(231,209,170), color(195,151,125), color(173,135,134),
      color(135,134,138), color(181,114,127), color(117,141,160),
      color(142,166,171), color(165,186,187), color(224,236,217),
      color(230,229,204)
    ];
    
    let segment = index / (totalSegments / (colors.length - 1));
    let colorIndex = floor(segment);
    let t = segment - colorIndex;
    return lerpColor(colors[colorIndex], colors[colorIndex + 1], t);
  }
}

class OuterDots2 {
  constructor(cx, cy, radius, numDots) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.numDots = numDots;
  }
  // Create a double layer dot effect
  display() {
    for (let i = 0; i < this.numDots; i++) {
      let angle = map(i, 0, this.numDots, 0, TWO_PI);
      let dotX = this.cx + cos(angle) * this.radius;
      let dotY = this.cy + sin(angle) * this.radius;
      let dotX2 = this.cx + sin(angle) * this.radius / 1.5;
      let dotY2 = this.cy + cos(angle) * this.radius / 1.5;

      fill(0);
      noStroke();
      ellipse(dotX, dotY, 8, 8);
      ellipse(dotX2, dotY2, 5, 5);
    }
  }
}

class CrossLines {
  constructor(cx, cy, lineLength) {
    this.cx = cx;
    this.cy = cy;
    this.lineLength = lineLength;
  }

  display() {
    stroke(0);
    strokeWeight(0.5);
    line(this.cx - this.lineLength, this.cy, this.cx + this.lineLength, this.cy);
    line(this.cx, this.cy - this.lineLength, this.cx, this.cy + this.lineLength);
  }
}

class SpiralPattern {
  // Core parameters of the spiral pattern
  constructor(cx, cy, numTurns, maxRadius) {
    this.cx = cx;
    this.cy = cy;
    this.numTurns = numTurns;
    this.maxRadius = maxRadius;
    this.colors = [
      color(143, 114, 103),
      color(116, 119, 188),
      color(174, 163, 116),
      color(108, 116, 117)
    ];
  }

  display() {
    noFill();
    // Control the fineness of the spiral
    let angleStep = 0.1;
    // Calculate the radius increment at each step
    let radiusStep = this.maxRadius / (this.numTurns * TWO_PI / angleStep);
    // Create a gradient spiral effect
    for (let angle = 0; angle < this.numTurns * TWO_PI; angle += angleStep) {
      let radius = angle * radiusStep;
      let x = this.cx + cos(angle) * radius;
      let y = this.cy + sin(angle) * radius;
      // Choose the color according to the Angle
      let colorIndex = floor((angle / TWO_PI) % this.colors.length);
      stroke(this.colors[colorIndex]);
      strokeWeight(2);
      point(x, y);
    }
  }
}

class RectangularPattern {
  constructor(x, y, w, h, numRects) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.numRects = numRects;
    this.colors = [
      color(101, 114, 127),
      color(135, 134, 138),
      color(224, 236, 217),
      color(230, 229, 204)
    ];
  }

  display() {
    // Create a gradient effect for rotating rectangles
    for (let i = 0; i < this.numRects; i++) {
      // Calculate the interpolation factor
      let inter = map(i, 0, this.numRects, 0, 1);
      // Calculate the color index and gradient
      let colorIndex = floor(inter * (this.colors.length - 1));
      fill(lerpColor(this.colors[colorIndex], this.colors[colorIndex + 1], inter));
      noStroke();
      // Apply rotation and scaling transforms
      push();
      translate(this.x + this.w / 2, this.y + this.h / 2);
      rotate(inter * PI);
      rectMode(CENTER);
      // Draw a decreasing rectangle
      rect(0, 0, this.w * (1 - inter), this.h * (1 - inter));
      pop();
    }
  }
}

class CirclePattern {
  constructor(x, y, radius, points) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.points = points;
  }

  display() {
    // First variant: Basic dot and line pattern
    let angleStep = TWO_PI / this.points;
    fill("#B1B9B9");
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);
    // Create a combination of radial lines and points
    for (let i = 0; i < this.points; i++) {
      let angle = i * angleStep;
      let x1 = this.x + cos(angle) * this.radius;
      let y1 = this.y + sin(angle) * this.radius;
      stroke(255);
      strokeWeight(0.5);
      line(this.x, this.y, x1, y1);
      // Inner point location and drawing
      let innerRadius = this.radius / 2;
      let x2 = this.x + cos(angle) * innerRadius;
      let y2 = this.y + sin(angle) * innerRadius;
      fill(255, 50);
      ellipse(x2, y2, 3);
      stroke(255, 150);
      line(x1, y1, x2, y2);
    }
  }
  // Second variant: radial pattern
  displaySecondCircle() {
    let angleStep = TWO_PI / this.points;
    fill("#7D8B8C");
    noStroke();
    ellipse(this.x, this.y, this.radius * 1.2, this.radius * 1.2);
    // Create evenly distributed points and lines
    for (let i = 0; i < this.points; i++) {
      let angle = i * angleStep;
      let x1 = this.x + cos(angle) * this.radius;
      let y1 = this.y + sin(angle) * this.radius;

      stroke(0);
      strokeWeight(0.5);
      line(this.x, this.y, x1, y1);
      // Add small dots at the end of the line
      ellipse(x1, y1, 4);
    }
  }
// Third variant: warm tone radiating pattern
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
  }
  // Fourth variant
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
  }
}
