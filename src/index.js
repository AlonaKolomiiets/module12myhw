import fetchCountries from './fetchCountries.js';
import './styles.css';
import {
  alert,
  error,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import countriesTmp from './template/countries.hbr';
import countryTmp from './template/country.hbr';
import debounce from 'lodash.debounce';
defaultModules.set(PNotifyMobile, {});
const body = document.querySelector("body");
let input = document.getElementById('get-country');
let div = document.getElementById('country');

input.addEventListener(
  'input',
  debounce(event => {
    div.innerHTML = '';
    body.classList.remove("background");
    if (!event.target.value) {
      return;
    }
    fetchCountries(event.target.value).then(listCountries => {
      if (listCountries.length >= 2 && listCountries.length <= 10) {
        const countries = countriesTmp(listCountries);
        div.insertAdjacentHTML('afterbegin', countries);
        body.classList.add("background");
      } else if (listCountries.length > 10) {
        return error({
          text: 'Too many mathes found. Please enter a more specific query!',
          hide: true,
          delay: 1000,
        });
      } else if (!listCountries.length) {
        return error({
          text: 'Not found...',
          hide: true,
          delay: 1000,
        });
      } else if (listCountries.length === 1) {
        const country = countryTmp(listCountries[0]);
        body.classList.add("background");
        div.insertAdjacentHTML('afterbegin', country);
        
      }
    });
  }, 500),
);

// name: "Afghanistan";
// capital: "Kabul";
// population: 27657145;
// languages: [{ name: "Arabic", nativeName: "العربية" }];
// flag: "https://restcountries.eu/data/afg.svg";
