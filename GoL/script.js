function randint (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function drawCell(x, y, state) {
	x1 = x * CELL_SIDE;
	y1 = y * CELL_SIDE;
	if (state) ctx.fillStyle = "rgb(0,155,0)";
	else ctx.fillStyle = "rgb(50,50,50)";
	ctx.fillRect(x1, y1, CELL_SIDE, CELL_SIDE);
	if (state) ctx.fillStyle = "rgb(0,255,0)";
	else ctx.fillStyle = "rgb(150,150,150)";
	ctx.fillRect(x1 + 2, y1 + 2, CELL_SIDE - 4, CELL_SIDE - 4);
}


function updateDisplay() {
	for (i = 0; i < CELL_H; i++) {
		for (j = 0; j < CELL_W; j++) {
			drawCell(j, i, cells_display[i + 1][j + 1]);
		}
	}
}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var CELL_SIDE = 50;
var CELL_H = 600 / CELL_SIDE;
var CELL_W = 800 / CELL_SIDE;

var cells_display = new Array(CELL_H + 1);
var cells_update = new Array(CELL_H + 1);
var templine = Array(CELL_W + 1);
for (i = 0; i < CELL_W + 1; i++) {templine[i] = 0;}  // Creating a tmp line full of zeros
for (i = 0; i < CELL_H + 1; i++) {
	cells_display[i] = templine.slice();
	cells_update[i] = templine.slice();
}

for (i = 0; i < CELL_H; i++) {
	for (j = 0; j < CELL_W; j++) {
		cells_display[i + 1][j + 1] = randint(0, 1);
	}
}

updateDisplay();
