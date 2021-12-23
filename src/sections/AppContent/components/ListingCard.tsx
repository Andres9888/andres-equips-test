/* eslint-disable */
// @ts-nocheck
import useLocalStorageState from 'use-local-storage-state';

import { BankTwoTone, HomeTwoTone, HeartOutlined } from '@ant-design/icons';
import { Card, Typography, Space, Rate } from 'antd';

const { Text, Title } = Typography;

export const ListingCard = ({ bank, favorites, setFavorites }: Props) => {
  return (
    <Card hoverable>
      <div className="listing-card__details">
        <div className="listing-card__description">
          <Title className="listing-card__price" level={4}>
            <BankTwoTone />
            {bank.data.NAME}
          </Title>
          <Text ellipsis strong className="listing-card__title">
            <Space>
              <HomeTwoTone />
              {bank.data.ADDRESS}
            </Space>
          </Text>
          <Text ellipsis className="listing-card__address">
            {`${bank.data.STNAME} , ${bank.data.ZIP}`}
          </Text>
          <Rate defaultValue={1} onChange={() => setFavorites([...favorites, bank.data.ID])} character={<HeartOutlined />} count={1} />
        </div>
      </div>
    </Card>
  );
};
