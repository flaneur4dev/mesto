let editButton = document.querySelector('.button_type_edit-button'),
    closeButton = document.querySelector('.button_type_close-button'),
    submitButton = document.querySelector('.button_type_submit-button'),
    userName = document.querySelector('.profile__title'),
    userJob = document.querySelector('.profile__subtitle'),
    inputName = document.querySelector('#name'),
    inputJob = document.querySelector('#job'),
    popup = document.querySelector('.popup'),
    popupForm = document.querySelector('.popup__container');

// открытие формы
editButton.addEventListener('click', () => {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  // inputName.setAttribute('autofocus', true);

  popup.classList.add('popup_opened');
})

// ставим "прослушку" на некорректный ввод данных
checkInput(inputName);
checkInput(inputJob);

// сохранение формы
popupForm.addEventListener('submit', event => {
  event.preventDefault();

  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;

  popup.classList.remove('popup_opened');
})

// закрытие формы
closeButton.addEventListener('click', () => {
  inputName.value = '';
  inputJob.value = '';

  if (submitButton.getAttribute('disabled')) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('button_disabled');
  }  

  popup.classList.remove('popup_opened');
})

/* ******* Функции ******* */

// Задаем поведение submitButton исходя из проверки checkSpace()
function checkInput (input) {
  input.addEventListener('input', () => {
    if (checkSpace(input.value)) {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add('button_disabled');
    } else {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove('button_disabled');
    }
  })
}

// Проверяем наличие одних пробелов при вводе
function checkSpace(value) {
  let calc = 0;
  for (let i = 0; i < value.length; i ++) {
    if (value[i] == ' ') calc ++;
  }
  return (value.length == calc && value.length) ? true : false;
}
