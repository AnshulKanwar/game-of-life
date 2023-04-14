import "./style.css";
import GameOfLife from "./game-of-life";
import { randomSeed } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d")!;

const cellSize = 20;
const nCells = canvas.width / cellSize 

const seed = randomSeed(nCells)

const game = new GameOfLife(seed);

const drawCells = () => {
  game.state.forEach((row, i) => {
    row.forEach((val, j) => {
      if (val) {
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      } else {
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    });
  });
};

drawCells();

const draw = () => {
  game.next();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCells();
};

setInterval(draw, 100);
