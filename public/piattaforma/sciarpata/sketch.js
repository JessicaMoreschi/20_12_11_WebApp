// Server
let socket = io(); //setting server

//Coundown
var testo = 180; //valore countdown

//trombetta ICONE
let sciarpaIcon, sciarpaBIcon, tut1Icon, tutIcon, logor, freccia, sAlta, sBassa; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione

let feed_piattaforma = 0; //var piattaforma: quando alt!=1 viene incrementata
let input_utente = 200 //var utente usa la trobetta, preme bottone

let opacità = 210 //opacità rettangolo tutorial
let pronto //coordinzaione tutorial


// variabili BONUS ////////////////////////////////////////////////////////////////////
// se totale bonus apri un altra schermata
let bonus_preso; //se i bonus sono tutti attivi apri un altra parte di sketch
let contBonus; //conta quando p_coord arriva a 100



//variabili per DASPO
let daspo = false; //variabile che dice se daspo è attiva in questo momento
let daspo_counter = 0; //variabile che conta il numero di daspo
let op = 0; //opacità rettangolo daspo
let daspo_gif_3, daspo_gif_4, daspo_gif_5;
let durata_daspo = 0; //durata della daspo
let secondo_corrente = 0; //secondo dell'inizio daspo


let j = 0; //sottomultiplo di i, ogni i è composto da 50 j
let pulsazione = 0; //variabile per fare pulsare il cerchio della trombetta


let boulPausa = false;

///////////////////////////////////////////////////////////////////////////////////////////////////
// teachable machine
// https://www.npmjs.com/package/@teachablemachine/pose/v/0.8.4
// https://editor.p5js.org/shmanfredi/sketches/y6u7bz5C1
const URL = "https://storage.googleapis.com/tm-model/V-k69BewR/";

let model, capture, topPrediction, numClasses, poseData, context

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmPose.load(modelURL, metadataURL);
  numClasses = model.getTotalClasses();
}

async function predict() {
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(capture.elt)

  const predictions = await model.predict(posenetOutput)
  let highestProbability = 0
  let highestIndex
  predictions.forEach((item, index) => {
    if (item.probability > highestProbability) {
      highestProbability = item.probability
      highestIndex = index
    }
  })

  poseData = pose
  topPrediction = predictions[highestIndex].className

}


////////////////COMUNICAZIONE SERVER/////////////////////////////////////
// RICEZIONE
socket.on("testoIn", updateTesto); //ricezione countdown
socket.on("stopTimer", dispPausaSer);
socket.on("startTimer", startTifoSer);
socket.on("resetTimer", resetTifoSer);

// UPDATE DA SERVER
function updateTesto(dataReceived) {
  console.log(dataReceived);
  testo = dataReceived //assegna a testo dati da server
}

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
////////////////FINE COMUNICAZIONE SERVER/////////////////////////////////////


/////////////////////////////////////////////////////////////////////////

function preload() {
  sciarpaBIcon = loadImage("./assets/immagini/sciarpa.png"); //sciarpa vuota bianca
  sciarpaIcon = loadImage("./assets/immagini/sciarpaViola.png"); //sciarpa scura
  tutIcon = loadImage("./assets/immagini/Tutorial-sciarpa-giu.gif");
  tut1Icon = loadImage("./assets/immagini/Tutorial-sciarpa-su.gif");
  logor = loadImage("./assets/immagini/logopiccolo.png"); //logo ridotto
  freccia = loadImage("./assets/immagini/freccia.png");
  sAlta = loadImage("./assets/immagini/Sciarpa_su.png");
  sBassa = loadImage("./assets/immagini/Sciarpa_giù.png");
  //   daspo_3 = loadImage("./assets/immagini/daspo3.gif");
  //   daspo_4 = loadImage("./assets/immagini/daspo4.gif");
  //   daspo_5 = loadImage("./assets/immagini/daspo5.gif");
}

/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(25)
  capture = createCapture(VIDEO)
  capture.hide()
  init()

  w = width / 20;
  h = height / 50;

  //freccia
  b2 = createButton("");
  b2.position(w, h * 4.5);
  b2.mousePressed(dispPausa);
  b2.id('pauseBtn');
}

