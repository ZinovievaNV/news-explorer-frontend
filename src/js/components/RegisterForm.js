import Form from "./Form";

export default class RegisterFrom extends Form{
  constructor(options) {
    super(options);
    this._api = options.mainApi;
    this._auth = options.auth;
    this._popup = options.popup;
    this._changeToAuthFormCallback = options.changeToAuthFormCallback;
    this._successTemplate = document.querySelector('#success-reg').content.cloneNode(true);
  }

  getForm() {
    this.initForm();
    this._setHandlers([
      {
        element: this._form.querySelector('form'),
        event: 'submit',
        callback: this.submitForm.bind(this)
      },
      {
        element: this._form.querySelector('.js-auth-link'),
        event: 'click',
        callback: this._changeToAuthFormCallback
      },
      {
        element: this._successTemplate.querySelector('.js-auth-link'),
        event: 'click',
        callback: this._changeToAuthFormCallback
      },
    ]);
    return this._form;
  }

  submitForm(event) {
    event.preventDefault();
    this._validateForm();
    const {email, password, name} = event.target;
    this._api
      .signup({
        name: name.value,
        email: email.value,
        password: password.value
      })
      .then(res => {
        this.processQueryResult(res);
      });
  }

  processQueryResult(result) {
    if (result.message.length > 0 && !result.data) {
      this.setServerError(result.message);
    } else {
      this._popup.setContent(this._successTemplate);
    }
  }
}
