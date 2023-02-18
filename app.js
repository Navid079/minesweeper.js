const config = {
  width: 10,
  height: 10,
  w_size: 20,
  h_size: 20,
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
}

class Game {
  constructor(w, h, nMines) {
    this.board = [];

    const mines = this.generateMines(w, h, nMines);

    for (let i = 0; i < h; i++) {
      const row = [];
      for (let j = 0; j < w; j++) {
        row.push(new Tile(j, i));
      }
    }
  }

  generateMines(w, h, nMines) {
    const count = w * h;
    const values = range(0, count, 1);
    const result = [];
    for (let i = nMines - 1; i >= 0; i--) {
      const index = randint(0, i);
      const [value] = values.splice(index, 1);
      result.push(value);
    }

    return result;
  }
}

function start() {
  const canvas = document.getElementById('navid079:minesweeper');
  if (!canvas) return;

  new Game(10, 10, 10);
}

onload = start;
