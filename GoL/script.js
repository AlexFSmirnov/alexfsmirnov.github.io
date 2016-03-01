function randint (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function drawCell(x, y, state) {
	x1 = x * CELL_SIDE;
	y1 = y * CELL_SIDE;

	if (state) ctx.fillStyle = "rgb(0,155,0)";
	else ctx.fillStyle = "rgb(50,50,50)";
	ctx.fillRect(x1 + X_OFFSET, y1 + Y_OFFSET, CELL_SIDE, CELL_SIDE);  //This is going to be the outline of the cell (the darker one)

	if (state) ctx.fillStyle = "rgb(0,255,0)";
	else ctx.fillStyle = "rgb(150,150,150)";
	ctx.fillRect(x1 + X_OFFSET + BORDER_THICKNESS, y1 + Y_OFFSET + BORDER_THICKNESS, CELL_SIDE - 2 * BORDER_THICKNESS, CELL_SIDE - 2 * BORDER_THICKNESS);  // And this is the inner part of the cell
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

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

var $_GET = getQueryParams(document.location.search);

var WIND_W = $_GET['w'];     //
var WIND_H = $_GET['h'];     // Trying to get sizes from the adress bar
var CELL_SIDE = $_GET['c'];  // 

if (!CELL_SIDE) { CELL_SIDE = 10;}                               //    
if (!WIND_W) { WIND_W = document.documentElement.clientWidth;}   // If there is no any variables in the adress bar setting them to default values 
if (!WIND_H) { WIND_H = document.documentElement.clientHeight;}  // 

var CELL_H = Math.floor(WIND_H / CELL_SIDE);
var CELL_W = Math.floor(WIND_W / CELL_SIDE);

var WIND_W = CELL_W * CELL_SIDE;
var WIND_H = CELL_H * CELL_SIDE;

var X_OFFSET = (document.documentElement.clientWidth - WIND_W) / 2;   // This is thw offset of the field, so that it is displayed on the centre of the screen
var Y_OFFSET = (document.documentElement.clientHeight - WIND_H) / 2;  //

var BORDER_THICKNESS = Math.floor(CELL_SIDE / 5);


document.write('<canvas id="canvas" width="' + document.documentElement.clientWidth + '" height="' + document.documentElement.clientHeight + '" />');  //Creating the field

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


ctx.fillStyle = "rgb(25,25,25)";                                                                  // Drawing background
ctx.fillRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);  //

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
