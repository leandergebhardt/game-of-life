const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const counter = document.getElementById('generations');

const resolution = 8;
canvas.width = 1920;
canvas.height = 1080;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

let gen = 0;

function  buildGrid() {
    return new Array(COLS).fill(null)
    .map(() => new Array(ROWS).fill(0)
      .map(() => Math.floor(Math.random() * 2)));
}

let grid = buildGrid();
requestAnimationFrame(update);

function update(){
    grid = nextGen(grid);
    render(grid);
    requestAnimationFrame(update);
}

function render(grid) {
    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
            const x = col * resolution;
            const y = row * resolution;

            const cell = grid[col][row];

            ctx.fillStyle = cell === 1 ? '#fff' : '#000';
            ctx.fillRect(x, y, resolution, resolution);
        }
    }
}

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);
  
    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];
        let numNeighbours = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
            const x_cell = col + i;
            const y_cell = row + j;
  
            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
              const currentNeighbour = grid[col + i][row + j];
              numNeighbours += currentNeighbour;
            }
          }
        }
  
        // rules
        if (cell === 1 && numNeighbours < 2) {
          nextGen[col][row] = 0;
        } else if (cell === 1 && numNeighbours > 3) {
          nextGen[col][row] = 0;
        } else if (cell === 0 && numNeighbours === 3) {
          nextGen[col][row] = 1;
        }
      }
    }
    gen++;
    document.getElementById('generations').innerHTML =  ('Generation: ', gen);
    return nextGen;
  }
