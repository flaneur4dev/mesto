import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';
import { appConfig } from '../utils/constants.js';

import './index.css';

Card.prototype._handleMousemove = handleMousemove;
Card.prototype._handleMouseleave = handleMouseleave;

const addFormValidation = new FormValidator(appConfig.data.validation, appConfig.forms.addForm);
const editFormValidation = new FormValidator(appConfig.data.validation, appConfig.forms.editForm);

const cardList = new Section({
  items: appConfig.data.initialCards,
  renderer: item => cardList.addItem(new Card(item, appConfig.selectors.cardTemplate).createCard())
}, appConfig.selectors.containerSelector);

const userInfo = new UserInfo(appConfig.data.userInfo);

const addPopup = new PopupWithForm(appConfig.selectors.addPopup, data => cardList.addItem(new Card(data, appConfig.selectors.cardTemplate).createCard()));
const editPopup = new PopupWithForm(appConfig.selectors.editPopup, data => userInfo.setUserInfo(data));
const imagePopup = new PopupWithImage(appConfig.selectors.imagePopup);

// всплывающие подсказки
const tip = document.createElement('span');
tip.className = 'tip';
document.scripts[0].before(tip);

/*** Функции-обработчики ***/

// обработчики для всплывающих подсказок

/**
 * Весь функционал, представленный в данном проекте, рабочий (иначе его бы не было).
 * В приложении есть текстовые поля, содержимое которых может выходить за границы этих полей.
 * Например, "Челябинская о...". И у пользователя нет возможности увидеть текст полностью.
 * Это не очень "user friendly".
 * Поэтому была добавлена новая "фича": при наведении курсора на блок со скрытым текстом,
 * появляется подсказка с полным текстовым содержанием.
 * Так как этот функционал присутствует не только у карточек, но и у блока с данными пользователя,
 * использовалась примесь (mixin) в прототип карточки.
*/

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
    appConfig.buttons.createButton.disabled = true;
    addPopup.setInputValues();
    addPopup.open()
  },
  'edit-button'() {
    appConfig.buttons.saveButton.disabled = '';
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
addFormValidation.enableValidation();
editFormValidation.enableValidation();

/*** Слушатели ***/

addPopup.setEventListeners();
editPopup.setEventListeners();
imagePopup.setEventListeners();

cardList.container.onclick = Card.handleCardClicks(imagePopup);
cardList.container.onmousedown = Card.handleCardMousedown(imagePopup);

document.querySelectorAll('[data-event*="click"]').forEach(item => item.addEventListener('click', openPopup));
document.querySelectorAll('[data-event*="mousedown"]').forEach(item => item.addEventListener('mousedown', onMousedown));

document.querySelectorAll('[data-title]').forEach(item => {
	item.addEventListener('mousemove', handleMousemove);
	item.addEventListener('mouseleave', handleMouseleave)
})
