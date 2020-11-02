import '../css/index.css';
import {API_URL, ERROR_MESSAGES, SEARCH_API_KEY, SEARCH_API_URL} from "./constants/constans";
import MainApi from './api/MainApi.js';
import Header from './components/Header';
import Authorisation from "./components/Authorisation";
import Popup from "./components/Popup";
import AuthForm from "./components/AuthForm";
import RegisterForm from "./components/RegisterForm";
import SearchApi from "./api/SearchApi";
import NewsCardList from "./components/NewsCardList";
import SearchForm from "./components/SearchForm";

const page = 'index';
const mainApi = new MainApi(API_URL);
const searchApi = new SearchApi(SEARCH_API_URL, SEARCH_API_KEY);
const auth = new Authorisation(mainApi);
const popup = new Popup({element: document.querySelector('.popup')});




const header = new Header({ element: document.querySelector('header'), color: 'dark', handlers: [
    {
      element: document.querySelectorAll('.js-logout-link'),
      event: 'click',
      callback: logout
    },
    {
      element: document.querySelectorAll('.js-authorisation-link'),
      event: 'click',
      callback: openAuthForm
    }
  ]} );

if (!auth.getToken()) {
  header.render({isLoggedIn: false, userName: ''})
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



const regForm = new RegisterForm({
  formTemplateId: 'reg-form',
  validationErrorsMessages: ERROR_MESSAGES,
  changeToAuthFormCallback,
  mainApi,
  auth,
  popup,
});

const authForm = new AuthForm({
  formTemplateId: 'auth-form',
  validationErrorsMessages: ERROR_MESSAGES,
  changeToRegFormCallback,
  mainApi,
  auth,
  header,
  popup,
});
function changeToRegFormCallback() {
  popup.setContent(regForm.getForm());
}
function changeToAuthFormCallback() {
  popup.setContent(authForm.getForm());
}
function openAuthForm() {
  popup.setContent(authForm.getForm());
  popup.open();
}
function logout() {
  auth.logout();
  header.render({isLoggedIn: false})
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
    })
}

const searchForm = new SearchForm({
  formTemplateId: 'search-form',
  validationErrorsMessages: ERROR_MESSAGES,
  searchApi,
  newsCardList,
});

document.querySelector('.search__container').append(searchForm.getForm());