/////////////////////////////////////////////////////////////////////////
function draw() {

  //CONTATORE i DEL TEMPO
  j++;
  if (frameCount % 70 == 0) { //multiplo di 70 incrementa i
    i++;
    j = 0;
  }

  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

  w = width / 20;
  h = height / 50;

  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(16);
  fill('#877B85'); //4° colore PALETTE
  text('PARTITA COOD O1', w * 10, h * 5);
  fill('#B7AEB5'); //3° PALETTE
  textSize(13);
  text('SQUADRA1-SQUADRA2', w * 10, h * 6.5);

  //testo sotto
  textSize(14);
  textAlign(CORNER);
  text('BONUS', w * 1.2, h * 43);

  //logo a destra
  image(logor, w * 18.5, h * 6, logor.width / 4.5, logor.height / 4.5);

  //BARRA COORDINAZIONE
  fill('#D5D0D3'); //barra grigia
  rectMode(CENTER);
  rect(w * 10, h * 45.5, width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  if (i > 3) {
    xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  } else {
    xBarra = 0;
  }

  push();
  rectMode(CORNER);
  fill('#877B85'); //barra viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w * 10 - width / 7, h * 45.5 - 7.5, xBarra, 15, 20);
  pop();

  ///////////////BONUS//////////////////////////////////////////////////////////////

  if (p_coord === 80) {
    contBonus++;
  }
  console.log('BONUS CONTATOR:' + contBonus);

  //pallini BONUS
  for (let i = 0; i < 6; i++) { // ogni 4 da il bonus
    if (contBonus === 4 || contBonus === 5 || contBonus === 6 || contBonus === 7) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      pop();

    } else if (contBonus === 8 || contBonus === 9 || contBonus === 10 || contBonus === 11) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      pop();

    } else if (contBonus === 12 || contBonus === 13 || contBonus === 14 || contBonus === 15) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      pop();

    } else if (contBonus === 16 || contBonus === 17 || contBonus === 18 || contBonus === 19) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      ellipse(w + 75, h * 45.5, 15);
      pop();

    } else if (contBonus === 20 || contBonus === 21 || contBonus === 22 || contBonus === 23) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      ellipse(w + 75, h * 45.5, 15);
      ellipse(w + 100, h * 45.5, 15);
      pop();

    } else if (contBonus === 24) {

      contBonus = 0; //azzerare i bonus
      bonus_preso = 1; //per dire che hai completato una fascia di bonus
      window.open('../bonus-app12uomo/index.html', '_self'); //doppio puntino per andare nella cartella sopra
    }

    ellipse(w + s, h * 45.5, 15);
    s = 25 * i;

    //EMIT BONUS
    socket.emit("bonusOut", contBonus);
    socket.emit("bonusTotOut", bonus_preso);
  }
  ///////////////////////////////////////////////////////////////


  //PER LA BARRA DELLA PERCENTUALE
  if (topPrediction == 'up' && i % 2 == 0) {
    p_coord = round((feed_piattaforma * input_utente) / 100);
  } else {
    p_coord = 0;
  }
  console.log(feed_piattaforma);

  //PERCENTUALE
  push();
  textAlign(CORNER);
  fill('#B7AEB5'); //3° PALETTE
  text('COORDINAZIONE  ' + p_coord + ' %', w * 10, h * 43);
  pop();

  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
  //ICONA FEEDBACK DA SEGUIRE
  if (i % 2 != 0 && i > 3) {

    image(sciarpaBIcon, w * 10, h * 25, sciarpaBIcon.width / 6, sciarpaBIcon.height / 6); //chiara
    feed_piattaforma = 0;
  } else if (i % 2 == 0 && i > 3) { //cambio colore delle bottone centrale: feedback utente
    if (j == 0 || j == 23 || j == 46 || j==70) { //pulsazioni del cerchio
      pulsazione = 0
    } else if (j < 12 || j > 23 && j < 35 || j>46 && j<58) {
      pulsazione += 4;
    } else if (j > 12 && j < 23 || j > 35 && j < 46 || j>58 && j<70) {
      pulsazione -= 4;
    }
    push()
    noStroke()
    fill("#E5E5E5")
    ellipse(width / 2, height / 2, 100 + pulsazione)
    pop() //fine puslazioni cerchio

    document.getElementById("tutorial2").style.display = "none";
    image(sciarpaIcon, w * 10, h * 25, sciarpaIcon.width / 6, sciarpaIcon.height / 6); // scura
    if (topPrediction == 'up') {
      feed_piattaforma++;
    }
  }

  //rettangolo in opacità
  push();
  rectMode(CORNER)
  fill(255, 255, 255, opacità);
  rect(0, 0, width, height);
  //rettangolo diventta trasparente alla fine del tutorial
  if (i > 3) {
    opacità = 0
  }
  pop();

  //TUTORIAL sciarpa

  if ((i == 0 || i == 2) & (boulPausa == false)) {

    document.getElementById("tutorial").style.display = "block";
    document.getElementById("tutorial2").src = "./assets/immagini/Tutorial-sciarpa-giu.gif";
    document.getElementById("tutorial2").style.display = "none";
    text('Alzala quando richiesto', w * 10, h * 29.5);
    if (topPrediction == 'up') {
      text('CORRETTO', w * 10, h * 31.5);
      p_coord = 70;
    }
  } else if ((i == 1 || i == 3) & (boulPausa == false)) {
    document.getElementById("tutorial").src = "./assets/immagini/Tutorial-sciarpa-su.gif";
    document.getElementById("tutorial2").style.display = "block";
    document.getElementById("tutorial").style.display = "none";

    text('Porta in basso la sciarpa', w * 10, h * 29.5);

    if (topPrediction == 'up') {
      text('NON COORDINATO', w * 10, h * 31.5);
      p_coord = 70;
    }
  } else if (boulPausa == true) {
    document.getElementById("tutorial2").style.display = "none";
    document.getElementById("tutorial").style.display = "none";
  }


  // FEED UTENTE (PALLINI COLORATI)
  if (topPrediction == 'up' && i % 2 == 0) { //alza la sciarpa
    pulsazione = 0;
    input_utente = 147;
    push();
    var z = 25 + p_coord;
    tint(255, z * 3.5); // Display at half opacity
    image(sAlta, width / 2, height / 2, sAlta.width / 3, sAlta.height / 3);
    pop();

    predict()
  } else if (topPrediction == 'up' && i % 2 != 0) { //abbassa la sciarpa
    input_utente = 0;
    image(sBassa, width / 2, height / 2, sBassa.width / 3, sBassa.height / 3);

    predict()
  } else {
    input_utente = 0;
    image(sBassa, width / 2, height / 2, sBassa.width / 3, sBassa.height / 3);

    predict()
  }

  //DASPO
  //daspo condizione
  if (topPrediction == 'up' && i % 2 != 0 && i > 3 && j > 15 && daspo == false) {
    daspo = true;
    daspo_counter++;
    secondo_corrente = testo;
  }

  //rettangolo in poacità per la daspo
  push();
  rectMode(CORNER);
  fill(255, 255, 255, op);
  rect(0, 0, width, height);
  pop();

  //gif diverse per durate diverse
  if (!daspo_gif_3) {
    daspo_gif_3 = createImg("./assets/immagini/daspo3.gif");
    daspo_gif_3.hide();
  }

  if (!daspo_gif_4) {
    daspo_gif_4 = createImg("./assets/immagini/daspo4.gif");
    daspo_gif_4.hide();
  }

  if (!daspo_gif_5) {
    daspo_gif_5 = createImg("./assets/immagini/daspo5.gif");
    daspo_gif_5.hide();
  }

  //quando daspo==true fa partire la daspo giusta in base al numero di daspo
  if (daspo == true) {
    op = 210;

    if (daspo_counter == 1) {
      durata_daspo = 3;
      daspo_gif_3.show();
      daspo_gif_3.size(150, AUTO);
      daspo_gif_3.position(width / 20, 3 * height / 4);
    } else if (daspo_counter == 2) {
      durata_daspo = 4;
      daspo_gif_4.show();
      daspo_gif_4.size(150, AUTO);
      daspo_gif_4.position(width / 20, 3 * height / 4);
    } else if (daspo_counter > 2) {
      durata_daspo = 5;
      daspo_gif_5.show();
      daspo_gif_5.size(150, AUTO);
      daspo_gif_5.position(width / 20, 3 * height / 4);
    }
  }

  //chiusur daspo dopo tot secondi
  if (daspo == true && testo == secondo_corrente - durata_daspo) {
    op = 0;
    daspo = false;
    if (daspo_counter == 1) {
      daspo_gif_3.hide();
    } else if (daspo_counter == 2) {
      daspo_gif_4.hide();
    } else if (daspo_counter > 2) {
      daspo_gif_5.hide();
    }
  }

  //console.log (topPrediction);

  ///////cambio cartella //////////////////////////////////////////////////
  if (i == 20) {
    window.open('../indexPausa.html', '_self'); //doppio puntino per andare nella cartella sopra
  }
  //////////////////////////////////////////////////////////////////
}


