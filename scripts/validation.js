/* Способ валидации, который использовался в тренажере и который был предложен в качестве базового для проектной работы,
крайне сомнителен и неочевиден. В данной проектной работе было реализовано более простое и короткое решение */

/*** Переменные ***/

const editFormInputs = document.forms['edit-form'].querySelectorAll('.popup__input');
const addFormInputs = document.forms['add-form'].querySelectorAll('.popup__input');

/*** Функции ***/

// проверка на случай если введены одни пробелы
function hasWhiteSpace(value) {
  let calc = 0;
  for (let ch of value) {
    if (ch == ' ') calc ++;
  }
  return value.length == calc || !value.length
}

// валидация
function setSubmitButton(collection) {
  [...collection].some(item => !item.validity.valid || hasWhiteSpace(item.value))
						? (event.target.parentElement.nextElementSibling.setAttribute('disabled', true),
							event.target.nextElementSibling.textContent = event.target.validationMessage)
						: (event.target.parentElement.nextElementSibling.removeAttribute('disabled'),
							event.target.nextElementSibling.textContent = '')         
}

/*** Объекты-обработчики ***/

const checkInput = {
  handleEvent(event) {
    this[event.target.form.name](event);
  },
  'edit-form'() {setSubmitButton(editFormInputs)},
  'add-form'() {setSubmitButton(addFormInputs)}
}

/*** Слушатели ***/

document.body.addEventListener('input', checkInput);
