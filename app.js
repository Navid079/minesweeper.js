let canvas;

const config = {
  width: 10,
  height: 10,
  w_size: 30,
  h_size: 30,
  nMines: 10,
  color: '#1a1a1a',
  border: '#a1a1a1',
};

function randint(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

function range(start, end, step) {
  const result = [];
  for (let i = start; i < end; i += step) result.push(i);
  return result;
}

class Tile {
  constructor(x, y, isMine) {
    this.x = x;
    this.y = y;
    this.isMine = isMine;
    this.isFlagged = false;
  }

  setNeigborMines(n) {
    this.neigborMines = n;
  }

  getNeigborMines() {
    return this.neigborMines;
  }

  select() {
    if (this.isFlagged) {
      throw {
        error: 'TILE-SELECT-FLAGGED',
        message: 'This tile cannot be selected',
      };
    }

    return {
      status: !this.isMine,
      message: this.isMine ? 'Game Over' : 'Correct',
    };
  }

  flag() {
    this.isFlagged = true;
  }

  unflag() {
    this.isFlagged = false;
  }

  render(color, border, w, h) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(w * this.x, h * this.y, w, h);
    ctx.strokeStyle = border;
    ctx.beginPath();
    ctx.rect(w * this.x, h * this.y, w, h);
    ctx.stroke();
  }
}

class Game {
  constructor(config) {
    canvas.width = config.width * config.w_size;
    canvas.height = config.height * config.h_size;

    this.config = config;
    this.board = [];

    const mines = this.generateMines();

    for (let i = 0; i < config.height; i++) {
      const row = [];
      for (let j = 0; j < config.width; j++) {
        const index = i * config.width + j;
        row.push(new Tile(j, i, mines.includes(index)));
      }
      this.board.push(row);
    }

    console.log(mines);
    console.log(this.board);
  }

  generateMines() {
    const count = this.config.width * this.config.height;
    const values = range(0, count, 1);
    const result = [];
    for (let i = 0; i < this.config.nMines; i++) {
      const index = randint(0, values.length);
      const [value] = values.splice(index, 1);
      result.push(value);
    }

    return result.sort();
  }

  render() {
    for (let row of this.board) {
      for (let tile of row) {
        tile.render(
          this.config.color,
          this.config.border,
          this.config.w_size,
          this.config.h_size
        );
      }
    }
  }
}

function start() {
  canvas = document.getElementById('navid079:minesweeper');
  if (!canvas) return;

  window.game = new Game(config);
}

onload = start;
