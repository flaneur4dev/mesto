import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, clearInput, clearError) {
    super(popupSelector);
    this._formInputs = this._popup.querySelectorAll('.popup__input');
    this._inputsErrors = this._popup.querySelectorAll('.popup__input-error');

    this._handleSubmit = handleSubmit;
    this._clearInput = clearInput;
    this._clearError = clearError
  }

  _getInputValues() {
    return [...this._formInputs].reduce((result, input) => {
      result[input.name] = input.value;
      return result
    }, {})
  }

  setInputValues(data) {
    this._formInputs.forEach(input => input.value = data ? data[input.name] : '')
  }

  close() {
    this._formInputs.forEach(input => this._clearInput(input));
    this._inputsErrors.forEach(error => this._clearError(error));
    
    super.close()
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
    }) 
  }
}
