export class Section {
  constructor(containerSelector, renderer) {
    this._renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderItems(cards) {
    cards.forEach(card => this._renderer(card))
  }

  addItem(element) {
    this.container.prepend(element)
  }
}
