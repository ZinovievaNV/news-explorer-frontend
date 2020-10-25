import '../css/index.css';
import Api from './Api/MainApi.js';
import Header from './Header/Header';
import AuthorisationPopup from './Popups/AuthorisationPopup/AuthorisationPopup';
import RegistrationPopup from './Popups/RegistrationPopup/RegistrationPopup';
import SearchField from './Search/Search'
import FormValidator from './FormValidator/FormValidator';
import SearchApi from "./Api/SearchApi";

(function () {

  const errorMessages = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Поле должно содержать от #minlength# символов',
    typeMismatch: 'e-mail в формате: students-yandex@yandex.ru',
    tooLong: 'Поле должно быть не более 30 символов'
  };

  const baseUrl = 'https://api.news-explorer-yp.tk';
  const api = new Api(baseUrl);

  const searchApiKey = '51aa23bff4e547a28b575dfee51cc545';
  const searchEndpoint = 'https://newsapi.org/v2/everything';
  const searchApi = new SearchApi(searchEndpoint, searchApiKey);

  const validatorRegistration = new FormValidator(document.forms.registration, errorMessages);
  const validatorAuthorisation = new FormValidator(document.forms.authorisation, errorMessages);
  const searchField = new SearchField(document.forms.search, searchApi);
  const header = new Header(document.querySelector('header'), api);
  const registrationPopup = new RegistrationPopup(document.querySelector('.registration'), api);
  const authorisationPopup = new AuthorisationPopup(document.querySelector('.authorisation'), api, header);
  registrationPopup.setAuthorisationPopup(authorisationPopup);
  authorisationPopup.setRegistrationPopup(registrationPopup);

})();