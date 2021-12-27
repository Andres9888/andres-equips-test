import { useEffect, useState } from 'react';

import { BankTwoTone, HomeTwoTone, HeartOutlined } from '@ant-design/icons';
import { Card, Typography, Space, Rate } from 'antd';
import { Datum } from 'types';

interface Props {
  favorites: Datum[] | [];
  setFavorites: (favorites: Datum[] | []) => void;
  bank: Datum;
}
const { Text, Title } = Typography;
export const ListingCard = ({ bank, favorites, setFavorites }: Props) => {
  const { NAME, ADDRESS, STNAME: STREET, ZIP } = bank.data;

  const [isFavorite, setIsFavorite] = useState<number>();
  useEffect(() => {
    setIsFavorite(favorites.find(favorite => favorite.data.ID === bank.data.ID) ? 1 : 0);
  });
  const handleFavoriteChange = () => {
    favorites.find(favorite => favorite.data.ID === bank.data.ID)
      ? setFavorites([...favorites.filter(favorite => favorite.data.ID !== bank.data.ID)])
      : setFavorites([...favorites, bank]);
  };

  return (
    <Card hoverable>
      <div className="listing-card__details">
        <div className="listing-card__description">
          <Title className="listing-card__price" level={4}>
            <BankTwoTone />
            {NAME}
          </Title>
          <Text ellipsis strong className="listing-card__title">
            <Space>
              <HomeTwoTone />
              {ADDRESS}
            </Space>
          </Text>
          <Text ellipsis className="listing-card__address">
            {`${STREET} , ${ZIP}`}
          </Text>
          <Rate
            character={<HeartOutlined />}
            count={1}
            tooltips={['Click me to set as your favorite']}
            value={isFavorite}
            onChange={handleFavoriteChange}
          />
        </div>
      </div>
    </Card>
  );
};
