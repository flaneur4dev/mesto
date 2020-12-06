export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector}) {
    this._user = document.querySelector(nameSelector);
    this._aboutUser = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._user.textContent,
      about: this._aboutUser.textContent
    }
  }

  setUserInfo({ name, about, _id }) {
    this._user.textContent = name;
    this._aboutUser.textContent = about;
    this.userId = _id
  }

  getUserAvatar() {
    return {
      avatar: this._userAvatar.src
    }
  }

  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar
  }
}
