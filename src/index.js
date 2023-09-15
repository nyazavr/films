import { createRoot } from 'react-dom/client';
import React from 'react';

import FilmsList from './components/filmsList/FilmsList';
import Footer from './components/Footer';
import Header from './components/Header';

export default class App extends React.Component {
  constructor() {
    super();
    this.listMovieRes = [];
    this.state = {
      listMovie: [],
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
        this.getKeyWord();
      })
      .catch((err) => console.error(err));
  }

  getKeyWord() {
    fetch('https://api.themoviedb.org/3/search/keyword?query=return&page=1', this.state.options)
      .then((response) => {
        response.json().then((response) => {
          let listMovieNew = response.results;
          listMovieNew.forEach(async (element) => {
            await this.createItemFilm(element, this.listMovieRes);
          });
          this.setState({
            responseCheck: true,
            listMovie: this.listMovieRes,
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
      id: response.id,
      image: response.backdrop_path,
      title: response.original_title,
      date: response.release_date,
      description: response.overview,
      genres: response.genres,
    };
    listMovieRes.push(movieItem);
  };

  render() {
    console.log(this.state.listMovie);
    const { listMovie } = this.state;
    //console.log(listMovie);
    return (
      <section className="filmsapp">
        ErrorBoundary
        {this.listMovieRes}
        <Header />
        <FilmsList films={listMovie} />
        <Footer />
      </section>
    );
  }
}
const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<App />);
