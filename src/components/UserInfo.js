export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._user = document.querySelector(nameSelector);
    this._aboutUser = document.querySelector(aboutSelector)
  }

  getUserInfo() {
    return {
      person: this._user.textContent,
      about: this._aboutUser.textContent
    }
  }

  setUserInfo({ person, about }) {
    this._user.textContent = person;
    this._aboutUser.textContent = about
  }
}
