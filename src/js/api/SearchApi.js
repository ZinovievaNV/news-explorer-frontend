export default class MainApi {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  search(query) {
    const dateTo = new Date();
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    return fetch(`${this.baseUrl}?q=${query}&apiKey=${this.apiKey}&from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}$pageSize=100`)
      .then(res => res.json())
      .catch((error) => {
        console.log('Ошибка:', error);
      })
  }
}
