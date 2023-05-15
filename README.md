# Minesweeper.js

![GitHub](https://img.shields.io/github/license/Navid079/minesweeper.js?style=for-the-badge)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Navid079/minesweeper.js?label=version&sort=semver&style=for-the-badge)
![GitHub file size in bytes on a specified ref (branch/commit/tag)](https://img.shields.io/github/size/Navid079/minesweeper.js/index.js?branch=v1.0.0&style=for-the-badge)
![GitHub file size in bytes on a specified ref (branch/commit/tag)](https://img.shields.io/github/size/Navid079/minesweeper.js/index.min.js?branch=v1.0.0&label=minified&style=for-the-badge)

A simple Minesweeper game for web browsers.

## Demo

Play Minesweeper using Minesweeper.js right now without any programming knowledge! Just click [here](https://Navid079.github.io/minesweeper.js) to start playing.

## Installation

1. Add the following code to your HTML file:

   ```html
   <script src="https://cdn.jsdelivr.net/gh/Navid079/minesweeper.js/index.js"></script>
   <!-- or minified version (About 2.9 KB) -->
   <!-- <script src="https://cdn.jsdelivr.net/gh/Navid079/minesweeper.js/index.min.js"></script> -->
   ```

Create a `<canvas>` element with id="navid079:minesweeper".
Configure and start the game:

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
And you're ready to go!

## Versions

- 1.0.0: Initial release

## Future Updates

- [ ] Add a timer
- [ ] Implement game signals (reset, etc.)
- [ ] Add sprite support

## Contact and Contribution

Please send your comments, suggestions, and bug reports to [my e-mail](mailto:navid.naseri.079@gmail.com) with the subject `minesweeper.js-<title>`. Feel free to fork, commit, and send pull requests.

Let's make Minesweeper.js better together!
