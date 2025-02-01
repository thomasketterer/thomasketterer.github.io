let font;
let points = [];
function preload() {
  font = loadFont('/fonts/GloriaHallelujah-Regular.ttf');
}

function setup() {
 let canvas = createCanvas(windowWidth, 400);
 canvas.parent('sketch');
  background("#f8f8f8");
  /*for (let i = 0; i < numPoints; i++){
    let x = random(0, 600);
    let y = random(0, 600);
    points.push(new Point(x, y))
  }*/

  //setup for position and size of text
  let textx = (windowWidth / 2) - 380;
  let texty = 200;
  let textfont = 150;
  let name = ' Thomas \n\n\n\n\n\n\n\n\n Ketterer';
  //let name = str(windowWidth); 960 480

  //the x, y of the points on the outside of the letters
  let outlinePoints = font.textToPoints(name, textx, texty, textfont, { sampleFactor : .2}); 
  for (let p of outlinePoints) {
    let x = p.x;
    let y = p.y;
    points.push(new Point(x, y)); //puts all the outline points in the points set
  }

  let bounds = font.textBounds(name, textx, texty, textfont); //gives bounds of the text
  for (let i = bounds.x; i < bounds.x + bounds.w; i += 5) { //going from farthest left point to farthest right
    for (let j = bounds.y; j < bounds.y + bounds.h; j += 5) { //going from highest to lowest point
      if (isPointInShape(i, j, outlinePoints)) {
        points.push(new Point(i, j)); //determining if a point in within the bounds of the letters and adding it
      }
    }
  }
}

function draw() {
  background("#f8f8f8");

  for (let p of points) {
    p.update();
    p.display();
  }
}

class Point {
  constructor(x, y) {
    this.home = createVector(x, y); //home location
    this.pos = createVector(x, y); //current location
    this.vel = createVector(0, 0); //velocity
    this.acc = createVector(0, 0); //acceleration
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);

    //repelling
    if (distance < 30) {
      let repelForce = p5.Vector.sub(this.pos, mouse);
      repelForce.setMag(20 / distance);
      this.applyForce(repelForce);
    }

    let springForce = p5.Vector.sub(this.home, this.pos)
    springForce.mult(0.05);
    this.applyForce(springForce);

    this.vel.add(this.acc);
    this.vel.mult(0.9); 
    this.pos.add(this.vel);

    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  display() {
    stroke(50);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
  }
}

function isPointInShape(x, y, outlinePoints) {
  let inside = false;
  let n = outlinePoints.length; //total # of points outside
  
  for (let i = 0, j = n - 1; i < n; j = i++) {
    let xi = outlinePoints[i].x, yi = outlinePoints[i].y; //take one point's x, y values
    let xj = outlinePoints[j].x, yj = outlinePoints[j].y; //take a second point's x, y values

    let intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi; 
    if (intersect) inside = !inside;
  }

  return inside;
}