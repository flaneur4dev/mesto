export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  _setEventListeners() {
    this._cardTitle.addEventListener('mousemove', event => this._handleMousemove(event));
    this._cardTitle.addEventListener('mouseleave', () => this._handleMouseleave());
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  static addElement(name, link, templateSelector, parentNode) {
    parentNode.prepend(new this(name, link, templateSelector).createCard())
  }
}
