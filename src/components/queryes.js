const baseURL = 'https://api.themoviedb.org';
const apiKey = '5979ccc9d7629ef19375e4da01c011b8';

export default class Queryes {
  async queryRunGet(url) {
    return await fetch(baseURL + url + '&api_key=' + apiKey)
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err);
      });
  }
  async queryRunPost(url, body) {
    return await fetch(baseURL + url, {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' },
      body: body,
    })
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err);
      });
  }

  guestSession = async () => {
    return await fetch(baseURL + '/3/authentication/guest_session/new', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDhhMGU0NWNhNGE5OTdhYjQzMTg2NjliODIyYTExZiIsInN1YiI6IjY0ZDIxYTFkNGQ2NzkxMDEzOWVmYWViMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LzIYf5Y1OD-HOrOzFuVGbqx_61pi5xDZm95nrIfYs70',
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err);
      });
  };

  getGenres = async () => {
    return await this.queryRunGet('/3/genre/movie/list?language=en');
  };
  searchFilms = async ({ keywords = 'return', includeAdult = false, page = 1 }) => {
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
    return await this.queryRunPost(`/3/movie/${id}/rating?guest_session_id=${guestId}&api_key=${apiKey}`, value);
  };
  getRates = async ({ guestId, page }) => {
    return await this.queryRunGet(`/3/guest_session/${guestId}/rated/movies?page=${page}`);
  };
}