///////FINE DRAW/////////////////////////////////////////////////////


//funzione trombetta
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


///////COMANDI PAUSA-STOP-RESET/////////////////////////////////////////////////////
//funzioni per attivare la pausa
function dispPausa() {
  socket.emit("stopTimer");
  boulPausa = true;
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("tutorial2").style.display = "none";
  document.getElementById("schermo").style.backgroundColor = "#877B85";
  document.getElementById("startTifo").style.display = "block";
  document.getElementById("resetTifo").style.display = "block";
  document.getElementById("contTifo").style.display = "block";
  document.getElementById("abbTifo").style.display = "block";
  document.getElementsByClassName("iconPausa").style.display = "block";
}

function startTifo() {
  socket.emit("startTimer");
  boulPausa = false;
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function resetTifo() {
  socket.emit("resetTimer");
  boulPausa = false;
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function dispPausaSer() {
  boulPausa = true;
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("tutorial2").style.display = "none";
  document.getElementById("schermo").style.backgroundColor = "#877B85";
  document.getElementById("startTifo").style.display = "block";
  document.getElementById("resetTifo").style.display = "block";
  document.getElementById("contTifo").style.display = "block";
  document.getElementById("abbTifo").style.display = "block";
  document.getElementsByClassName("iconPausa").style.display = "block";
}

function startTifoSer() {
  boulPausa = false;
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function resetTifoSer() {
  boulPausa = false;
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}
