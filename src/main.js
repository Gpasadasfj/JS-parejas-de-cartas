import "../sass/main.scss";
import Game from "./class/Game";
import Card from "./class/Card";

let data = Game.getRowsCols();

let game = new Game(data.rows, data.cols, "game");

let resetButton = document.getElementsByClassName("resetButton")[0];
resetButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
