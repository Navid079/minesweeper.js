const config = {
  width: 10,
  height: 10,
  w_size: 20,
  h_size: 20,
  color: '#1a1a1a',
  border: '#a1a1a1',
};

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

function start() {
  const canvas = document.getElementById('navid079:minesweeper');
  if (!canvas) return;
}

onload = start;
