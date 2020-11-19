export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._closeButton = this.popup.querySelector('[name="close-button"]')
  }

  _handleEscClose() {
    if (event.key === 'Escape') this.close()
  }

  open() {
    document.onkeydown = () => this._handleEscClose();
    this.popup.classList.add('popup_opened')
  }

  close() {
    document.onkeydown = '';
    this.popup.classList.remove('popup_opened');

    this.popup.ontransitionend = () => {
			this.popup.ontransitionend = '';
			this.popup.style.display = 'none'
		}
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close())
    this.popup.addEventListener('mousedown', event => {
      if (event.target === event.currentTarget) this.close()
    })
  }
}
