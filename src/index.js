// 28074243-fd9335165c63977f864a46342
import NewsApiServise from './fetch_pixabey';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  inputEl: document.querySelector('.input'),
  btnEl: document.querySelector('.btn'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  loadMoreBtnSpiner: document.querySelector('.spinner-border'),
  loadMoreBtnSpan: document.querySelector('.label'),
  galleryEl: document.querySelector(".gallery")
};

let lightbox;
const newsApiServise = new NewsApiServise();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.addEventListener('click', localStorageChange)

function showBtnLoadMore() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
hideBtnLoadMore();
function hideBtnLoadMore() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function enableLoadMore() {
  refs.loadMoreBtn.disabled = false;
  refs.loadMoreBtnSpan.textContent = 'Load more';
  refs.loadMoreBtnSpiner.classList.add('is-hidden');
}

function disableLoadeMore() {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtnSpan.textContent = 'Загружаем...';
  refs.loadMoreBtnSpiner.classList.remove('is-hidden');
}

function onSearch(ev) {
  ev.preventDefault();

  newsApiServise.resetPage();
  showBtnLoadMore();
  disableLoadeMore();

  newsApiServise.query = ev.currentTarget.elements.query.value;
 
  newsApiServise.fetchArticles().then(({ hits, totalHits }) => {
    if (hits.length !== 0) {
      Notify.success(`Hooray! We found ${totalHits += 40} images.`);
    }
    if (hits.length === 0 ) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      ) 
      hideBtnLoadMore();
    } else if (totalHits <= hits.length) {
      Notify.info("We're sorry, but you've reached the end of search results.")
        hideBtnLoadMore();
      };
    clearArticlesContainer();
    appendArticlesMarkup(hits);
    enableLoadMore();
  });
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
let localStor = 0;

function onLoadMore() {
   
  disableLoadeMore();
lightbox.refresh()
  newsApiServise.fetchArticles().then(({ hits, totalHits }) => {
    localStor = totalHits;
    console.log(hits.length);
    console.log(totalHits);
    
    appendArticlesMarkup(hits);
    enableLoadMore();
    if (totalHits < 0) {
     hideBtnLoadMore();
   }
  });
 
}
console.log(localStor)
function localStorageChange() {
  
    
    let local = Number(localStorage.getItem('totalHits'));
    console.log(local);
    localStorage.setItem('totalHits', local -= 40);


}


function appendArticlesMarkup(hits) {
 
  refs.articlesContainer.insertAdjacentHTML('beforeend', renderMarkup(hits));
   lightbox = new SimpleLightbox(".gallery div a", { captionData: "alt", captionDelay: 250 });
}

function renderMarkup(articles) {
 
  return articles
    .map(({ webformatURL, largeImageURL, likes, views, comments, tags, downloads }) => {
      return `<div class="photo-card">
  <a  href="${largeImageURL}"><img width="300" height="200" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>\n${likes}
    </p>
    <p class="info-item">
      <b>Views</b>\n${views}
    </p>
    <p class="info-item">
      <b>Comments</b>\n${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>\n${downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  
}


