export default class Search {
  constructor(form, apiClass) {
    this.form = form;
    this.apiClass = apiClass;
    this.setEventListeners();
    this.cards = []; //объект с карточками от результата запроса
    this.showedCard = []; //объект с показанными карточками
    this.buttonShowMore = document.querySelector('.searching-results__controls');
  }

  setEventListeners() {
    // this.buttonShowMore.addEventListener('click',this.renderingCards.bind(this));
    this.form.addEventListener('submit', this.processSubmit.bind(this));

  }

  processSubmit(event) {
    event.preventDefault();
    const inputElem = this.form.elements['query'];
    const errorElement = this.form.querySelector('.search__error-message');
    if (inputElem.value.trim().length === 0) {
      this.activateError(errorElement);
      return false;
    } else {
      this.resetError(errorElement)
    }

    this.apiClass.search(inputElem.value.trim(), this.processResponse.bind(this))
  }

  processResponse(data) {
    const cardsList = document.querySelector('.cards-list');
    const sectionNotFind = document.querySelector('.not-find');

    if (data.status === 'ok' && data.totalResults > 0) {
      cardsList.classList.add('cards-list_show');
      this.buttonShowMore.classList.add('searching-results__controls_show');
      this.cards = data.articles;
      this.renderingCards(this.cards);

    } else {
      cardsList.classList.remove('cards-list_show');
      this.buttonShowMore.classList.remove('searching-results__controls_show');
      sectionNotFind.classList.add('not-find_show')
    }
    if (data.status === 'error') {
      sectionNotFind.closest('.not-find__text').textContent = 'Во время запроса произошла ошибка. Возможно, ' +
        'проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
      console.log('Ошибка:', data.message)

    }

  }

  showPreloader() {
    document.querySelector('.preloader').style.display = 'block';
  }

  renderingCards(cards) {
    console.log(cards, 'Здесь будут Карточки');
    this.showedCard = cards.splice(0, 3);

  }

  activateError(elem) {
    elem.style.display = 'flex';
    elem.textContent = 'Нужно ввести ключевое слово';
  }

  resetError(elem) {
    elem.style.display = 'none';
    elem.textContent = '';
  }


}