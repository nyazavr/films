import React from 'react';
import { Spin, Input, Menu } from 'antd';
import { debounce } from 'lodash';

import GenreContext from '../context/ContextGenre';

import FilmsList from './FilmsList';
import Footer from './Footer';
import Queryes from './queryes';
import ErrorMessage from './ErrorMessage';

export const SCREEN_SM = 576;
export const SCREEN_MD = 768;
export const SCREEN_LG = 992;
export const SCREEN_XL = 1200;
export const SCREEN_XXL = 1400;

export default class App extends React.Component {
  queryService = new Queryes();

  constructor() {
    super();
    this.state = {
      itemsMeny: [
        {
          label: 'Search',
          key: 'search',
        },
        {
          label: 'Rated',
          key: 'rated',
        },
      ],
      searchLabel: '',
      currentNav: 'search',
      keyword: 'return',
      genres: null,
      guestSession: null,
      listMovie: null,
      rateListMovie: null,
      loading: true,
      error: false,
    };
  }

  onClickNav = (e) => {
    this.setState({
      current: e.key,
    });
  };

  componentDidMount = () => {
    this.queryService
      .auth()
      .then(() => {
        this.queryService
          .getGenres()
          .then((res) => {
            this.setState({ genres: res });
          })
          .catch((err) => {
            this.onError(err);
          });
        this.queryService
          .searchFilms({ keywords: this.state.keyword })
          .then((res) => {
            this.setState({ listMovie: res, loading: false });
          })
          .catch((err) => {
            this.onError(err);
          });
        this.queryService
          .guestSession()
          .then((res) => {
            console.log(res);
            this.setState({ guestSession: res });
          })
          .catch((err) => {
            this.onError(err);
          });
      })
      .catch((err) => {
        this.onError(err);
      });
  };

  onError = (err) => {
    console.log(err);
    this.setState({ error: true, loading: true });
  };

  onChangeSearch = (e) => {
    console.log(e);
    this.queryService
      .searchFilms({ keywords: e })
      .then((res) => {
        console.log(res);
        this.setState({ keyword: e, listMovie: res, loading: false });
      })
      .catch((err) => {
        this.onError(err);
      });
  };

  onChangePagination = (e) => {
    this.queryService
      .searchFilms({ page: e, keywords: this.state.keyword })
      .then((res) => {
        console.log(res);
        this.setState({ listMovie: res, loading: false });
      })
      .catch((err) => {
        this.onError(err);
      });
  };

  render() {
    const { listMovie, genres, loading, error } = this.state;
    try {
      return (
        <React.StrictMode>
          <section className="filmsapp">
            <div direction="vertical" className="header">
              <Menu
                className="header--meny"
                onClick={this.onClickNav}
                selectedKeys={this.state.current}
                mode="horizontal"
                items={this.state.items}
              />
              <Input
                onChange={debounce((e) => {
                  console.log(e);
                  e.preventDefault();
                  if (!e.target.value.replaceAll(' ', '') == '') {
                    this.onChangeSearch(e.target.value);
                  }
                }, 500)}
                size="large"
                className="header--search"
                placeholder="Type to search..."
              ></Input>
            </div>
            {loading ? (
              <Spin />
            ) : (
              <GenreContext.Provider
                value={{
                  genres: genres.genres.slice(0),
                  queryService: this.queryService,
                  guestSession: this.state.guestSession,
                }}
              >
                <FilmsList
                  onChangePagination={this.onChangePagination}
                  totalResults={listMovie.total_results}
                  listMovie={listMovie ? listMovie.results.slice(0) : []}
                />
              </GenreContext.Provider>
            )}
            {error ? <ErrorMessage /> : null}
            <Footer />
          </section>
        </React.StrictMode>
      );
    } catch (err) {
      console.log(err);
      return <div> Loading</div>;
    }
  }
}
