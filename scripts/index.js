/*** Переменные ***/

const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
];
const cardTemplate = document.querySelector('#card-template').content;

/*** Функции ***/

// получение значения поля ввода
function getValue(formName, inputName) {
  return document.forms[formName].elements[inputName].value
}

//перезапись значений из(в) полей(я) ввода
function exchangeContent(type, ...selectors) {
	return {
    text: () => document.querySelector(selectors[0]).textContent = document.querySelector(selectors[1]).value,
		value: () => document.querySelector(selectors[0]).value = document.querySelector(selectors[1]).textContent,
    empty: () => document.querySelector(selectors[0]).value = ''
	}[type]()
}

// открытие(закрытие) модальных окон
function popupToggle(event) {
  return {
    'add-button': () => {
                      exchangeContent('empty', '#place');
                      exchangeContent('empty', '#link');
                      document.querySelector('.popup__button[name="create-button"]').setAttribute('disabled', true);
                      document.querySelector('#add-popup').classList.toggle('popup_opened')
                    },
    'edit-button': () => {
                      exchangeContent('value', '#person', '.profile__title');
                      exchangeContent('value', '#job', '.profile__subtitle');
                      document.querySelector('#edit-popup').classList.toggle('popup_opened')
                    },
    'image-button': () => {
                      document.querySelector('.popup__image').src = event.target.src;
                      document.querySelector('.popup__image').alt = event.target.alt;
                      document.querySelector('.popup__caption').textContent = event.target.parentElement.querySelector('.element__title').textContent;
                      document.querySelector('#image-popup').classList.toggle('popup_opened')
                    },
    'close-button': () => {
                      if (event.target.previousElementSibling.hasAttribute('disabled')) event.target.previousElementSibling.removeAttribute('disabled');
                      event.target.closest('.popup').classList.toggle('popup_opened');
                      setTimeout(() => {event.target.closest('.popup').style.display = 'none'}, 700)
                    }
  }[event.target.name]()
}

// проверка наличия одних пробелов при вводе или пустой строки
function hasVoid(value) {
  let calc = 0;
  for (let ch of value) {
    if (ch == ' ') calc ++;
  }
  return (value.length == calc || !value.length) ? true : false;
}

// задание поведения кнопки отправки формы, исходя из проверки hasVoid()
function setSubmitButton(form, ...inputs) {
  (hasVoid(getValue(form, inputs[0])) || hasVoid(getValue(form, inputs[1])))
                    ? event.target.closest('.popup__wrapper').nextElementSibling.setAttribute('disabled', true)
                    : event.target.closest('.popup__wrapper').nextElementSibling.removeAttribute('disabled');
}

// устанавка setSubmitButton() для каждой формы
function checkInput(event) {
  return {
    'edit-form': () => setSubmitButton('edit-form', 'person', 'description'),
    'add-form': () => {
                      setSubmitButton('add-form', 'place', 'link');
                      if (!getValue('add-form', 'link').includes('https://')) document.querySelector('.popup__button[name="create-button"]').setAttribute('disabled', true);
                    }
  }[event.target.closest('.popup__container').name]()
}

// добавление карточек
function addCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__image').alt = name;
  cardElement.querySelector('.element__image').src = link;

  cardElement.querySelector('.element__button_type_like-button').onclick = event => event.target.classList.toggle('element__button_type_black-like');
  cardElement.querySelector('.element__button_type_trash-button').onclick = event => event.target.parentElement.remove();
  cardElement.querySelector('.element__image').onmousedown = () => document.querySelector('#image-popup').style.display = 'flex';
  cardElement.querySelector('.element__image').onclick = popupToggle;
  
  document.querySelector('.elements').prepend(cardElement)
}

// отправка форм
function formSubmit(event) {
  return {
    'save-buttom': () => {
                        event.preventDefault();
                        exchangeContent('text', '.profile__title', '#person');
                        exchangeContent('text', '.profile__subtitle', '#job');                      
                        event.target.closest('.popup').classList.toggle('popup_opened');
                        setTimeout(() => {event.target.closest('.popup').style.display = 'none'}, 700);
                      },
    'create-button': () => {
                        event.preventDefault();
                        addCard(getValue('add-form', 'place'), getValue('add-form', 'link'))
                        event.target.closest('.popup').classList.toggle('popup_opened');
                        setTimeout(() => {event.target.closest('.popup').style.display = 'none'}, 700);
                      }
  }[event.submitter.name]()
}

/*** Обработчики ***/

document.body.onload = () => initialCards.forEach(item => addCard(item.name, item.link)); // загрузка первых карточек

// обработчики модальных окон
document.querySelector('.profile__button_type_edit-button').onclick = popupToggle;
document.querySelector('.profile__button_type_add-button').onclick = popupToggle;
document.querySelector('.popup__button_type_close-button').onclick = popupToggle;
document.querySelectorAll('.popup__button_type_image-button').forEach(item => item.onclick = popupToggle);

// событие 'mousedown' введено для реализации плавности события 'click'
document.querySelector('.profile__button_type_edit-button').onmousedown = () => document.querySelector('#edit-popup').style.display = 'flex';
document.querySelector('.profile__button_type_add-button').onmousedown = () => document.querySelector('#add-popup').style.display = 'flex';

// обработчики форм
document.body.oninput = checkInput;
document.body.onsubmit = formSubmit;
