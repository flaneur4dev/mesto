import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this.popup.querySelector('.popup__image');
    this._popupTitle = this.popup.querySelector('.popup__caption')
  }

  open() {
    this._popupImage.src = event.target.src;
    this._popupImage.alt = event.target.alt;
    this._popupTitle.textContent = event.target.parentElement.querySelector('.element__title').textContent;

    super.open()
  }
}
