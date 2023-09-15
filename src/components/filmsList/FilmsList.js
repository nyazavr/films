import React from 'react';
import { Space } from 'antd';

import FilmItem from '../FilmItem';
import ErrorBoundary from '../ErrorBoundary';
import './FilmsList.css';

export default class FilmsList extends React.Component {
  render() {
    let films = this.props.films;
    try {
      console.log(films);
      let items = films.map((e) => {
        let { id } = e;
        console.log(e);
        if (e.id != undefined) {
          return (
            <ErrorBoundary key={id}>
              <FilmItem movie={e} />
            </ErrorBoundary>
          );
        }
      });
      console.log(items);
      return (
        <div className="items container">
          <ErrorBoundary>
            <Space size={'small'} className="items" wrap>
              Я ТУТ АЛООО
              <ErrorBoundary>{items}</ErrorBoundary>
            </Space>
          </ErrorBoundary>
        </div>
      );
    } catch (err) {
      console.log(err);
    }
  }
}
