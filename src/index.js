import './css/styles.css';
import markup from './templates/markup.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/fetchImages';

const refs = {
    searchForm: document.querySelector(".search-form"),
    inputData: document.querySelector(".search-field"),
    searchBtn: document.querySelector(".search-btn"),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
};

let lightbox = new SimpleLightbox('.gallery a');
let page = 1;

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display = 'none';

function onSearch(evt){
    evt.preventDefault();
    clearImages();
    const searchValue = refs.inputData.value.trim();

    if(searchValue){
        fetchImages(searchValue, page)
        .then(data => {
            if(data.hits.length === 0) {
                Notiflix.Notify.warning(
                    'Sorry, there are no images matching your search query. Please try again.'
                );
            } else {
                renderMarkup(data.hits);
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
                refs.loadMoreBtn.style.display = 'block';
                lightbox.refresh();
            }
        })
        .catch(function (error) {
            console.log('Error', error.message);
        });
    }
    if(searchValue === ''){
        Notiflix.Notify.failure('Oops, please enter data in the search field');
    }

};

function onLoadMore(evt) {
    page += 1;
    const searchValue = refs.inputData.value.trim();

    fetchImages(searchValue, page).then(data => {
        renderMarkup(data.hits);
        lightbox.refresh();
        const totalPage = data.totalHits / 40;

        if(totalPage <= page) {
            refs,loadMoreBtn.style.display = 'none';
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results."
            )
        }
    })
};

function renderMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', markup(images));
  }

function clearImages(){
    page = 1;
    refs.loadMoreBtn.style.display = 'none';
    refs.gallery.innerHTML = '';
};
