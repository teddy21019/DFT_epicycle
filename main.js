// code ref from https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_130_Fourier_Transform_3/P5/sketch.js

let time = 0;
let speed = 0.1;
let path = [];


function setup() {
  createCanvas(700, 700);

  // sort by radius for better visualization
  fourier.sort((a, b) => b.amp - a.amp);
}

function draw() {
  background(255);

  let v = epicycles(width / 2, height / 2, 0, fourier);
  path.unshift(v);

  beginShape();
  strokeWeight(4)
  stroke('rgb(90,137,100)');
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourier.length * speed;
  time += dt;
  
  if (time > TWO_PI) {
    time = 0;
    path = [];
  }

}
function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    strokeWeight(1)

    stroke('rgb(200,200,200)');
    noFill();
    ellipse(prevx, prevy, radius * 2);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}
