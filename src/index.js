import { createRoot } from 'react-dom/client';
import React from 'react';

import FilmsList from './components/FilmsList';
import Footer from './components/Footer';
import Header from './components/Header';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      listMovie: [],
      responseCheck: false,
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTc5Y2NjOWQ3NjI5ZWYxOTM3NWU0ZGEwMWMwMTFiOCIsInN1YiI6IjY0ZDVlMDQ4ZjE0ZGFkMDBjNmY3YzQ3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOmTh2hVlDRg0UF2viJi9Few6LqIqZilapgMnNWFaag',
        },
      },
    };
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/authentication', this.state.options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.getKeyWord(this.state.options);
      })
      .catch((err) => console.error(err));
  }

  getKeyWord(options) {
    fetch('https://api.themoviedb.org/3/search/keyword?query=return&page=1', options)
      .then((response) => {
        response.json().then((response) => {
          let listMovieNew = response.results;
          let listMovieRes = [];
          listMovieNew.forEach((element) => {
            this.createItemFilm(element, listMovieRes);
          });
          console.log(listMovieRes);
          this.setState({
            responseCheck: true,
            listMovie: listMovieRes,
          });
        });
      })
      .catch((err) => console.error(err));
  }

  createItemFilm = async (movieNewItem, listMovieRes) => {
    let response = await fetch(
      'https://api.themoviedb.org/3/movie/' + movieNewItem.id + '?append_to_response=overview&language=en-US',
      this.state.options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    let movieItem = {
      image: response.backdrop_path,
      belongs: response.belongs_to_collection,
      date: response.release_date,
      description: response.overview,
      genres: response.genres,
    };
    listMovieRes.push(movieItem);
  };

  render() {
    const { listMovie } = this.state;
    console.log(listMovie);
    if (this.state.responseCheck) {
      return (
        <section className="filmsapp">
          <Header />
          <FilmsList films={listMovie} />
          <Footer />
        </section>
      );
    } else {
      return <div>loading</div>;
    }
  }
}
const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<App />);
