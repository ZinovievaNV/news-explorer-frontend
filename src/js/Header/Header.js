export default class Header {
  constructor(headerNav, apiClass) {
    this.headerNav = headerNav;
    this.api = apiClass;
    this.hamburgerMenu = this.headerNav.querySelector('.menu-burger');
    this.authorisationLinks = this.headerNav.querySelectorAll('.js-authorisation-link');
    this.authorisedLinks = this.headerNav.querySelectorAll('.js-authorised-link');
    this.usernameContainers = this.headerNav.querySelectorAll('.js-user-name');
    this.headerHamburger = this.headerNav.querySelector('.header__hamburger');
    this.setEventListeners();
    this.processAuthorisation();
  }

  setEventListeners() {
    this.headerNav.querySelector('#js-open-hamburger-menu').addEventListener('click', this.toggleHamburgerMenu.bind(this));
    this.headerNav.querySelectorAll('.js-logout-link').forEach(e => e.addEventListener('click', this.logout.bind(this)));

  }

  getToken() {
    return localStorage.getItem('token');
  }

  getLocalUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  updateHeader() {

    const userInfo = this.getLocalUserInfo();

    if (userInfo) {
      this.setAuthorisedState();
      this.usernameContainers.forEach(e => e.textContent = userInfo.name);
      this.headerNav.querySelector('.logout-icon').style.display = 'flex';
    } else {
      this.setUnauthorisedState();
    }

  }

  setAuthorisedState() {
    this.authorisationLinks.forEach(e => e.parentElement.classList.add('list_item_disabled'));
    this.authorisedLinks.forEach(e => e.parentElement.classList.remove('list_item_disabled'));
    this.usernameContainers.forEach(e => e.classList.add('text_white'));
  }

  setUnauthorisedState() {
    this.authorisationLinks.forEach(e => e.parentElement.classList.remove('list_item_disabled'));
    this.authorisedLinks.forEach(e => e.parentElement.classList.add('list_item_disabled'));
  }

  getUserInfo() {
    const token = this.getToken();
    if (token) {
      this.api.getUserInfo(this.updateUserInfo.bind(this))
    }
  }

  updateUserInfo(data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
    this.updateHeader();
  }

  logout() {
    this.api.logout(this.updateHeader.bind(this));
  }

  toggleHamburgerMenu() {
    this.hamburgerMenu.classList.toggle('menu-burger_show');
    this.headerHamburger.classList.toggle('header__hamburger_close');
  }

  processAuthorisation() {
    if (this.getToken() && !this.getLocalUserInfo()) {
      this.getUserInfo();
    } else if (this.getToken() && this.getLocalUserInfo()) {
      this.updateHeader();
    }
  }
}