import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formInputs = this.popup.querySelectorAll('.popup__input');
    this._inputsErrors = this.popup.querySelectorAll('.popup__input-error')
  }

  _getInputValues() {
    return [...this._formInputs].reduce((result, input) => {
      result[input.id] = input.value;
      return result
    }, {})
  }

  setInputValues(data) {
    this._formInputs[0].value = data ? data.person : '';
    this._formInputs[1].value = data ? data.about : '';
  }

  close() {
    this._formInputs.forEach(item => item.setCustomValidity(''));
    this._inputsErrors.forEach(item => item.textContent = '');

    super.close()
  }

  setEventListeners() {
    super.setEventListeners();

    this.popup.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close()
    }) 
  }
}
