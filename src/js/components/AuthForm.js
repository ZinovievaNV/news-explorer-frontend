import Form from "./Form";

export default class AuthForm extends Form{
  constructor(options) {
    super(options);
    this._api = options.mainApi;
    this._auth = options.auth;
    this._header = options.header;
    this._popup = options.popup;
    this._changeToRegFormCallback = options.changeToRegFormCallback;
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
        element: this._form.querySelector('#register-link'),
        event: 'click',
        callback: this._changeToRegFormCallback
      }
    ]);
    return this._form;
  }

  submitForm(event) {
    event.preventDefault();
    this._validateForm();
    const {email, password} = event.target;
    this._api
      .signin({email: email.value, password: password.value})
      .then(res => {
        this.processQueryResult(res);
      });
  }
  processQueryResult(result) {
    if (!result.token) {
      this.setServerError(result.message);
    } else {
      this._auth.setToken(result.token);
      this._api.getUserInfo()
        .then(res => {
          if (res.name) {
            this._header.render({isLoggedIn: true, userName: res.name})
          } else {
            this._header.render({isLoggedIn: false, userName: ''})
          }
          this._popup.close();
        });
      //this.articles.getSaveArticles();
    }

  }

}
