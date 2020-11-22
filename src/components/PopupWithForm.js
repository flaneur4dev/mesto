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

  /**
   * Если у объекта есть get-функция для получения значений, хорошо бы иметь также set-функцию
   * для установки этих значений (очень часто объекты обладают этими двумя сущностями).
   * Поэтому оставил данный метод, но сделал его универсальным.
  */
  setInputValues(data) {
    this._formInputs.forEach(input => input.value = data ? data[input.id] : '')
  }

  close() {
    this._formInputs.forEach(input => input.setCustomValidity(''));
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
