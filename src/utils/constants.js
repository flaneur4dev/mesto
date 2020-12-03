export const app = {
	selectors: {
		addPopup: '#add-popup',
		editPopup: '#edit-popup',
		imagePopup: '#image-popup',
		avatarPopup: '#avatar-popup',
		confirmPopup: '#confirm-popup',
		cardTemplate: '#card-template',
		containerSelector: '.elements'
	},
	forms: {
		addForm: document.forms['add-form'],
		editForm: document.forms['edit-form'],
		avatarForm: document.forms['avatar-form']
	},
	buttons: {
		saveButton: document.querySelector('[name="save-button"]'),
		createButton: document.querySelector('[name="create-button"]'),
		confirmButton: document.querySelector('[name="confirm-button"]'),
		saveAvatarButton: document.querySelector('[name="save-avatar-button"]'),
	},
	validation: {
		buttonSelector: '[type="submit"]'
	},
	userInfo: {
		nameSelector: '.profile__title',
		aboutSelector: '.profile__subtitle',
		avatarSelector: '.profile__image'
	}
}
