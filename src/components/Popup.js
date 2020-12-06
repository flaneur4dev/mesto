export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('[name="close-button"]');
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') this.close()
  }

  preOpen() {
    this._popup.style.display = 'flex'
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened')
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');

    this._popup.ontransitionend = () => {
			this._popup.ontransitionend = '';
			this._popup.style.display = 'none'
		}
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close())
    this._popup.addEventListener('mousedown', event => {
      if (event.target === event.currentTarget) this.close()
    })
  }
}
