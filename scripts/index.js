/* ВАЖНО!!! 
При проверке файла не пользуйтесь практикумным редактором, он "ломает" код и его невозможно читать.
Пользуйтесь полноценными редакторами кода или смотрите работу на Github. Там все корректно.*/


/*** Переменные ***/

const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
];
const addPopup = document.querySelector('#add-popup');
const editPopup = document.querySelector('#edit-popup');
const imagePopup = document.querySelector('#image-popup');
const createButton = document.querySelector('[name="create-button"]');
const saveButton = document.querySelector('[name="save-button"]');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__caption');
const cardTemplate = document.querySelector('#card-template').content;
const cardGroup = document.querySelector('.elements');

// всплывающие подсказки
const tip = document.createElement('span');
tip.className = 'tip';
document.body.lastElementChild.before(tip);

/*** Функции ***/

function getValue(formName, inputName) {
  return document.forms[formName].elements[inputName].value
}

function exchangeContent(type, ...selectors) {
  switch(type) {
    case 'text':
      document.querySelector(selectors[0]).textContent = document.querySelector(selectors[1]).value;
      break;
    case 'value':
      document.querySelector(selectors[0]).value = document.querySelector(selectors[1]).textContent;
      break;
    case 'empty':
      document.querySelector(selectors[0]).value = '';
      break;
  }
}

function cleanupError() {
  document.querySelectorAll('.popup__input-error').forEach(item => item.textContent = '');
}

// закрытие
function smoothClose() {
  let evt = event;
  document.onkeydown = '';
  cleanupError();
	event.target.closest('.popup').classList.toggle('popup_opened');
	setTimeout(() => {evt.target.closest('.popup').style.display = 'none'}, 700);
}

function escapeClose() {
  if (event.key == 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup) {
      document.onkeydown = '';
      cleanupError();
      currentPopup.classList.toggle('popup_opened');
      setTimeout(() => {currentPopup.style.display = 'none'}, 700);
    }
  }
}

// добавление карточек
function addCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__title').textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  
  cardGroup.prepend(cardElement)
}

initialCards.forEach(item => addCard(item.name, item.link));

/*** Функции-обработчики ***/

// события карточек
function cardEvents(event) {
  switch(event.target.name) {
    case 'image-button':
      document.onkeydown = escapeClose;
      popupImage.src = event.target.src;
      popupImage.alt = event.target.alt;
      popupTitle.textContent = event.target.parentElement.querySelector('.element__title').textContent;
      imagePopup.classList.toggle('popup_opened');
      break;
    case 'like-button':
      event.target.classList.toggle('element__button_type_black-like');
      break;
    case 'trash-button':
      event.target.parentElement.remove();
      break;
  }
}

/*** Объекты-обработчики ***/

// открытие(закрытие) модальных окон
const popupEvents = {
  handleEvent(event) {
    document.onkeydown = escapeClose;
    this[event.target.name](event);
  },
  'add-button'() {
    exchangeContent('empty', '#place');
    exchangeContent('empty', '#link');
    createButton.disabled = true;
    addPopup.classList.toggle('popup_opened')
  },
  'edit-button'() {
    exchangeContent('value', '#person', '.profile__title');
    exchangeContent('value', '#job', '.profile__subtitle');
    saveButton.disabled = ''
    editPopup.classList.toggle('popup_opened')
  },
  'close-button'() {smoothClose()}
}

const onMousedown = {
  handleEvent(event) {
    this[event.target.name](event);
  },
  'add-button'() {addPopup.style.display = 'flex'},
  'edit-button'() {editPopup.style.display = 'flex'},
}

// отправка форм
const formSubmit = {
	handleEvent(event) {
    event.preventDefault();
    this[event.submitter.name](event);
    smoothClose()
  },
	'save-button'() {
    exchangeContent('text', '.profile__title', '#person');
    exchangeContent('text', '.profile__subtitle', '#job');                      
  },
	'create-button'() {
    addCard(getValue('add-form', 'place'), getValue('add-form', 'link'))
  }
}

// обработка всплывающих подсказок
const forTips = {
	handleEvent(event) {
		this[event.type](event);
	},
	mousemove() {
		if (event.target.scrollWidth > event.target.clientWidth) {
			tip.style.left = `${event.clientX + window.pageXOffset + 10}px`;
			tip.style.top = `${event.clientY + window.pageYOffset + 10}px`;
			tip.textContent = event.target.textContent;
			tip.style.display = 'block';
		}
	},
	mouseleave() {
		tip.style.display = 'none';
	}
}

/*** Слушатели ***/

document.querySelectorAll('[data-event*="click"]').forEach(item => item.addEventListener('click', popupEvents));
document.querySelectorAll('[data-event*="mousedown"]').forEach(item => item.addEventListener('mousedown', onMousedown));

document.querySelectorAll('.popup').forEach(item => {
	item.onmousedown = event => {if (event.target == event.currentTarget) smoothClose()}
});

cardGroup.onclick = cardEvents;
cardGroup.onmousedown = event => {if (event.target.name == 'image-button') imagePopup.style.display = 'flex'};

document.body.addEventListener('submit', formSubmit);

document.querySelectorAll('[data-title]').forEach(item => {
	item.addEventListener('mousemove', forTips);
	item.addEventListener('mouseleave', forTips)
})
