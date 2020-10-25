const {existingUser} = require('../../configuration/constans');
import Popups from '../Popups';

export default class RegistrationPopup extends Popups {
  constructor(popup, apiClass) {
    super(popup);
    this.apiClass = apiClass;
  }

  setAuthorisationPopup(authorisationPopup) {
    this.authorisationPopup = authorisationPopup;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.querySelector('#authorisation-link').addEventListener('click', this.openAuthorisationPopup.bind(this));
  }

  open() {
    super.open();
  }

  popupFormSubmit(event) {
    event.preventDefault();
    const {email, password, name} = event.target;
    this.apiClass.signup({
      name: name.value,
      email: email.value,
      password: password.value
    }, this.processQueryResult.bind(this));
  }

  processQueryResult(result) {
    if (result.message.length > 0 && !result.data) {
      this.errorShow(result.message);
      console.log('Ошибка: ', result.message);
    } else {
      this.setPassedPopupState();
    }

  }

  openAuthorisationPopup() {
    this.close();
    this.authorisationPopup.open();
  }


  setPassedPopupState() {
    this.popup.querySelector('.popup__title').textContent = 'Пользователь успешно зарегистрирован!';
    this.popup.querySelector('.popup__form').remove();
    this.popup.querySelector('.popup__text').remove();
    const link = document.createElement('a');
    link.textContent = 'Выполнить вход';
    link.classList.add('text_blue');
    link.setAttribute('href', '#');
    this.popup.querySelector('.popup__content').appendChild(link);
    link.addEventListener('click', this.openAuthorisationPopup.bind(this));
  }

}