import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Axios from 'axios';

export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchArticles() {
    const url = `https://pixabay.com/api/?key=28074243-fd9335165c63977f864a46342&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

    return await Axios.get(url).then(response => {
      this.incrementPage();

      return response.data;
    });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get per_Page() {
    
    return this.per_page;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
