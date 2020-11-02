import '../../css/saved-articles.css';
import {API_URL, ERROR_MESSAGES, SEARCH_API_KEY, SEARCH_API_URL} from "../constants/constans";
import MainApi from '../api/MainApi.js';
import Header from '../components/Header';
import Authorisation from "../components/Authorisation";
import NewsCardList from "../components/NewsCardList";
import SearchApi from "../api/SearchApi";

const page = 'saved-articles';
const mainApi = new MainApi(API_URL);
const auth = new Authorisation(mainApi);

const header = new Header({
  element: document.querySelector('header'), color: 'light', handlers: [
    {
      element: document.querySelectorAll('.js-logout-link'),
      event: 'click',
      callback: logout
    },

  ]
});
if (!auth.isAuthorised()) {
  window.location.replace("/");
} else {
  mainApi.getUserInfo()
    .then(res => {
      if (res.name) {
        header.render({isLoggedIn: true, userName: res.name})
      } else {
        header.render({isLoggedIn: false})
      }
    })
}
const newsCardList = new NewsCardList({
  page,
  mainApi,
  auth
});

if (auth.isAuthorised()) {
  mainApi.getSaveArticles()
    .then(res => {
      newsCardList.setSavedCards(res.data);
      newsCardList.renderResults({cards: res.data});
    })
}

function logout() {
  auth.logout();
  window.location.replace("/");
}
