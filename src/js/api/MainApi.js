export default class MainApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;

  }

  query(url, method = 'GET', body = null, token = null) {

    let options = {
      method: method,
      headers: {},
    };

    if (token) {
      options.headers['authorization'] = `Bearer ${token}`
    }

    if (body) {
      options.body = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
    }

    return fetch(this.baseUrl + url, options)
      .then(res => {
        return res.json();
      })
      .catch((error) => {
        console.log('Ошибка:', error);
      })

  }

  signup(body, callback) {
    return this
      .query('/signup', 'POST', body)

  }

  signin(body, callback) {
    return this.query('/signin', 'POST', body);
  }

  getUserInfo() {
    return this
      .query('/users/me', 'GET', null, localStorage.getItem('token'))
  }

  saveArticle(article) {
    return this
      .query('/articles', 'POST', article, localStorage.getItem('token'));
  }

  deleteArticle(cardId) {
    return this
      .query(`/articles/${cardId}`, 'DELETE', null, localStorage.getItem('token'))
  }

  getSaveArticles() {
    return this.query('/articles', 'GET', null, localStorage.getItem('token'));
  }

}
