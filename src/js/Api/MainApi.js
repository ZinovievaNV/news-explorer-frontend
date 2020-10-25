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
      .then(res => {
        callback(res)
      });

  }

  signin(body, callback) {
    this
      .query('/signin', 'POST', body)
      .then((result) => {
        callback(result)
      })
  }

  getUserInfo(callback) {
    this
      .query('/users/me', 'GET', null, localStorage.getItem('token'))
      .then(result => callback(result));
  }

  logout(callback) {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    callback();
  }

}
