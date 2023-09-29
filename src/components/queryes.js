const baseURL = 'https://api.themoviedb.org';

export default class Queryes {
  constructor() {
    this.optionsGet = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTc5Y2NjOWQ3NjI5ZWYxOTM3NWU0ZGEwMWMwMTFiOCIsInN1YiI6IjY0ZDVlMDQ4ZjE0ZGFkMDBjNmY3YzQ3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOmTh2hVlDRg0UF2viJi9Few6LqIqZilapgMnNWFaag',
      },
    };
    this.optionsPost = {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' },
      body: '',
    };
  }

  async queryRunGet(url) {
    const res = await fetch(baseURL + url, this.optionsGet)
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err);
      });
    return res;
  }
  async queryRunPost(url, body) {
    this.optionsPost.body = body;
    const res = await fetch(baseURL + url, this.optionsPost)
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err);
      });
    return res;
  }

  auth = async () => {
    await this.queryRunGet('/3/authentication').then((res) => {
      console.log(res);
    });
  };

  guestSession = async () => {
    return await this.queryRunGet('/3/authentication/guest_session/new');
  };

  getGenres = async () => {
    return await this.queryRunGet('/3/genre/movie/list?language=en');
  };
  createItemsFilms = async ({
    keywords = 'return',
    includeAdult = false,
    page = 1,
    sortBy = 'popularity.desc',
  } = {}) => {
    console.log(keywords);
    let includeAdultParse = includeAdult ? 'true' : 'false';
    return await this.queryRunGet(
      '/3/discover/movie?include_adult=' +
        includeAdultParse +
        '&language=en-US&page=' +
        String(page) +
        '&sort_by=' +
        sortBy +
        '&with_keywords=' +
        keywords
    );
  };
  searchFilms = async ({ keywords = 'return', includeAdult = false, page = 1 }) => {
    console.log(keywords);
    let includeAdultParse = includeAdult ? 'true' : 'false';
    return await this.queryRunGet(
      '/3/search/movie?include_adult=' +
        includeAdultParse +
        '&language=en-US&page=' +
        String(page) +
        '&query=' +
        keywords
    );
  };
  addRate = async ({ id, guestId, value }) => {
    console.log(guestId);
    return await this.queryRunPost('/3/movie/' + id + '/rating?guest_session_id=' + guestId, value);
  };
  getRate = async ({ id, guestId }) => {
    return await this.queryRunGet('/3/movie/' + id + '/rating?guest_session_id=' + guestId);
  };
}
