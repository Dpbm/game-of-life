const canvas_w = window.innerWidth;
const canvas_h = window.innerHeight;
const square_size = 10;

const total_cells_w = Math.trunc(canvas_w / square_size);
const total_cells_h = Math.trunc(canvas_h / square_size);
let cells = new Array(total_cells_w)
				.fill(null)
				.map(() => 
					Array.from({length:total_cells_h}, () => Math.floor(Math.random()*2))
				);


function setup() {
	createCanvas(canvas_w, canvas_h);
}

function draw() {
	frameRate(40);
	background(0);
	update_cells();

	for (let x = square_size; x < canvas_w-square_size; x += square_size)
		for (let y = square_size; y < canvas_h-square_size; y += square_size) {
			const cell = cells[x/square_size][y/square_size];
			if(cell){
				fill(255);
				square(x, y, square_size);
			}
		}
}

function update_cells() {
	for (let i = 1; i < total_cells_w-1; i++) {
		for (let j = 1; j < total_cells_h-1; j++) {
			const neighbors = get_neighbors(i, j);
			const neighbors_alive = sum(neighbors);

			const cell = cells[i][j];
			if (cell == 1 && (neighbors_alive < 2 || neighbors_alive > 3)) cells[i][j] = 0;
			else if (cell == 0 && neighbors_alive == 3) cells[i][j] = 1;
		}
	}
}

function sum(list){
	return list.reduce(
		(partial, a) => partial + a,
		0
	);
}

function get_neighbors(i, j) {
	const neighbors = [
		cells[i + 1][j],
		cells[i - 1][j],
		cells[i][j + 1],
		cells[i][j - 1],
		cells[i - 1][j - 1],
		cells[i + 1][j - 1],
		cells[i - 1][j + 1],
		cells[i + 1][j - 1],
	];

	return neighbors;
}
