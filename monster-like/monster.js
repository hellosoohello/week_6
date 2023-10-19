// all of the functions for our monster
// TODO: this will eventually be upgraded to classes

function moveMonster() {
    // small chance he moves around randomly
    let moveRoll = int(random(100));
    if (moveRoll >= 98) {
      monsterProperties["posX"] += random(-80,80);
      monsterProperties["posY"] += random(-80,100);
    
      monsterProperties["posX"] = constrain(monsterProperties["posX"], 0, width);
      monsterProperties["posY"] = constrain(monsterProperties["posY"], 50, 110);
    }
  }
  

  function rectangleMonster() {
    push();
    translate(monsterProperties["posX"], monsterProperties["posY"]);
    if (monsterProperties["mood"] == "4") {
      rotate(millis() / 1000);
    }
    scale(monsterProperties["size"]);
    rect(0, 0, 40, 25);
    scale(5);
    pop();
  }


  function calculateMonsterEyes() {
    // DRAW MONSTER EYES
    let sizeOfEyes = 15;
  
    // left
    //fill(0);
    
    //ellipse(monsterProperties["posX"] - 10, monsterProperties["posY"] - 10, 20, 15,30); // eye
    fill(0);
  
    let lpX = monsterProperties["posX"] - 10;
    let lpY = monsterProperties["posY"] - 10;
  
    push();
    //ellipseMode(CENTER);
    translate(lpX,lpY);
    //let angle = atan2(mouseY - pY, mouseX - pX);
    let angleL = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    //rotate(300);
    fill(250);
    ellipse(7, 3, sizeOfEyes/4, sizeOfEyes/4); // pupil
    
    pop();
  
    // right
    let pX = monsterProperties["posX"] + 10;
    let pY = monsterProperties["posY"] - 10;
  
    fill(255);
    //ellipse(monsterProperties["posX"] + 10, monsterProperties["posY"] - 10, sizeOfEyes, sizeOfEyes); // eye
    fill(0);
    
    push();
    translate(pX,pY);
    let angleR = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    //rotate(angleR);
    fill(250);
    ellipse(6, 1, sizeOfEyes/4, sizeOfEyes/4); // pupil
    
    pop();
  }

  function drawMonsterMouth() {
    let mouthOffset = 7;
    if (monsterProperties["mood"] == 0) {
      noFill();
      stroke(0);
      arc(monsterProperties["posX"], monsterProperties["posY"] + mouthOffset, 20, 15, PI, 0);
      noStroke();



    } else if (monsterProperties["mood"] == 1) {
      noFill();
      stroke(255);
      line(monsterProperties["posX"] - 5, monsterProperties["posY"], monsterProperties["posX"] + 5, monsterProperties["posY"]);
      noStroke();  
    } else if (monsterProperties["mood"] == 2) {
      fill(255);
      ellipse(monsterProperties["posX"], monsterProperties["posY"] + mouthOffset, 5, 7);
      noFill();
    } else if (monsterProperties["mood"] >= 3) {
      noFill();
      stroke(255);
      arc(monsterProperties["posX"], monsterProperties["posY"] + mouthOffset, 20, 15, 0, PI);
      noStroke();
    }
  }

  function drawMonster() {
    // DRAW MONSTER SHAPE
    // TODO: this can be cleaned up to be nicer ...
  
    // draw monster size based on age
    let calcSize = ((monsterProperties["age"] + 10) * 0.1) * 1.01;
    if (monsterProperties["age"] >= 20) { // soft cap monster size
      monsterProperties["size"] = 3;
    } else {
      monsterProperties["size"] = calcSize;
    }
  
    push();
    rectMode(CENTER); // to make it easier to draw placed monster elements
    fill(monsterProperties["color"]); // generated color
  
    if (monsterProperties["shape"] == "rectangle") {
        rectangleMonster();
    } 
  
    // CALCULATE EYES BASED ON TIME
    calculateMonsterEyes();

    // DRAW MONSTER MOUTH
    drawMonsterMouth();
  
    pop();
  }
  
  // NOTE: we only generate the random values for the monster ONCE
  // and keep track of what we generated for gameplay
  function generateMonster() {
    // color
    // generate a color for our monster
    monsterProperties["color"][0] = 150;
    monsterProperties["color"][1] = 111;
    monsterProperties["color"][2] = 214;
  
    // shape
    // choose a shape for our monster
    let rndShape = int(0);
    if (rndShape == 0) {
      monsterProperties["shape"] = "rectangle";
    } 
  
    console.log("generatedShape: " + monsterProperties["shape"]);
  }