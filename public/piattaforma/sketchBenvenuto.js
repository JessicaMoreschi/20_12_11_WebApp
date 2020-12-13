// VAR SERVER
//let socket = io(); //setting server
let logoIcon, benvenuto;
let pag = 0;
let button;
// variabili BONUS ////////////////////////////////////////////////////////////////////
let bonus_preso = 1;
let contBonus = 12; //conta quando p_coord arriva a 100

///////////////COMUNICAZIONE SERVER/////////////////////////////////////
// RICEZIONE BONUS
socket.on("bonusIn", bonusServer);
socket.on("bonusTotIn", bonusTotale_Ok);

// UPDATE DA SERVER BONUS
function bonusServer(dataReceived) {
  contBonus = dataReceived; //assegna a contBonus dati da server
}

function bonusTotale_Ok(dataReceived) {
  bonus_preso = dataReceived; //assegna a contBonus dati da server
}

/////////////////////////////////////////////////////////////////////////

function preload() {
  logoIcon = loadImage("./assets/immagini/logo.png");
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#887b86'); //scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon, width / 2, height / 2, logoIcon.width / 7, logoIcon.height / 7);
}

/////////////////////////////////////////////////////////////////////////
function draw(){
  //EMIT BONUS
    socket.emit("bonusOut", contBonus);
    socket.emit("bonusTotOut", bonus_preso);
}
/////////////////////////////////////////////////////////////////////////

function mouseClicked() {
  window.open('benvenuto/index.html', '_self');
}
/////////////////////////////////////////////////////////////////////

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#887b86'); //scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon, width / 2, height / 2, logoIcon.width / 7, logoIcon.height / 7);
}
