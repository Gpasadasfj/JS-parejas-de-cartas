import { shuffle } from "../utils/util";
import Card from "./Card";
import Timer from "./Timer";

class Game {
  #rows;
  #cols;
  #container;
  #cards;
  #selectedCards;
  #openCards;
  timer;

  constructor(rows, cols, containerId = "game") {
    this.#rows = rows;
    this.#cols = cols;
    this.#cards = [];
    this.#selectedCards = [];
    this.#openCards = [];
    this.#container = document.getElementById(containerId);

    this.createCards();
    this.setCSSBoxTemplates();
    this.initTimer();
  }

  // Genera un array de colores aleatorios duplicados (para formar pares)
  createRandomColors() {
    let randomColors = [];

    // Genera la mitad de los colores necesarios (porque luego se duplican)
    for (let e = 0; e < (this.#rows * this.#cols) / 2; e++) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      randomColors.push(`rgb(${r}, ${g}, ${b})`);
    }

    // Devuelve el array duplicado (pares de colores)
    let rc = [...randomColors, ...randomColors];
    shuffle(rc);
    return rc;
  }

  createCards() {
    this.#cards = [];
    if (localStorage.getItem("cards") !== null) {
      let cardsToLocalStorage = JSON.parse(localStorage.getItem("cards"));
      cardsToLocalStorage.map((card) => {
        let newCard = new Card(
          card.row,
          card.col,
          card.color,
          card.open === true
        );

        this.#cards.push(newCard);
        this.#container.append(newCard.element);
        newCard.element.addEventListener("click", () =>
          this.#handleCardClick(newCard)
        );

        if (newCard.isOpen()) {
          this.#openCards.push(newCard.element);
        }
      });
      this.#finishCheck();
    } else {
      let i = 0;
      let colors = this.createRandomColors();
      for (let row = 0; row < this.#rows; row++) {
        for (let colum = 0; colum < this.#cols; colum++) {
          let actualColor = colors[i++];
          let card = new Card(row, colum, actualColor); // Crea la carta
          this.#cards.push(card); // Guardamos la carta en un array
          this.#container.append(card.element); // Agregamos el div al contenedor
          card.element.addEventListener("click", () =>
            this.#handleCardClick(card)
          );
        }
      }
      this.saveInLocalStorage();
    }
  }

  saveInLocalStorage() {
    let cardsToLocalStorage = this.#cards.map((card) => {
      return {
        row: card.row,
        col: card.col,
        color: card.getColor(),
        open: card.isOpen(),
      };
    });
    localStorage.setItem("cards", JSON.stringify(cardsToLocalStorage));
  }

  #handleCardClick(card) {
    if (card.isOpen() || this.#selectedCards.includes(card)) return;
    card.show();
    this.#selectedCards.push(card);

    if (this.#selectedCards.length === 2) {
      const [card1, card2] = this.#selectedCards;

      if (card1.getColor() === card2.getColor()) {
        card1.markAsOpen();
        card2.markAsOpen();
        this.#openCards.push(card1.element, card2.element);
        this.saveInLocalStorage();
        this.#finishCheck();
      } else {
        // Ocualtar cartas después de un breve retraso
        setTimeout(() => {
          card1.hide();
          card2.hide();
        }, 200);
      }
      this.#selectedCards = [];
    }
  }

  #finishCheck() {
    if (this.#openCards.length == this.#cards.length) {
      setTimeout(() => {
        this.timer.stop();
        alert("Juego finalizado!!!");
      }, 200);
    }
  }

  setCSSBoxTemplates() {
    this.#container.style.gridTemplateColumns = `repeat(${this.#cols}, 1fr)`;
    this.#container.style.gridTemplateRows = `repeat(${this.#rows}, 1fr)`;
  }

  static getRowsCols() {
    let rows, cols;

    if (
      localStorage.getItem("rows") !== null &&
      localStorage.getItem("cols") !== null
    ) {
      rows = parseInt(localStorage.getItem("rows"));
      cols = parseInt(localStorage.getItem("cols"));
    } else {
      rows = prompt("Introduzca número de filas");
      cols = prompt("Introduzca número de columnas");

      while ((rows * cols) % 2 != 0) {
        alert("El número de cartas debe ser un número par.");
        rows = Number(prompt("Introduzca el número de filas"));
        cols = Number(prompt("Introduzca el número de columnas"));
      }

      localStorage.setItem("rows", rows);
      localStorage.setItem("cols", cols);
    }

    return {
      rows: rows,
      cols: cols,
    };
  }

  initTimer() {
    this.timer = new Timer();
    this.timer.start();
  }
}

export default Game;
