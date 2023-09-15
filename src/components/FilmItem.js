import React from 'react';
import { Space, Typography } from 'antd';

const { Text } = Typography;
export default class FilmItem extends React.Component {
  render() {
    const {
      title = 'not',
      image = '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
      date = '2000-01-01',
      genres = null,
      description = '',
    } = this.props.movie;
    const genre = genres.map((e) => e.name);
    return (
      <Space align="horizontal" className="film-item">
        <div className="poster">
          <img src={String('https://image.tmdb.org/t/p/w220_and_h330_face' + image)} />
        </div>
        <Space direction="vertical">
          <h2>{title}</h2>
          <div>
            <Text>{date}</Text>
            <Text keyboard>{genre}</Text>
            <Text className="description">{description}</Text>
          </div>
        </Space>
      </Space>
    );
  }
}
