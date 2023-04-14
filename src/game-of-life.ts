export default class GameOfLife {
  state: number[][];

  constructor(seed: number[][]) {
    this.state = seed;
  }

  neighbours(i: number, j: number): (number | undefined)[] {
    let topLeft: number | undefined;
    let top: number | undefined;
    let topRight: number | undefined;
    let left: number | undefined;
    let right: number | undefined;
    let bottomLeft: number | undefined;
    let bottom: number | undefined;
    let bottomRight: number | undefined;

    const topRow = this.state[i - 1];
    const middleRow = this.state[i];
    const bottomRow = this.state[i + 1];

    if (topRow) {
      topLeft = topRow[j - 1];
      top = topRow[j];
      topRight = topRow[j + 1];
    }

    if (middleRow) {
      left = middleRow[j - 1];
      right = middleRow[j + 1];
    }

    if (bottomRow) {
      bottomLeft = bottomRow[j - 1];
      bottom = bottomRow[j];
      bottomRight = bottomRow[j + 1];
    }

    return [
      topLeft,
      top,
      topRight,
      left,
      right,
      bottomLeft,
      bottom,
      bottomRight,
    ];
  }

  next() {
    this.state = this.state.map((row, i) => {
      return row.map((val, j) => {
        const nbrs = this.neighbours(i, j);
        const liveNeighbours = nbrs.filter(
          (neighbour) => neighbour === 1
        ).length;

        if (val) {
          // Any live cell with two or three live neighbours survives.
          if (liveNeighbours === 2 || liveNeighbours === 3) {
            return 1;
          } else {
            return 0;
          }
        } else {
          // Any dead cell with three live neighbours becomes a live cell.
          if (liveNeighbours === 3) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    });
  }
}
