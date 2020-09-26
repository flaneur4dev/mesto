let editButton = document.querySelector('.profile__button_type_edit-button'),
    closeButton = document.querySelector('.popup__button_type_close-button'),
    submitButton = document.querySelector('.popup__button_type_submit-button'),
    userName = document.querySelector('.profile__title'),
    userJob = document.querySelector('.profile__subtitle'),
    inputName = document.querySelector('#name'),
    inputJob = document.querySelector('#job'),
    popup = document.querySelector('.popup'),
    popupForm = document.querySelector('.popup__container');

// открытие формы
editButton.addEventListener('click', popupToggle);

// ставим "прослушку" на некорректный ввод данных
checkInput(inputName);
checkInput(inputJob);

// сохранение формы
popupForm.addEventListener('submit', formSubmit);

// закрытие формы
closeButton.addEventListener('click', popupToggle);

/* ******* Функции ******* */

// переключалка для popup
function popupToggle() {
  if (popup.classList.contains('popup_opened')) {
    inputName.value = '';
    inputJob.value = '';
    if (submitButton.getAttribute('disabled')) submitButton.removeAttribute('disabled');
  } else {
    inputName.value = userName.textContent;
    inputJob.value = userJob.textContent;
  }
  popup.classList.toggle('popup_opened');
}

// отправка формы
function formSubmit(event) {
  event.preventDefault();

  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;

  popup.classList.toggle('popup_opened');
}

// задаем поведение submitButton исходя из проверки checkSpace()
function checkInput(input) {
  input.addEventListener('input', () => {
    if (checkSpace(input.value) || !input.value.length) {
      submitButton.setAttribute('disabled', true);
    } else {
      submitButton.removeAttribute('disabled');
    }
  })
}

// проверяем наличие одних пробелов при вводе
function checkSpace(value) {
  let calc = 0;
  for (let i = 0; i < value.length; i ++) {
    if (value[i] == ' ') calc ++;
  }
  return (value.length == calc && value.length) ? true : false;
}
