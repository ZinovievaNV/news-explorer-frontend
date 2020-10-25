import Popups from '../Popups';

export default class AuthorisationPopup extends Popups {
  constructor(popup, apiClass, headerClass) {
    super(popup);
    this.apiClass = apiClass;
    this.headerClass = headerClass;
  }

  setRegistrationPopup(registrationPopup) {
    this.registrationPopup = registrationPopup;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.querySelector('#register-link').addEventListener('click', this.openRegistrationPopup.bind(this));
  }

  open() {
    super.open();
  }

  openRegistrationPopup() {
    this.close();
    this.registrationPopup.open();
  }

  popupFormSubmit(event) {
    event.preventDefault();
    const {email, password} = event.target;
    this.apiClass.signin({email: email.value, password: password.value}, this.processQueryResult.bind(this));

  }

  processQueryResult(result) {
    if (!result.token) {
      this.errorShow(result.message);
      console.log("Ошибка авторизации")
    } else {
      this.close();
      localStorage.setItem('token', result.token);
      this.headerClass.getUserInfo();
      this.reset();
    }

  }

}