import { Api } from '../components/Api';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { app } from '../utils/constants.js';
import './index.css';

const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
      authorization: '934c46c5-5482-4ae2-9c3d-a386fe87103e',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
)

const addFormValidation = new FormValidator(app.validation, app.forms.addForm);
const editFormValidation = new FormValidator(app.validation, app.forms.editForm);
const avatarFormValidation = new FormValidator(app.validation, app.forms.avatarForm);

const userInfo = new UserInfo(app.userInfo);

const cardList = new Section(
  app.selectors.containerSelector,
  item => {
    cardList.addItem(
      new Card(
        item,
        app.selectors.cardTemplate,
        handleLikeClick,
        handleTrashClick,
        handleMousemove,
        handleMouseleave
        ).createCard(userInfo.userId))
  }
);

const addPopup = new PopupWithForm(
  app.selectors.addPopup,
  newCard => {
    app.buttons.createButton.innerHTML = 'Добавление <span class ="dot">.</span>';

    api.addCard(newCard)
      .then(data => {
        cardList.addItem(
          new Card(
            data,
            app.selectors.cardTemplate,
            handleLikeClick,
            handleTrashClick,
            handleMousemove,
            handleMouseleave
            ).createCard(userInfo.userId))
      })
      .catch(err => alert(err))
      .finally(() => {
        app.buttons.createButton.innerHTML = 'Добавить';
        addPopup.close()
      })
  },
  addFormValidation.clearInput,
  addFormValidation.clearError
);

const editPopup = new PopupWithForm(
  app.selectors.editPopup,
  newData => {
    app.buttons.saveButton.innerHTML = 'Сохранение <span class ="dot">.</span>';

    api.updateUserData(newData)
      .then(data => userInfo.setUserInfo(data))
      .catch(err => alert(err))
      .finally(() => {
        app.buttons.saveButton.innerHTML = 'Сохранить';
        editPopup.close()
      })
  },
  editFormValidation.clearInput,
  editFormValidation.clearError
);

const avatarPopup = new PopupWithForm(
  app.selectors.avatarPopup,
  newAvatar => {
    app.buttons.saveAvatarButton.innerHTML = 'Сохранение <span class ="dot">.</span>';

    api.updateAvatar(newAvatar)
      .then(data => userInfo.setUserAvatar(data))
      .catch(err => alert(err))
      .finally(() => {
        app.buttons.saveAvatarButton.innerHTML = 'Сохранить';
        avatarPopup.close()
      })
  },
  avatarFormValidation.clearInput,
  avatarFormValidation.clearError
);

const confirmPopup = new PopupWithForm(
  app.selectors.confirmPopup,
  () => {
    app.buttons.confirmButton.innerHTML = 'Удаление <span class ="dot">.</span>';

    api.deleteCard(app.cardId)
      .then(() => app.cardElement.remove())
      .catch(err => alert(err))
      .finally(() => {
        app.buttons.confirmButton.innerHTML = 'Да';
        confirmPopup.close()
      })
  }
);

const imagePopup = new PopupWithImage(app.selectors.imagePopup);



// всплывающие подсказки (для длинного текста)
const tip = document.createElement('span');
tip.className = 'tip';
document.scripts[0].before(tip);

/*** Функции-обработчики ***/

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

// обработчики для карточек
function handleLikeClick(cardId, isLiked) {
  if (isLiked) {
    api.deleteLike(cardId)
      .then(data => {
        if (data.likes.some(item => item._id !== userInfo.userId) || !data.likes.length) this._changeLike(data.likes.length)
      }).catch(err => alert(err))
  } else {
    api.addLike(cardId)
      .then(data => {
        if (data.likes.some(item => item._id === userInfo.userId)) this._changeLike(data.likes.length)
      }).catch(err => alert(err))
  }
}

function handleTrashClick(cardid, element) {
  app.cardId = cardid;
  app.cardElement = element;
  confirmPopup.open()
}

/*** Объекты-обработчики ***/

// открытие модальных окон с формами
const openPopup = {
  handleEvent(event) {
    this[event.target.name](event);
  },
  'add-button'() {
    app.buttons.createButton.disabled = true;
    addPopup.setInputValues();
    addPopup.open()
  },
  'edit-button'() {
    app.buttons.saveButton.disabled = '';
    editPopup.setInputValues(userInfo.getUserInfo());
    editPopup.open()
  },
  'avatar-button'() {
    app.buttons.saveAvatarButton.disabled = '';
    avatarPopup.setInputValues(userInfo.getUserAvatar());
    avatarPopup.open()
  }
}

const onMousedown = {
  handleEvent(event) {
    this[event.target.name](event);
  },
  'add-button'() {
    addPopup.preOpen()
  },
  'edit-button'() {
    editPopup.preOpen()
  },
  'avatar-button'() {
    avatarPopup.preOpen()
  }
}

// начальная загрузка
Promise.all([
  api.getUserData(),
  api.getInitialCards()
]).then(([ data, cards ]) => {
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    cardList.renderItems(cards)
}).catch(err => alert(err));

addFormValidation.enableValidation();
editFormValidation.enableValidation();
avatarFormValidation.enableValidation();

/*** Слушатели ***/

addPopup.setEventListeners();
editPopup.setEventListeners();
imagePopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

document.querySelectorAll('[data-event*="click"]').forEach(item => item.addEventListener('click', openPopup));
document.querySelectorAll('[data-event*="mousedown"]').forEach(item => item.addEventListener('mousedown', onMousedown));

document.querySelectorAll('[data-title]').forEach(item => {
	item.addEventListener('mousemove', handleMousemove);
	item.addEventListener('mouseleave', handleMouseleave)
});

cardList.container.onclick = Card.handleCardClicks(imagePopup);
cardList.container.onmousedown = Card.handleCardMousedown(imagePopup, confirmPopup);
