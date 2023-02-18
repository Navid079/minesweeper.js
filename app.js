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

onload = function () {
  minesweeper.start(config);
};
