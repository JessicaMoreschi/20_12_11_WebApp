let datipartitaImg;
let sliderWidth;
let ppTM1 = 50;
let ppTM2 = 50;
let attTM1 = 50;
let attTM2 = 50;
let prTM1 = 50;
let prTM2 = 50;
let corTM1 = 0;
let corTM2 = 0;
let ttTM1 = 0;
let ttTM2 = 0;
let golTM1 = 0;
let golTM2 = 0;


let nullcorTM1 = corTM1;
let nullcorTM2 = corTM2;
let nullttTM1 = ttTM1;
let nullttTM2 = ttTM2;
let nullgolTM1 = golTM1;
let nullgolTM2 = golTM2;


function setup() {
  createCanvas(1266,648);
  background('#f9f9f8');
  sliderWidth = width/12*10;

  push()
  rectMode(CENTER);
  fill('#D6D1D3');
  noStroke();
  rect(width/2,height/7*1+20,width/12*10,10,10);
  rect(width/2,height/7*2+20,width/12*10,10,10);
  rect(width/2,height/7*3+20,width/12*10,10,10);
  rect(width/2,height/7*4+20,width/12*10,10,10);
  rect(width/2,height/7*5+20,width/12*10,10,10);
  rect(width/2,height/7*6+20,width/12*10,10,10);
  pop()

  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(25);
  fill('#887b86');

  text('POSSESSO PALLA', width/2,height/7*1);
  text('ATTACCO', width/2,height/7*2);
  text('PALLA RECUPERATA', width/2,height/7*3);
  text('CORNER', width/2,height/7*4);
  text('TIRI TOTALI', width/2,height/7*5);
  text('GOAL', width/2,height/7*6);

  text(ppTM1 + "%", sliderWidth/15*2,height/7*1);
  text(ppTM2 + "%", sliderWidth/15*13,height/7*1);
  text(attTM1 + "%", sliderWidth/15*2,height/7*2);
  text(attTM2 + "%", sliderWidth/15*13,height/7*2);
  text(prTM1 + "%", sliderWidth/15*2,height/7*3);
  text(prTM2 + "%", sliderWidth/15*13,height/7*3);
  text(corTM1, sliderWidth/15*2,height/7*4);
  text(corTM2, sliderWidth/15*13,height/7*4);
  text(ttTM1, sliderWidth/15*2,height/7*5);
  text(ttTM2, sliderWidth/15*13,height/7*5);
  text(golTM1, sliderWidth/15*2,height/7*6);
  text(golTM2, sliderWidth/15*13,height/7*6);
  pop()
}

function draw() {

  if (corTM1==0) {nullcorTM1 = 0.001} if (corTM2==0){nullcorTM2 = 0.001};
  if (ttTM1==0) {nullttTM1 = 0.001} if (ttTM2==0){nullttTM2 = 0.001};
  if (golTM1==0) {nullgolTM1 = 0.001} if (golTM2==0){nullgolTM2 = 0.001};

  push()
  rectMode(CORNER);
  fill('#887b86');
  noStroke();
  rect(width/12,height/7*1+15,sliderWidth/(100/ppTM1),10,10);
  rect(width/12,height/7*2+15,sliderWidth/(100/attTM1),10,10);
  rect(width/12,height/7*3+15,sliderWidth/(100/prTM1),10,10);
  rect(width/12,height/7*4+15,sliderWidth/(nullcorTM1+nullcorTM2)*(nullcorTM1),10,10);
  rect(width/12,height/7*5+15,sliderWidth/(nullttTM1+nullttTM2)*(nullttTM1),10,10);
  rect(width/12,height/7*6+15,sliderWidth/(nullgolTM1+nullgolTM2)*(nullgolTM1),10,10);
  pop()

  push()
  rectMode(CORNER);
  fill('#D6D1D3');
  noStroke();
  rect((width/12*11)-(sliderWidth/(100/ppTM2)),height/7*1+15,sliderWidth/(100/ppTM2),10,10);
  rect((width/12*11)-(sliderWidth/(100/attTM2)),height/7*2+15,sliderWidth/(100/attTM2),10,10);
  rect((width/12*11)-(sliderWidth/(100/prTM2)),height/7*3+15,sliderWidth/(100/prTM2),10,10);
  pop()

}
