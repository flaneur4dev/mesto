/**
 * Так как используется прием "делегирование событий" функция handleCardClick()
 * стала статическим методом класса.
*/

export class Card {
  constructor({ name, link }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  _setEventListeners() {
    this._cardTitle.addEventListener('mousemove', this._handleMousemove);
    this._cardTitle.addEventListener('mouseleave', this._handleMouseleave);
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

  static handleCardClicks(imagePopup) {
		return function(event) {
			switch(event.target.name) {
				case 'image-button':
					imagePopup.open();
					break;
				case 'like-button':
					event.target.classList.toggle('element__button_type_black-like');
					break;
				case 'trash-button':
					event.target.parentElement.remove();
					break;
			}
		}
	}
	
	static handleCardMousedown(imagePopup) {
		return function(event) {
			if (event.target.name === 'image-button') imagePopup.popup.style.display = 'flex'
		}
	}
}
