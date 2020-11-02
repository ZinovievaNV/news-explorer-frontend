const ERROR_MESSAGES = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Поле должно содержать от #minlength# символов',
  typeMismatch: 'e-mail в формате: students-yandex@yandex.ru',
  tooLong: 'Поле должно быть не более 30 символов'
};

const API_URL = 'https://api.news-explorer-yp.tk';

const SEARCH_API_KEY = '51aa23bff4e547a28b575dfee51cc545';

//const SEARCH_API_URL = 'https://newsapi.org/v2/everything';
const SEARCH_API_URL = 'https://nomoreparties.co/news/v2/everything';


module.exports = {
  ERROR_MESSAGES,
  API_URL,
  SEARCH_API_KEY,
  SEARCH_API_URL,
};
