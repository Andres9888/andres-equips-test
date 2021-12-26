/* eslint-disable */
// @ts-nocheck

import { List, Layout } from 'antd';

import { ListingCard } from '../components';
import { Datum, Data } from '../../../types';
const { Content } = Layout;

interface Props {
  favorites: Datum[] | [];
  setFavorites: () => void;
}
export const ListingFavorite = ({ favorites, setFavorites, setDrawer }: Props) => {
  return (
    <Content className="home">
      <div className="home-listings">
        <List
          dataSource={favorites}
          grid={{
            gutter: 16,
            column: 4,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          renderItem={(bank: Data) => (
            <List.Item
              key={bank.data.ID}
              actions={[
                <a
                  key={`a-${bank.data.ID}`}
                  onClick={() =>
                    setDrawer({
                      visible: true,
                      user: bank.data,
                    })
                  }
                >
                  View Profile
                </a>,
              ]}
            >
              <ListingCard bank={bank} favorites={favorites} setFavorites={setFavorites} />
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
};
