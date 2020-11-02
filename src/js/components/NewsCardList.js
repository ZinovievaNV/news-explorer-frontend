import NewsCard from "./NewsCard";

export default class NewsCardList {
  constructor({mainApi, auth, page}) {
    this._mainApi = mainApi;
    this._authorisation = auth;
    this._page = page;
    this._savedNewsCards = [];
    this._cardsContainer = document.querySelector('.articles-list');
    this._articleCountContainer = document.querySelector('.js-article-count');
    this._keywordsContainer = document.querySelector('.js-keywords');

    this._keywordsCount = 3;
  }

  //отвечает за отрисовку лоудера;
  renderLoader(active) {
    document.querySelector('.preloader').style.display = active ? 'block' : 'none';
  }

  //принимает объект ошибки и показывает ошибку в интерфейсе;
  renderError() {
    this._sectionNotFind.querySelector('.not-find__text').textContent = 'Во время запроса произошла ошибка. Возможно, ' +
      'проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    console.log('Ошибка:', data.message)
  }

  //отвечает за функциональность кнопки «Показать ещё»;
  showMore(active) {
    if (active) {
      document.querySelector('.searching-results__controls').style.display = 'block';
    } else {
      document.querySelector('.searching-results__controls').style.display = 'none';
    }
  }

  //принимает экземпляр карточки и добавляет её в список.
  addCard(card) {
    this._cardsContainer.appendChild(card.renderCard(this._page));
    this._refreshCardIcon(card);
  }

  _refreshCardIcon(card) {
    const savedCard = this._savedNewsCards.find(e => {
      return e.link === card.getData().link;
    });
    card.renderIcon({
      isActive: !!savedCard,
      isAuthorised: this._authorisation.isAuthorised(),
      saveCallback: this._authorisation.isAuthorised() ? this.saveCardCallback.bind(this) : null,
      cardId: savedCard ? savedCard._id : null,
      page: this._page,
    });
  }

  //принимает массив экземпляров карточек и отрисовывает их;
  renderResults({cards}) {
    if (this._page === 'saved-articles') {
      this.clearCards();
    }

    for (let card of cards) {
      this.addCard(new NewsCard(card));
    }
  }

  saveCardCallback(card) {
    if (card.isActive()) {
      this._mainApi.deleteArticle(card.getCardId())
        .then(res => {
          this._savedNewsCards.splice(this._savedNewsCards.findIndex(e => {
            return e.link === card.getData().link;
          }), 1);
          this._refreshCardIcon(card);
          this._refreshCountAndKeywords();
          if (this._page === 'saved-articles') {
            this.renderResults({cards: this._savedNewsCards})
          }
        })
    } else {
      this._mainApi.saveArticle(card.getData())
        .then(res => {
          this._savedNewsCards.push(res.data);
          this._refreshCardIcon(card);
        })
    }

  }

  setSavedCards(cards) {
    this._savedNewsCards = cards;
    this._refreshCountAndKeywords();
  }

  _refreshCountAndKeywords() {
    if (this._articleCountContainer) {
      this._articleCountContainer.textContent = this._savedNewsCards.length.toString();
    }

    if (this._keywordsContainer) {
      this._keywordsContainer.textContent = this.getKeywords();
    }
  }

  clearCards() {
    this._cardsContainer.innerHTML = '';
  }



  getKeywords() {
    const keywords = this._savedNewsCards.reduce((keywords, article) => {
      if (!keywords[article.keyword]) {
        keywords[article.keyword] = 1;
      } else {
        keywords[article.keyword] += 1;
      }
      return keywords;
    }, {});

    let sortedKeywords = [];
    for (const word in keywords) {
      sortedKeywords.push([word, keywords[word]]);
    }

    sortedKeywords.sort(function (a, b) {
      return b[1] - a[1];
    });
    sortedKeywords = sortedKeywords.reduce((acc, e) => {
      acc.push(e[0]);
      return acc
    }, []);
    return sortedKeywords.length > this._keywordsCount ? `${sortedKeywords.slice(0, this._keywordsCount - 1).join(', ')} и ${sortedKeywords.length - (this._keywordsCount - 1)} другим` : sortedKeywords.join(', ');
  }

}

