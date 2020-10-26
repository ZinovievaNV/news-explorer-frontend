export default class Search {
  constructor(form, apiClass) {
    this.form = form;
    this.apiClass = apiClass;
    this.setEventListeners();
    this.cards = []; //объект с карточками от результата запроса
    this.resultSearch = document.querySelector('.searching-results');
    this.sectionNotFind = document.querySelector('.not-find');
    this.cardsContainer = document.querySelector('.articles-list') //todo контейнер карточек в верстке
    //this.buttonShowMore = document.querySelector('.searching-results__controls');
  }

  setEventListeners() {
    // this.resultSearch.querySelector('.searching-results__controls').addEventListener('click', this.renderingCards.bind(this));
    this.form.addEventListener('submit', this.processSubmit.bind(this));

  }

//валидация поля поиска
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
    this.showPreloader();
    this.apiClass.search(inputElem.value.trim(), this.processResponse.bind(this))
  }

//ответ с сайта
  processResponse(data) {
    this.hiddenPreloader();


    if
    (data.status === 'ok' && data.totalResults > 0) {

      this.renderingGoodResult();
      this.cards = data.articles;

      this.renderingCards();
    } else {
      this.renderingBadResult();
    }
    if (data.status === 'error') {
      this.renderingErrorResult();

    }

  }

  getObject(object) {


  }

//показать кнопку "Показать ещё"
  showButtonMore() {
    if (this.cards.length > 0) {
      this.resultSearch.querySelector('.searching-results__controls').style.display = 'block';

    } else {
      this.resultSearch.querySelector('.searching-results__controls').style.display = 'none';
    }
  }

//отображение результата поиска и скрыть секцию "ничего не найдено"
  renderingGoodResult() {
    this.resultSearch.classList.add('searching-results_show');
    this.sectionNotFind.classList.remove('not-find_show')
  }

//отображение "Ничего не найдено"
  renderingBadResult() {
    this.resultSearch.classList.remove('searching-results_show');
    this.sectionNotFind.classList.add('not-find_show')
  }

//отображение ошибки от сервера после запроса
  renderingErrorResult() {
    this.sectionNotFind.querySelector('.not-find__text').textContent = 'Во время запроса произошла ошибка. Возможно, ' +
      'проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    console.log('Ошибка:', data.message)
  }

//отображение прелоадера
  showPreloader() {
    document.querySelector('.preloader').style.display = 'block';
  }

//скрыть прелоадер
  hidePreloader() {
    document.querySelector('.preloader').style.display = 'none';
  }

//отображение 3 карточек
  renderingCards() {
    this.cards.splice(0, 3).forEach(e => this.renderCard(e));//e это объект карточки из запроса
    this.showButtonMore();
  }

  renderCard(card) {
    const article = document.createElement('article');
    const articleImage = document.createElement('img');
    const articleContainer = document.createElement('div');
    const articleType = document.createElement('div');
    const articleLinkSaved = document.createElement('a');

    articleLinkSaved.setAttribute('src', card.urlToImage);
    const articleDescription = document.createElement('div');
    const articleData = document.createElement('p');
    const articleTitle = document.createElement('h2');
    const articleText = document.createElement('p');
    const articleLinkControl = document.createElement('div');
    const articleLink = document.createElement('a');

    article.classList.add('article');
    articleImage.classList.add('article__image');
    articleContainer.classList.add('article__container');
    articleType.classList.add('rticle__type');
    article.textContent = card.keyword;
    articleLinkSaved.classList.add('article__save');
    articleDescription.classList.add('article__description');
    //articleData.classList.add('article__data')
    articleData.classList.add.apply(
      articleData.classList,
      ['article__data', 'text', 'text_gray']
    );
    articleData.textContent =
    articleTitle.classList.add('article__title');
    articleText.classList.add('article__text');
    articleLinkControl.classList.add('article__link-control');
    articleLink.classList.add.apply(
      articleLink.classList,
      ['article__link', 'text', 'text_gray']
    );

    article.appendChild(articleImage);
    article.appendChild(articleContainer);
    articleContainer.appendChild(articleType);
    articleContainer.appendChild(articleLinkSaved);
    article.appendChild(articleDescription);
    articleDescription.appendChild(articleData);
    articleDescription.appendChild(articleTitle);
    articleDescription.appendChild(articleText);
    article.appendChild(articleLinkControl);
    articleLinkControl.appendChild(articleLink);

    this.cardElement = article;
    return article;

    //todo реализовать формирование карточки и вывод ее в this.cardsContainer, в card объект карточки
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


}