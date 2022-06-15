// 28074243-fd9335165c63977f864a46342
import NewsApiServise from './fetch_pixabey';

const refs = {
    searchForm: document.querySelector(".search-form"),
     articlesContainer: document.querySelector('.js-articles-container'),
inputEl : document.querySelector(".input"),
    btnEl: document.querySelector(".btn"),
loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  loadMoreBtnSpiner: document.querySelector(".spinner-border"),
  loadMoreBtnSpan: document.querySelector(".label")
}


const newsApiServise = new NewsApiServise();
let searchQuery = "";
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function showBtnLoadMore() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
hideBtnLoadMore();
function hideBtnLoadMore() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
console.log(refs.loadMoreBtnSpiner.textContent)
function enableLoadMore() {
  refs.loadMoreBtn.disabled = false;
  refs.loadMoreBtnSpan.textContent = 'Показать ещё';
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
  disableLoadeMore()
 
  newsApiServise.query = ev.currentTarget.elements.query.value;
  console.log(newsApiServise.query);
  newsApiServise.fetchArticles().then(articles => {
    clearArticlesContainer();
    appendArticlesMarkup(articles);
    enableLoadMore()
  });

}

function clearArticlesContainer() {
   refs.articlesContainer.innerHTML = '';
}

function onLoadMore() {
  disableLoadeMore()
  
  newsApiServise.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
enableLoadMore()
  });
}

function appendArticlesMarkup(articles) {
  console.log(articles);
  refs.articlesContainer.insertAdjacentHTML(
    'beforeend',
    renderMarkup(articles)
  );
}

function renderMarkup(articles) {
  console.log(articles);
  return articles
    .map(({ webformatURL, likes, views, comments, tags, downloads  }) => {
      return `<div class="photo-card">
  <img width="300" height="200" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
      <b>Downloads</b>\n${downloads }
    </p>
  </div>
</div>`;
    })
    .join('');
}



