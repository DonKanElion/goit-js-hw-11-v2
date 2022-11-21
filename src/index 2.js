import './css/styles.css';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchImages } from './js/fetchImages';


const refs = {
    formEl: document.querySelector(".search-form"),
    inputEl: document.querySelector(".search-field"),
    btnEl: document.querySelector(".search-btn"),
    galleryEl: document.querySelector(".gallery"),
};

const DEBOUNCE_DELAY = 300;

// console.log(refs.formEL);
// console.log(refs.inputEl);
// console.log(refs.btnEl);
// console.log(refs.galleryEl);

refs.inputEl.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt){
    const searchImg = refs.inputEl.value.trim();

       console.log(searchImg);
// if(!searchImg){
//     refs
// }
    fetchImages(searchImg)


}

