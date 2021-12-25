/* eslint-disable */
// @ts-nocheck
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
          <Rate
            character={<HeartOutlined />}
            count={1}
            defaultValue={favorites.find(x => x.data.ID === bank.data.ID) ? 1 : 0}
            onChange={() =>
              favorites.find(x => x.data.ID === bank.data.ID)
                ? setFavorites([...favorites.filter(e => e.data.ID !== bank.data.ID)])
                : setFavorites([...favorites, { data: bank.data }])
            }
          />
        </div>
      </div>
    </Card>
  );
};
