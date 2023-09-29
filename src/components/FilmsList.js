import React from 'react';
import { Pagination, Space } from 'antd';

import FilmItem from './FilmItem';

export default class FilmsList extends React.Component {
  constructor() {
    super();
  }

  createItems = (listMovie) => {
    return listMovie.map((e) => {
      console.log(e);
      return <FilmItem key={e.id} param={e} />;
    });
  };

  render() {
    try {
      console.log(this.props.totalPages);
      const filmsItems = this.createItems(this.props.listMovie);
      return (
        <div className="filmsapp__films films">
          <Space className="films__items" direction="vertical" align="center" wrap="true" size={'middle'}>
            {filmsItems}
          </Space>
          <Pagination
            onChange={(e) => this.props.onChangePagination(e)}
            className="films__pagination pagination"
            defaultPageSize={20}
            total={this.props.totalResults}
          />
        </div>
      );
    } catch (err) {
      console.log(err);
      return <div> Loading</div>;
    }
  }
}
