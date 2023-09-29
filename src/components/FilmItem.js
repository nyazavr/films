import React, { useState } from 'react';
import { Image, Rate, Space, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

import GenreContext from '../context/ContextGenre';

const { Title, Text } = Typography;

const FilmItem = (props) => {
  const { id, vote_average, poster_path, title, genre_ids, overview } = props.param;
  const [value, setValue] = useState(0);
  return (
    <GenreContext.Consumer>
      {({ genres, queryService, guestSession }) => {
        return (
          <div className="film-item">
            <Image
              className="film-item--poster"
              loading="lazy"
              width={220}
              src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + poster_path}
            />
            <div direction="vertical" className="film-item--info info">
              <Title className="info__title" ellipsis={{ rows: 2 }} level={4}>
                {title}
              </Title>
              <Space size={'small'} wrap="true" className="info--genres">
                {genre_ids.map((e) => (
                  <Text className="info--genre" keyboard key={e}>
                    {genres.find((x) => x.id == e).name}
                  </Text>
                ))}
              </Space>
              <Text className="info--description" wrap="true">
                {overview}
              </Text>
              <Rate
                onChange={(e) => {
                  setValue(e);
                  queryService.addRate({
                    id: id,
                    guestId: guestSession.guest_session_id,
                    value: '{value:' + value + '}',
                  });
                }}
                className="info--rate-star"
                count={10}
                value={value}
                character={<StarFilled width={23} />}
              ></Rate>
              <div className="info--rate-icon">
                <Text>{vote_average.toFixed(1)}</Text>
              </div>
            </div>
          </div>
        );
      }}
    </GenreContext.Consumer>
  );
};

export default FilmItem;
