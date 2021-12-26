/* eslint-disable */
// @ts-nocheck
import { useState } from 'react';
import { BankTwoTone, HomeTwoTone, HeartOutlined } from '@ant-design/icons';
import { Card, Typography, Space, Rate } from 'antd';

const { Text, Title } = Typography;

export const ListingCard = ({ bank, favorites, setFavorites }: Props) => {
  const { NAME, ADDRESS, STNAME: STREET, ZIP } = bank.data;

  const [isFavorite, setIsFavorite] = useState(favorites.find(favorite => favorite.data.ID === bank.data.ID) ? 1 : 0);

  const handleFavoriteChange = () => {
    favorites.find(favorite => favorite.data.ID === bank.data.ID)
      ? setFavorites([...favorites.filter(favorite => favorite.data.ID !== bank.data.ID)])
      : setFavorites([...favorites, { data: bank.data }]);
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
          <Rate character={<HeartOutlined />} count={1} defaultValue={isFavorite} onChange={handleFavoriteChange} />
        </div>
      </div>
    </Card>
  );
};
