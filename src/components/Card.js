export class Card {
  constructor(
    { name, link, likes, owner, _id },
    templateSelector,
    handleLikeClick,
    handleTrashClick,
    handleMousemove,
    handleMouseleave) {
      this._name = name;
      this._link = link;
      this._likes = likes;
      this._isLiked = false;
      this._cardId = _id;
      this._cardOwnerId = owner._id;
      this._templateSelector = templateSelector;

      this._handleLikeClick = handleLikeClick;
      this._handleTrashClick = handleTrashClick;
      this._handleMousemove = handleMousemove;
      this._handleMouseleave = handleMouseleave
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  _setEventListeners() {
    this._cardTitle.addEventListener('mousemove', this._handleMousemove);
    this._cardTitle.addEventListener('mouseleave', this._handleMouseleave);
   
    this._trashButton.addEventListener('click', () => this._handleTrashClick(this._cardId, this._element));
    this._likeButton.addEventListener('click', () => this._handleLikeClick( this._cardId, this._isLiked))
  }

  createCard(userId) {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardLikes = this._element.querySelector('.element__likes');
    this._likeButton = this._element.querySelector('[name="like-button"]');
    this._trashButton = this._element.querySelector('[name="trash-button"]');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._cardLikes.textContent = this._likes.length;

    if (this._cardOwnerId !== userId) this._trashButton.remove();
    
    if (this._likes.some(item => item._id === userId)) {
      this._likeButton.classList.add('element__button_type_black-like');
      this._isLiked = true
    }

    this._setEventListeners();

    return this._element;
  }

  _changeLike(amount) {
    this._likeButton.classList.toggle('element__button_type_black-like');
    this._cardLikes.textContent = amount;
    this._isLiked = !this._isLiked
  }

  static handleCardClicks(imagePopup) {
		return function(event) {
			if (event.target.name === 'image-button') imagePopup.open();
		}
	}
	
	static handleCardMousedown(imagePopup, confirmPopup) {
		return function(event) {
			if (event.target.name === 'image-button') imagePopup.preOpen()
			if (event.target.name === 'trash-button') confirmPopup.preOpen()
		}
	}
}
