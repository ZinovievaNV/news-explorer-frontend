// const { errorMessage } = require('../configuration/constants');
export default class FormValidator {
  constructor(form, error) {
    this.form = form;
    this.error = error;
    //this.apiClass = apiClass;
    this.setEventListeners();
    this.setSubmitButtonState();

  }


  checkAllValidity(form) {
    let isAllValid = true;
    Array.from(form.querySelectorAll('input')).forEach(function (item) {
      if (!item.validity.valid) {
        isAllValid = false;
      }
    });
    return isAllValid;
  }

  checkValidity(event) {
    const inputElem = event.target;
    const errorElement = inputElem.nextElementSibling;
    this.checkInputValidity(inputElem, errorElement, this.error);
    this.setSubmitButtonState();

  }

  setEventListeners() {

    this.form.addEventListener('input', this.checkValidity.bind(this));

  }

  setSubmitButtonState() {
    const buttonPopup = this.form.querySelector('.popup__button');


    if (this.checkAllValidity(this.form)) {
      buttonPopup.classList.add('button-blue');
      buttonPopup.disabled = false;
    } else {
      buttonPopup.classList.remove('button-blue');
      buttonPopup.disabled = true;

    }


  }



  activateError(elem) {
    elem.classList.add('popup__error-show');
  }

  resetError(elem) {
    elem.classList.remove('popup__error-show');
    elem.textContent = '';

  }

  checkInputValidity(input, errElem, text) {

    if (input.validity.valid) {
      this.resetError(errElem);
      return true;
    }
    if (input.validity.valueMissing) {
      errElem.textContent = text.valueMissing;
      this.activateError(errElem);
      return false;
    }
    if (input.validity.tooShort) {
      errElem.textContent = text.tooShort.replace('#minlength#', input.getAttribute('minlength'));
      this.activateError(errElem);
      return false;
    }
    if (input.validity.tooLong) {
      errElem.textContent = text.tooShort;
      this.activateError(errElem);
      return false;
    }
    if (input.validity.typeMismatch) {
      errElem.textContent = text.typeMismatch;
      this.activateError(errElem);
      return false;
    }
  }


}