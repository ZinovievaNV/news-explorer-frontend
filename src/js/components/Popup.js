import BaseComponent from "./BaseComponent";

export default class Popup extends BaseComponent{
  _element;
  constructor({element, handlers}) {
    super(handlers);
    this._element = element;
    this._contentElement = this._element.querySelector('.js-popup-content');
    this._setHandlers([
      {
        element: this._element.querySelector('.popup__close'),
        event: 'click',
        callback: this.close.bind(this)
      }
    ])
  }
  //вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации;
  setContent(content) {
    this.clearContent();
    this._contentElement.append(content);
  }

  //очищает содержимое попапа;
  clearContent() {
    this._contentElement.innerHTML = '';
  }

  open() {
    this._element.classList.add('popup_is-opened');
  }

  close() {
    this.clearContent();
    this._element.classList.remove('popup_is-opened');
  }
}
