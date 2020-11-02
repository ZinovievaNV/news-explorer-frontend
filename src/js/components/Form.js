import BaseComponent from "./BaseComponent";

export default class Form extends BaseComponent{
  _validationErrorsMessages;
  constructor({formTemplateId, handlers, validationErrorsMessages}) {
    super(handlers);
    this._validationErrorsMessages = validationErrorsMessages;
    this._formTemplate = document.querySelector(`#${formTemplateId}`);
  }
  //добавляет форме ошибку, пришедшую с сервера;
  setServerError(err) {
    this._formErrorContainer.style.display = 'flex';
    this._formErrorContainer.textContent = err;
  }

  initForm() {
    this._form = this._formTemplate.content.cloneNode(true);
    this._submitButton = this._form.querySelector('.js-submit-button');
    this._formErrorContainer = this._form.querySelector('.js-form-error');
    this._setHandlers([
      {
        element: this._form.querySelectorAll('input'),
        event: 'input',
        callback: this._validateInputElementCallback.bind(this)
      }
    ]);
  }

  _validateInputElementCallback(e) {
    this._validateInputElement(e.target);
  }

  //валидирует переданный в качестве аргумента инпут;
  _validateInputElement(elem) {
    const errorElement = elem.parentElement.querySelector('.js-input-error-message');
    this.checkInputValidity(elem, errorElement, this._validationErrorsMessages);
    this.setSubmitButtonState(elem.validity.valid);
  }

  //валидирует всю форму;
  _validateForm() {
    for (let elem of this._form.querySelectorAll('input')) {
      this._validateInputElement(elem);
    }
  }

  //вспомогательный метод, очищает поля формы;
  _clear() {
    for (let elem of this._form.elements) {
      elem.reset();
    }
  }

  //вспомогательный метод, возвращает данные формы.
  _getInfo() {
    const formData = new FormData(this._form);
    const data = {};
    formData.forEach(function(value, key){
      data[key] = value;
    });
    return data;
  }

  isAllValid() {
    let isAllValid = true;
    Array.from(this._form.querySelectorAll('input')).forEach(function (item) {
      if (!item.validity.valid) {
        isAllValid = false;
      }
    });
    return isAllValid;
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
  activateError(elem) {
    elem.classList.add('popup__error-show');
  }
  resetError(elem) {
    elem.classList.remove('popup__error-show');
    elem.textContent = '';

  }
  setSubmitButtonState(active) {
    if (active) {
      this._submitButton.classList.add('button-blue');
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.remove('button-blue');
      this._submitButton.disabled = true;
    }
  }
}
