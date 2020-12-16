// Server
let socket = io(); //setting server

//Coundown
let testo; //valore countdown

let sliderWidth;
let inc;


////////////////COMUNICAZIONE SERVER/////////////////////////////////////
// RICEZIONE
socket.on("testoIn", updateTesto); //ricezione countdown

// UPDATE DA SERVER
function updateTesto(dataReceived) {
  testo = dataReceived //assegna a testo dati da server
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  sliderWidth = width/12*10;
}

function draw() {
  background('#f9f9f8');

  inc= 0;

  //minuto sx
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text("90'", width/12*5.5,inc+(height/7));
  text("90'", width/12*5.5,inc+(height/7+height/7));
  text("90'", width/12*5.5,inc+(height/7+2*height/7));
  text("90'", width/12*5.5,inc+(height/7+3*height/7));
  text("90'", width/12*5.5,inc+(height/7+4*height/7));
  text("90'", width/12*5.5,inc+(height/7+5*height/7));
  pop()
  //minuto dx
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text("90'", width/12*6.5,inc+(height/7));
  text("90'", width/12*6.5,inc+(height/7+height/7));
  text("90'", width/12*6.5,inc+(height/7+2*height/7));
  text("90'", width/12*6.5,inc+(height/7+3*height/7));
  text("90'", width/12*6.5,inc+(height/7+4*height/7));
  text("90'", width/12*6.5,inc+(height/7+5*height/7));
  pop()

  //testo sx
  push();
  textFont('Quicksand', BOLD);
  textAlign(RIGHT);
  textSize(25);
  fill('#887b86');
  text('POSSESSO PALLA', width/12*5,inc+(height/7));
  text('ATTACCO', width/12*5,inc+(height/7+height/7));
  text('PALLA RECUPERATA', width/12*5,inc+(height/7+2*height/7));
  text('CORNER', width/12*5,inc+(height/7+3*height/7));
  text('TIRI TOTALI', width/12*5,inc+(height/7+4*height/7));
  text('GOAL', width/12*5,inc+(height/7+5*height/7));
  pop()
  //testo dx
  push();
  textFont('Quicksand', BOLD);
  textAlign(LEFT);
  textSize(25);
  fill('#887b86');
  text('POSSESSO PALLA', width/12*7,inc+(height/7));
  text('ATTACCO', width/12*7,inc+(height/7+height/7));
  text('PALLA RECUPERATA', width/12*7,inc+(height/7+2*height/7));
  text('CORNER', width/12*7,inc+(height/7+3*height/7));
  text('TIRI TOTALI', width/12*7,inc+(height/7+4*height/7));
  text('GOAL', width/12*7,inc+(height/7+5*height/7));
  pop()

  //struttura
  push()
  rectMode(CORNER);
  fill('#887b86');
  noStroke();
  rect(width/12,inc+(height/7+height/7*0.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*1.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*2.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*3.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*4.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*5.4),sliderWidth,1,1);
  pop()

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
