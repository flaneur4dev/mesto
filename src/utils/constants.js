export const appConfig = {
	selectors: {
		cardTemplate: '#card-template',
		editPopup: '#edit-popup',
		addPopup: '#add-popup',
		imagePopup: '#image-popup',
		containerSelector: '.elements'
	},
	forms: {
		addForm: document.forms['add-form'],
		editForm: document.forms['edit-form']
	},
	buttons: {
		saveButton: document.querySelector('[name="save-button"]'),
		createButton: document.querySelector('[name="create-button"]')
	},
	data: {
		initialCards: [
			{
				name: 'Архыз',
				link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
			},
			{
				name: 'Челябинская область',
				link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
			},
			{
				name: 'Камчатка',
				link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
			},
			{
				name: 'Иваново',
				link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
			},
			{
				name: 'Холмогорский район',
				link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
			},
			{
				name: 'Байкал',
				link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
			}
		],
		validation: {
			buttonSelector: '[type="submit"]'
		},
		userInfo: {
			nameSelector: '.profile__title',
			aboutSelector: '.profile__subtitle'
		}
	}
}
