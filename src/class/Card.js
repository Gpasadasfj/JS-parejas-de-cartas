class Card {
  #col;
  #row;
  #color;
  #open;
  element;

  constructor(row, col, color, open = false) {
    this.#col = col;
    this.#row = row;
    this.#color = color;
    this.#open = open;
    this.element = this.#createElement();

    if (this.open) {
      this.show();
    }
  }

  #createElement() {
    let newCard = document.createElement("div"); // Crea la carta
    newCard.classList.add("card"); // Asigna clase CSS
    newCard.dataset.color = this.#color;
    newCard.dataset.open = this.#open;
    newCard.style.backgroundColor = this.#open ? this.#color : "black";

    return newCard;
  }

  show() {
    this.element.style.backgroundColor = this.#color;
  }

  hide() {
    if (!this.#open) {
      this.element.style.backgroundColor = "black";
    }
  }

  markAsOpen() {
    this.#open = true;
    this.element.dataset.open = true;
  }

  isOpen() {
    return this.#open;
  }

  getColor() {
    return this.#color;
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }

  get open() {
    return this.#open;
  }
}

export default Card;
