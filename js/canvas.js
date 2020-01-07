/*
TITLE: 2048 Game in JS - Canvas
AUTHOR: Federico Falcone (https://github.com/Chitogee)
*/

const SQUARE_SIDE = 125;
const SQUARE_MARGIN = 10;
const SQUARE_PER_TABLE_SIDE = 4;
const MARGIN_TABLE_COLOR = "#ACAC9A";
const EMPTY_SQUARE_COLOR = "#FFFFE0";
var c;
var ctx;
var t;

window.onload = function() {
  c = document.getElementById("2048");
  ctx = c.getContext("2d");

  c.height = c.width = SQUARE_SIDE * SQUARE_PER_TABLE_SIDE + SQUARE_MARGIN * (SQUARE_PER_TABLE_SIDE + 1);
  c.style.borderRadius = "10px";
  t = new Table();
  drawEmptyTable();

}

function manageButton(id) {
  var btn = document.getElementById(id);
  switch(btn.value) {
    case "play":
      startGame();
      btn.innerHTML = "Restart";
      btn.value = "restart";
      break;
    case "restart":
      restartGame();
      btn.innerHTML = "Play";
      btn.value = "play";
      break;
  }
}

function startGame() {
  t.initialize();
  drawTable();
  detectEvent();
}

function restartGame() {
  drawEmptyTable();
  t.reset();

}

function drawEmptyTable() {
  ctx.fillStyle = MARGIN_TABLE_COLOR;
  ctx.fillRect(0, 0, c.width, c.height);

  for(i = 0; i < SQUARE_PER_TABLE_SIDE; i++) {
    for(j = 0; j < SQUARE_PER_TABLE_SIDE; j++) {
      drawEmptySquare(i, j);
    }
  }
}

function drawEmptySquare(x, y) {
  ctx.beginPath();
  ctx.fillStyle = EMPTY_SQUARE_COLOR;
  ctx.fillRect(i * (SQUARE_SIDE + SQUARE_MARGIN) + SQUARE_MARGIN, j * (SQUARE_SIDE + SQUARE_MARGIN) + SQUARE_MARGIN, SQUARE_SIDE, SQUARE_SIDE);
}

function drawTable() {
  for(i = 0; i < SQUARE_PER_TABLE_SIDE; i++)
    for(j = 0; j < SQUARE_PER_TABLE_SIDE; j++)
      if(t.tab[i][j] != 0)
        drawSquare(new Square(t.tab[i][j], j, i));
}

function drawSquare(s) {
  ctx.fillStyle = s.getSquareColor();
  ctx.fillRect(s.xPos * (SQUARE_SIDE + SQUARE_MARGIN) + SQUARE_MARGIN, s.yPos * (SQUARE_SIDE + SQUARE_MARGIN) + SQUARE_MARGIN, SQUARE_SIDE, SQUARE_SIDE);
  ctx.font = s.fontSize + " " + s.fontFamily;
  ctx.textBaseline = "middle";
  ctx.fillStyle = s.fontColor;
  ctx.textAlign = "center";
  ctx.fillText(s.value, s.xPos * (SQUARE_SIDE + SQUARE_MARGIN) + SQUARE_MARGIN + SQUARE_SIDE/2, s.yPos * (SQUARE_SIDE + SQUARE_MARGIN) + SQUARE_MARGIN + SQUARE_SIDE/2);
}


function detectEvent() {
  document.addEventListener("keydown", function handler(event) {
    event.preventDefault();
    var validInput;
    const key = event.key;
    switch (key) {
      case "ArrowLeft":
        t.addBlock(1);
        t.left();
        validInput = true;
        break;
      case "ArrowRight":
        t.addBlock(1);
        t.right();
        validInput = true;
        break;
      case "ArrowUp":
        t.addBlock(1);
        t.up();
        validInput = true;
        break;
      case "ArrowDown":
        t.addBlock(1);
        t.down();
        validInput = true;
        break;
      default:
        validInput = false;
    }
    if(validInput) {
      drawEmptyTable();
      drawTable(t);
      if(t.won() || t.lost()) {
        alert("perso!");
        this.removeEventListener("keydown", handler);
      }
    }
  });
}
