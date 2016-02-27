function randint (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function drawCell(x, y, state) {
	x1 = x * CELL_SIDE;
	y1 = y * CELL_SIDE;

	if (state) ctx.fillStyle = "rgb(0,155,0)";
	else ctx.fillStyle = "rgb(50,50,50)";
	ctx.fillRect(x1, y1, CELL_SIDE, CELL_SIDE);  //This is going to be the outline of the cell (the darker one)

	if (state) ctx.fillStyle = "rgb(0,255,0)";
	else ctx.fillStyle = "rgb(150,150,150)";
	ctx.fillRect(x1 + 2, y1 + 2, CELL_SIDE - 4, CELL_SIDE - 4);  // And this is the inner part of the cell
}


function randomFill() {
	for (i = 0; i < CELL_H; i++) {  // Randomly filling cells_display with cells
		for (j = 0; j < CELL_W; j++) {
			cells_display[i][j] = randint(0, 1);
			cells_update[i][j] = cells_display[i][j];  // Usually this is launched at the begining, so cells_update is going to be the same as cells_display. Yeah.
		}
	}
}


function getIdx(cord, size) {  // This is actually needed because we want the game to be cyclic. So that indexes that are out of range are becoming in range.
	if (cord < 0) {cord = size + cord;}
	if (cord >= size) {cord -= size;}
	return cord;
}


function updateCells() {
	for (i = 0; i < CELL_H; i++) {
		for (j = 0; j < CELL_W; j++) {

			var neib = -cells_display[i][j];
			for (y = -1; y < 2; y++) {  // Counting neighbours
				for (x = -1; x < 2; x++) {
					neib += cells_display[getIdx(i + y, CELL_H)][getIdx(j + x, CELL_W)];
				}
			}

			if (!cells_display[i][j] && neib == 3) {cells_update[i][j] = 1;}              // Living
			if (cells_display[i][j] && (neib < 2 || neib > 3)) {cells_update[i][j] = 0;}  //

		}
	}

	for (i = 0; i < CELL_H; i++) {  // Updating cells_display
		for (j = 0; j < CELL_W; j++) {
			cells_display[i][j] = cells_update[i][j];
		}
	}
	updateDisplay();
}


function updateDisplay() {
	for (i = 0; i < CELL_H; i++) {  // Drawing every cell
		for (j = 0; j < CELL_W; j++) {
			drawCell(j, i, cells_display[i][j]);
		}
	}
	taw = setTimeout('updateCells()',10);
}



var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var CELL_SIDE = 10;
var CELL_H = Math.ceil(WIND_H / CELL_SIDE);
var CELL_W = Math.ceil(WIND_W / CELL_SIDE);

var cells_display = new Array(CELL_H);
var cells_update = new Array(CELL_H);
var templine = Array(CELL_W);
for (i = 0; i < CELL_W; i++) {templine[i] = 0;}  // Creating a tmp line full of zeros
for (i = 0; i < CELL_H; i++) {  // Creating blank fields
	cells_display[i] = templine.slice();
	cells_update[i] = templine.slice();
}

randomFill();

updateDisplay();
