export default class Popups {
  constructor(popup) {

    this.popup = popup;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.reset = this.reset.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.parentPopup = document.querySelector('.wrapper');
    this.form = popup.querySelector('form');
    if (this.popup.dataset.popupActivator) {
      this.openButtons = document.querySelectorAll(`.${this.popup.dataset.popupActivator}`);
    }

    this.setEventListeners();

  }

  setEventListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    this.openButtons && this.openButtons.forEach(e => e.addEventListener('click', this.open.bind(this)));
    this.parentPopup.addEventListener('click', this.onClickClose);
    document.addEventListener('keydown', this.onClickClose);
     this.form.addEventListener('submit', this.popupFormSubmit.bind(this));
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  errorShow(err) {
    const userError = this.popup.querySelector('.popup__user-error');
    userError.style.display = 'flex';
    userError.textContent = err;

  }

  onClickClose(event) {
    if (event.keyCode === 27 && this.popup.classList.contains('popup_is-opened')) {
      this.close();
      return false;
    }
    if (event.target.classList.contains('popup__background')) {
      this.close();
      return false;
    }
  }

  reset() {
    this.form.reset();
  }
  popupFormSubmit() {

  }

}

