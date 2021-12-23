// @ts-nocheck

/* eslint-disable */

import { ListingCard } from './components/ListingCard';

import { List, Layout } from 'antd';
import useLocalStorageState from 'use-local-storage-state';

const { Content } = Layout;
function AppContent({ data, error, searchTerm }) {
  const [favorites, setFavorites] = useLocalStorageState('favorites', []);

  if (!searchTerm) {
    return (
      <Content className="home">
        <div className="home-listings">
          <List
            grid={{
              gutter: 16,
              column: 4,
              xs: 1,
              sm: 2,
              lg: 4,
            }}
            dataSource={favorites}
            renderItem={bank => (
              <List.Item>
                <ListingCard favorites={favorites} setFavorites={setFavorites} bank={bank} />
              </List.Item>
            )}
          />
        </div>
      </Content>
    );
  }
  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Content className="home">
      <div className="home-listings">
        <List
          grid={{
            gutter: 16,
            column: 4,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={data.data}
          renderItem={bank => (
            <List.Item>
              <ListingCard favorites={favorites} setFavorites={setFavorites} bank={bank} />
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
}

export default AppContent;
