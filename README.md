# Minesweeper.js

[![GitHub version](https://badge.fury.io/gh/Navid079/minesweeper.js.svg)](https://badge.fury.io/gh/Navid079/minesweeper.js)

A simple minesweeper game for web browsers.

## Demo

You can play minesweeper using minesweeper.js right now without any programming knowlendge just by clicking [here](https://Navid079.github.io/minesweeper.js)

## Installation

1. Add this to your code  
   `<script src="https://cdn.jsdelivr.net/gh/Navid079/minesweeper.js/index.js">`  
   or minified version (About 2.9 KB)  
   `<script src="https://cdn.jsdelivr.net/gh/Navid079/minesweeper.js/index.min.js"`
2. create a `canvas` with `id="navid079:minesweeper"`
3. Configure and start the game:

```js
const config = {
  width: 10, // Number of tile columns
  height: 10, // Number of tile rows
  w_size: 70, // Tile width
  h_size: 70, // Tile height
  nMines: 10, // Number of mines
  color: {
    // Tile colors
    unknown: '#1a1a1a', // Not selected yet
    opened: 'white',
    mine: 'red',
    flagged: 'purple',
    border: '#a1a1a1',
    label: 'black',
  },
};

minesweeper.start(config);
```

And your ready!

## Versions

- 1.0.0  
  Initial release

## Future Updates

- [ ] Add timer
- [ ] Add game signals (reset, ...)
- [ ] Add sprite support

## Contact and Contribution

Please send your comments, suggestions, and bug reports to [my e-mail](mailto:navid.naseri.079@gmail.com) with title `minesweeper.js-<title>` or feel free to fork, commit, and send pull requests.
