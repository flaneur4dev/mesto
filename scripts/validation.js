function setCustomErrorMessages(input) {
	input.setCustomValidity('');
	if (input.validity.patternMismatch) {
		input.setCustomValidity('Текст не должен начинаться с пробела и содержать одни пробелы');
	}
}

function toggleMessageState(form, input) {
	setCustomErrorMessages(input);
	form.checkValidity()
				? input.nextElementSibling.textContent = ''
				: input.nextElementSibling.textContent = input.validationMessage
}

function toggleButtonState(form, buttonElement) {
	form.checkValidity() ? buttonElement.disabled = false : buttonElement.disabled = true
}

function enableValidation({ buttonSelector }) {
	[...document.forms].forEach(form => {
		form.addEventListener('input', event => {
			const buttonElement = form.querySelector(buttonSelector);
			toggleMessageState(form, event.target);
			toggleButtonState(form, buttonElement);
		})
	});
}

enableValidation({
  buttonSelector: '[type="submit"]',
});
