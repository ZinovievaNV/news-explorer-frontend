import BaseComponent from "./BaseComponent";

export default class Header extends BaseComponent {
  constructor({element, color, handlers}) {
    super(handlers);
    this._header = element;

    this._hamburgerMenu = this._header.querySelector('.menu-burger');
    this._authorisationLinks = this._header.querySelectorAll('.js-authorisation-link');
    this._authorisedLinks = this._header.querySelectorAll('.js-authorised-link');
    this._usernameContainers = document.querySelectorAll('.js-user-name');
    this._headerHamburger = this._header.querySelector('.header__hamburger');

    this.#setColors(color);

    this._setHandlers([
      {
        element: this._header.querySelector('#js-open-hamburger-menu'),
        event: 'click',
        callback: this.#toggleHamburgerMenu.bind(this)
      },
    ])

  }

  render(options) {
    const {isLoggedIn, userName} = options;
    if (isLoggedIn) {
      this.#setAuthorisedState();
      this._usernameContainers.forEach(e => e.textContent = userName);
      this._header.querySelector('.logout-icon').style.display = 'flex';
    } else {
      this.#setUnauthorisedState();
    }
  }

  #setAuthorisedState() {
    this._authorisationLinks.forEach(e => e.parentElement.classList.add('list_item_disabled'));
    this._authorisedLinks.forEach(e => e.parentElement.classList.remove('list_item_disabled'));
  }

  #setUnauthorisedState() {
    this._authorisationLinks.forEach(e => e.parentElement.classList.remove('list_item_disabled'));
    this._authorisedLinks.forEach(e => e.parentElement.classList.add('list_item_disabled'));
  }

  #toggleHamburgerMenu() {
    this._hamburgerMenu.classList.toggle('menu-burger_show');
    this._headerHamburger.classList.toggle('header__hamburger_close');
  }

  #setColors(color) {
    if (color === 'dark') {
      this._header.querySelector('.header__title').classList.add('text_white');
      this._header.querySelectorAll('.header__link').forEach(e => e.classList.add.apply(e.classList,
        ['header__link_inline_white', 'text_white']));
      this._header.querySelectorAll('.header__button').forEach(e => e.classList.add('header__button_white'));
      this._header.querySelector('.js-user-name').classList.add('text_white');
      this._header.querySelector('.header__icon').setAttribute('src', '../images/logout-white.png');

    } else if (color === 'light') {
      this._header.querySelector('.header__row').classList.add('header__row_black');
      this._header.querySelector('.header__title').classList.add('text_black');
      this._header.querySelectorAll('.header__link').forEach(e => e.classList.add.apply(e.classList,
        ['header__link_inline_black', 'text_black']));

      this._header.querySelectorAll('.header__button').forEach(e => e.classList.add('header__button_black'));
      this._header.querySelector('.js-user-name').classList.add('text_black');
      this._header.querySelector('.header__icon').setAttribute('src', '../images/logout-black.png');
    }
  }
}
