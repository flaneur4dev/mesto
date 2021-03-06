export class FormValidator {
  constructor({ buttonSelector }, form) {
    this._form = form;
    this._button = this._form.querySelector(buttonSelector)
  }

  _toggleMessageState(input) {
    this._setCustomErrorMessages(input);
    this._form.checkValidity()
          ? input.nextElementSibling.textContent = ''
          : input.nextElementSibling.textContent = input.validationMessage
  }

  _toggleButtonState() {
    this._button.disabled = !this._form.checkValidity()
  }

  _setCustomErrorMessages(input) {
    input.setCustomValidity('');
    if (input.validity.patternMismatch) {
      input.setCustomValidity('Текст не должен начинаться с пробела и содержать одни пробелы');
    }
  }

  clearInput(input) {
    input.setCustomValidity('')
  }

  clearError(error) {
    error.textContent = ''
  }

  enableValidation() {
    this._form.addEventListener('input', event => {
			this._toggleMessageState(event.target);
			this._toggleButtonState();
		})
  }
}
