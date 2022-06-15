export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

    fetchArticles() {
        console.log(this);
        // const options = {
        //   headers: {
        //     Authorization: '28074243-fd9335165c63977f864a46342',
        //   },
        // };
      
        console.log(this.searchQuery);
        console.log(this.page)
        const url = `https://pixabay.com/api/?key=28074243-fd9335165c63977f864a46342&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        return fetch(url)
             .then(response => response.json())
      .then(({hits}) => {
        console.log(hits);
        this.incrementPage();
        return hits;
      });
  }
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
