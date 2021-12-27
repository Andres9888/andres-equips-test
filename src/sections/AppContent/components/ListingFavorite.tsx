import { List, Layout } from 'antd';
import { gridOptions } from 'config/ListGridConfig';
import { Datum } from 'types';

import { ListingCard } from '../components';

const { Content } = Layout;

interface Props {
  favorites: Datum[] | [];
  setFavorites: (favorites: Datum[] | []) => void;
}
export const ListingFavorite = ({ favorites, setFavorites }: Props) => {
  return (
    <Content className="home">
      <div className="home-listings">
        <List
          dataSource={favorites}
          grid={gridOptions}
          renderItem={(bank: Datum) => (
            <List.Item key={bank.data.ID}>
              <ListingCard bank={bank} favorites={favorites} setFavorites={setFavorites} />
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
};
