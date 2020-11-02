export default class NewsCard {
  _card;
  _cardId;

  constructor(card) {
    this._card = card;
    this._active = false;
  }

  getData() {
    return this._card;
  }

  getCardId() {
    return this._cardId;
  }

  isActive() {
    return this._active;
  }

  renderCard(page) {
    const {keyword, title, text, date, source, link, image} = this._card;
    const cardTemplate = document.querySelector('#card');

    const card = cardTemplate.content.cloneNode(true);

    this._articleSaveContainer = card.querySelector('.js-card-save-container');

    if (page === 'index') {
      card.querySelector('.js-card-keyword').remove();
    } else {
      card.querySelector('.js-card-keyword').textContent = keyword;
    }

    card.querySelector('.js-card-source').textContent = source;
    card.querySelector('.js-card-title').textContent = title;
    card.querySelector('.js-card-link').setAttribute('href', link);
    card.querySelector('.js-card-date').textContent = this.formatDate(date);
    card.querySelector('.js-card-text').textContent = text;
    card.querySelector('.js-card-image').setAttribute('src', image);
    //articleImage.setAttribute('src', 'https://ik.imagekit.io/eztj01g7y9/no-image-available_j8n2YrxiW.jpg')
    return card;
  }

  renderIcon({isActive, isAuthorised, saveCallback, cardId, page}) {
    this._articleSaveContainer.innerHTML = '';
    this._active = isActive;
    this._cardId = cardId;
    if (page === 'index') {
      const articleLinkSave = document.createElement('a');
      articleLinkSave.classList.add('article__save');
      if (this._active) {
        articleLinkSave.classList.add('article__save_active');
      }
      if (!isAuthorised) {
        const articleLinkSaveAuthMessage = document.createElement('div');
        articleLinkSaveAuthMessage.classList.add('article__auth-message');
        articleLinkSaveAuthMessage.textContent = 'Войдите, что бы сохранять статьи';
        articleLinkSave.addEventListener('mouseover', this.showMessage.bind(this));
        articleLinkSave.addEventListener('mouseout', this.hideMessage.bind(this));
        this._articleSaveContainer.appendChild(articleLinkSaveAuthMessage);
      }


      if (saveCallback) {
        this._saveCallback = saveCallback;
        articleLinkSave.addEventListener('click', this.saveCallback.bind(this));
      }
      this._articleSaveContainer.appendChild(articleLinkSave);
    } else if (page === 'saved-articles') {
      const articleLinkDelete = document.createElement('a');
      articleLinkDelete.classList.add('article__delete-button', 'article__delete-button_active');

      const articleLinkDeleteMessage = document.createElement('div');
      articleLinkDeleteMessage.classList.add('article__question');
      articleLinkDeleteMessage.textContent = 'Убрать из сохраннёных';
      articleLinkDelete.addEventListener('mouseover', this.showMessage.bind(this));
      articleLinkDelete.addEventListener('mouseout', this.hideMessage.bind(this));
      this._articleSaveContainer.appendChild(articleLinkDeleteMessage);

      if (saveCallback) {
        this._saveCallback = saveCallback;
        articleLinkDelete.addEventListener('click', this.saveCallback.bind(this));
      }
      this._articleSaveContainer.appendChild(articleLinkDelete);

    }
  }

  saveCallback() {
    this._saveCallback(this);
  }

  showMessage(e) {
    const link = e.target;
    if (link.previousSibling.classList.contains('article__auth-message')) {
      link.previousSibling.classList.add('article__auth-message_show');
    } else if (link.previousSibling.classList.contains('article__question')) {
      link.previousSibling.classList.add('article__question_show');
    }

  }

  hideMessage(e) {
    const link = e.target;
    if (link.previousSibling.classList.contains('article__auth-message')) {
      link.previousSibling.classList.remove('article__auth-message_show');
    } else if (link.previousSibling.classList.contains('article__question')) {
      link.previousSibling.classList.remove('article__question_show');
    }
  }

  formatDate(date) {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat('ru-RU', {
      month: 'long',
      day: 'numeric'
    }).format(dateObj) + ', ' + dateObj.getFullYear();
  }
}
