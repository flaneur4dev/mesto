import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  initialCards,
  saveButton,
  createButton
} from '../utils/constants.js';

import './index.css';

FormValidator.all({ buttonSelector: '[type="submit"]' });
Card.prototype._handleMousemove = handleMousemove;
Card.prototype._handleMouseleave = handleMouseleave;

const cardList = new Section({
  items: initialCards,
  renderer: item => cardList.addItem(new Card(item, '#card-template').createCard())
}, '.elements');

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

const addPopup = new PopupWithForm('#add-popup', data => cardList.addItem(new Card(data, '#card-template').createCard()));
const editPopup = new PopupWithForm('#edit-popup', data => userInfo.setUserInfo(data));
const imagePopup = new PopupWithImage('#image-popup');

// всплывающие подсказки
const tip = document.createElement('span');
tip.className = 'tip';
document.scripts[0].before(tip);

/*** Функции-обработчики ***/

// обработчик для карточек
function cardEvents(event) {
  switch(event.target.name) {
    case 'image-button':
      imagePopup.open();
      break;
    case 'like-button':
      event.target.classList.toggle('element__button_type_black-like');
      break;
    case 'trash-button':
      event.target.parentElement.remove();
      break;
  }
}

// обработчики для всплывающих подсказок
function handleMousemove(event) {
  if (event.target.scrollWidth > event.target.clientWidth) {
    tip.style.left = `${event.clientX + window.pageXOffset + 10}px`;
    tip.style.top = `${event.clientY + window.pageYOffset + 10}px`;
    tip.textContent = event.target.textContent;
    tip.style.display = 'block';
  }
}

function handleMouseleave() {
  tip.style.display = 'none';
}

/*** Объекты-обработчики ***/

// открытие модальных окон с формами
const openPopup = {
  handleEvent(event) {
    this[event.target.name](event);
  },
  'add-button'() {
    createButton.disabled = true;
    addPopup.setInputValues();
    addPopup.open()
  },
  'edit-button'() {
    saveButton.disabled = ''
    editPopup.setInputValues(userInfo.getUserInfo());
    editPopup.open()
  },
}

const onMousedown = {
  handleEvent(event) {
    this[event.target.name](event);
  },
  'add-button'() {
    addPopup.popup.style.display = 'flex'
  },
  'edit-button'() {
    editPopup.popup.style.display = 'flex'
  },
}

cardList.renderItems();

/*** Слушатели ***/

addPopup.setEventListeners();
editPopup.setEventListeners();
imagePopup.setEventListeners();

document.querySelectorAll('[data-event*="click"]').forEach(item => item.addEventListener('click', openPopup));
document.querySelectorAll('[data-event*="mousedown"]').forEach(item => item.addEventListener('mousedown', onMousedown));

cardList.container.onclick = cardEvents;
cardList.container.onmousedown = event => {
  if (event.target.name == 'image-button') imagePopup.popup.style.display = 'flex'
};

document.querySelectorAll('[data-title]').forEach(item => {
	item.addEventListener('mousemove', handleMousemove);
	item.addEventListener('mouseleave', handleMouseleave)
})
