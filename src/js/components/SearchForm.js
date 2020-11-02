import Form from "./Form";

export default class SearchForm extends Form {
  _foundCards;
  constructor(options) {
    super(options);
    this._searchApi = options.searchApi;
    this._newsCardList = options.newsCardList;
    this._resultSearch = document.querySelector('.searching-results');
    this._sectionNotFind = document.querySelector('.not-find');
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
        element: document.querySelector('.js-show-more-button'),
        event: 'click',
        callback: this._showMore.bind(this)
      }
    ]);
    return this._form;
  }

  submitForm(event) {
    event.preventDefault();
    const form = event.target;
    this._validateForm();
    const inputElem = form.elements['query'];

    if (inputElem.value.trim().length === 0) {
      this.activateError(this._formErrorContainer);
      return false;
    } else {
      this.resetError(this._formErrorContainer)
    }
    this._newsCardList.clearCards();
    this._newsCardList.renderLoader(true);
    this._searchApi
      .search(inputElem.value.trim())
      .then(res => {
        this.processResponse(res)
      });
  }

  //ответ с сайта
  processResponse(data) {
    this._newsCardList.renderLoader(false);
    if
    (data.status === 'ok' && data.totalResults > 0) {
      this.renderGoodResult();
      this._foundCards = data.articles;
      this._renderCards();
    } else {
      this.renderBadResult();
    }
    if (data.status === 'error') {
      this._newsCardList.renderError();

    }
  }

  //Показ ошибки если пустое поле
  activateError(elem) {
    elem.style.display = 'flex';
    elem.textContent = 'Нужно ввести ключевое слово';
  }

//скрыть ошибку если поле поиска валидно
  resetError(elem) {
    elem.style.display = 'none';
    elem.textContent = '';
  }

  renderGoodResult() {
    this._resultSearch.classList.add('searching-results_show');
    this._sectionNotFind.classList.remove('not-find_show')
  }

  //отображение "Ничего не найдено"
  renderBadResult() {
    this._resultSearch.classList.remove('searching-results_show');
    this._sectionNotFind.classList.add('not-find_show')
  }

  _showMore(e) {
    e.preventDefault();
    this._renderCards();
  }

//отображение 3 карточек
  _renderCards() {

    this._newsCardList.renderResults({cards: this._foundCards.splice(0, 3).map(this._searchToCardAdapter)});
    this._newsCardList.showMore(this._foundCards.length > 0);
  }

  _searchToCardAdapter(card) {
    const input = document.forms.search.querySelector('.search__input');

    return {
      'keyword': input.value[0].toUpperCase() + input.value.slice(1),
      'title': card.title,
      'text': card.description,
      'date': card.publishedAt,
      'source': card.source.name,
      'link': card.url,
      'image': card.urlToImage ?? 'https://ik.imagekit.io/eztj01g7y9/no-image-available_j8n2YrxiW.jpg',
    }
  }
}
