import React from 'react';
import { Space } from 'antd';
//import FilmItem from './FilmItem';

const FilmItem = (props) => {
  const { movie } = props;
  return (
    <div className="film-item">
      <div className="description">{movie.description}</div>
    </div>
  );
};

export default function FilmsList(props) {
  const { films } = props;
  console.log(props);
  let items = films.map((e) => {
    const { id, ...taskProp } = e;
    return <FilmItem key={id} movie={taskProp} />;
  });
  return (
    <Space size={'small'} className="items">
      {items}
    </Space>
  );
}
