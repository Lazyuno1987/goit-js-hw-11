import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Axios from 'axios';

//const axios = require('axios');
export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    const url = `https://pixabay.com/api/?key=28074243-fd9335165c63977f864a46342&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    
    return await Axios.get(url).then((response) => {
      console.log(response.data);
      console.log(response.data.totalHits)
      response.data.totalHits -= response.data.hits.length * this.page;
      console.log(this.page)
      localStorage.setItem("totalHits", response.data.totalHits);
      if (response.data.totalHits < 0) {
        Notify.info("We're sorry, but you've reached the end of search results.");
      }
      this.incrementPage();
    return  response.data
    });
  }
  // =====================================
  // fetchArticles() {
  //   console.log(this);
  //  console.log(this.searchQuery);
  //   console.log(this.page)
  //   const url = `https://pixabay.com/api/?key=28074243-fd9335165c63977f864a46342&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=100&page=${this.page}`;
  //   return fetch(url)
  //     .then(response => response.json())
  //     .then(({ hits, totalHits }) => {

  //       console.log(totalHits);
  //       console.log(hits.length)
  //       totalHits -= hits.length*this.page;
  //       localStorage.setItem("totalHits", totalHits);
  //       //Number(localStorage.getItem("totalHits"))
  //       if (totalHits < 0 ) {
  //         Notify.info("We're sorry, but you've reached the end of search results.");

  //       }
  //       console.log(totalHits)
  //       this.incrementPage();
  //       return { hits, totalHits };
  //     })

  // }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
