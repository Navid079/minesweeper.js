let canvas;

const config = {
  width: 10,
  height: 10,
  w_size: 70,
  h_size: 70,
  nMines: 10,
  color: {
    unknown: '#1a1a1a',
    opened: 'white',
    mine: 'red',
    flagged: 'purple',
    border: '#a1a1a1',
    label: 'black',
  },
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
    this.isOpened = false;
    this.neigborMines = 0;
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

    this.isOpened = true;

    return {
      safe: !this.isMine,
      message: this.isMine ? 'Game Over' : 'Correct',
    };
  }

  flag() {
    this.isFlagged = true;
  }

  unflag() {
    this.isFlagged = false;
  }

  render(color, w, h) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = this.isOpened
      ? this.isMine
        ? color.mine
        : color.opened
      : this.isFlagged
      ? color.flagged
      : color.unknown;
    ctx.fillRect(w * this.x, h * this.y, w, h);
    ctx.strokeStyle = color.border;
    ctx.beginPath();
    ctx.rect(w * this.x, h * this.y, w, h);
    ctx.stroke();

    if (this.isOpened && this.neigborMines) {
      ctx.beginPath();
      ctx.fillStyle = color.label;
      ctx.fillText(
        this.neigborMines,
        w * this.x + Math.floor(w / 2),
        h * this.y + Math.floor(h / 2),
        w
      );
    }
  }
}

class Game {
  constructor(config) {
    canvas.width = config.width * config.w_size;
    canvas.height = config.height * config.h_size;

    this.config = config;

    this.init();
  }

  init() {
    this.board = [];
    this.neigborDetails = [];

    this.running = true;
    this.lastRender = true;

    const mines = this.generateMines();

    for (let m of mines) {
      let x = m % config.width;
      let y = Math.floor(m / config.width);

      this.addNeigborMine(x - 1, y - 1);
      this.addNeigborMine(x - 1, y);
      this.addNeigborMine(x - 1, y + 1);
      this.addNeigborMine(x, y - 1);
      this.addNeigborMine(x, y + 1);
      this.addNeigborMine(x + 1, y - 1);
      this.addNeigborMine(x + 1, y);
      this.addNeigborMine(x + 1, y + 1);
    }

    for (let i = 0; i < config.height; i++) {
      const row = [];
      for (let j = 0; j < config.width; j++) {
        const index = i * config.width + j;
        row.push(new Tile(j, i, mines.includes(index)));
      }
      this.board.push(row);
    }

    this.tilesToOpen = this.config.width * this.config.height;

    for (let { x, y, value } of this.neigborDetails) {
      this.board[y][x].setNeigborMines(value);
    }
  }

  addNeigborMine(x, y) {
    if (x < 0 || y < 0 || x >= this.config.height || y >= this.config.width)
      return;

    const item = this.neigborDetails.find(item => item.x === x && item.y === y);
    if (!item) return this.neigborDetails.push({ x, y, value: 1 });

    item.value++;
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
    if (!this.running && !this.lastRender) return;
    if (!this.running) this.lastRender = false;
    for (let row of this.board) {
      for (let tile of row) {
        tile.render(this.config.color, this.config.w_size, this.config.h_size);
      }
    }
  }

  select(x, y) {
    if (!this.running) return;
    const toOpen = [{ x, y }];
    while (toOpen.length > 0) {
      const { x, y } = toOpen.shift();

      if (x < 0 || y < 0 || x >= this.config.height || y >= this.config.width)
        continue;

      if (this.board[y][x].isOpened) continue;
      const { safe } = this.board[y][x].select();
      if (!safe) {
        this.running = false;
        console.log('Mine blown up');
        return;
      }
      this.tilesToOpen--;
      if (this.board[y][x].getNeigborMines() === 0) {
        toOpen.push({ x: x - 1, y: y - 1 });
        toOpen.push({ x: x - 1, y });
        toOpen.push({ x: x - 1, y: y + 1 });

        toOpen.push({ x, y: y - 1 });
        toOpen.push({ x, y: y + 1 });

        toOpen.push({ x: x + 1, y: y - 1 });
        toOpen.push({ x: x + 1, y });
        toOpen.push({ x: x + 1, y: y + 1 });
      }
    }
  }

  click(x, y) {
    const tileX = Math.floor(x / this.config.w_size);
    const tileY = Math.floor(y / this.config.h_size);

    this.select(tileX, tileY);
  }

  tick() {
    if (!this.running) return;
    if (this.tilesToOpen === this.config.nMines) {
      this.running = false;
      console.log('Victorious');
    }
  }
}

function click(e) {
  e.preventDefault();
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (e.which === 3 || e.button === 2) return;

  game.click(x, y);
}

function start() {
  canvas = document.getElementById('navid079:minesweeper');
  if (!canvas) return;

  window.game = new Game(config);
  canvas.onclick = click;
  canvas.oncontextmenu = e => {
    e.preventDefault();
    game.init();
  };

  setInterval(window.game.render.bind(window.game), 100);
  setInterval(window.game.tick.bind(window.game), 300);
}

onload = start;
