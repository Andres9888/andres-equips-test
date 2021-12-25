import { useState } from 'react';

import { List, Layout, Drawer, Input, Pagination, Affix, Card, Button } from 'antd';
import { AxiosError } from 'axios';
import useLocalStorageState from 'use-local-storage-state';

import { ListingCard, ListingSkeleton, DrawerContent } from './components';
import { ListingsData } from './types';

const { Content } = Layout;

interface Props {
  data: ListingsData;
  error: AxiosError;
  searchTerm: string;
  page: number;
  setPage: (page: number) => void;
}
function AppContent({ data, error, searchTerm, page, setPage }: Props) {
  const [favorites, setFavorites] = useLocalStorageState('favorites', []);
  const [notes, setNotes] = useLocalStorageState('notes', []);

  const [drawer, setDrawer] = useState({
    visible: false,
    user: null,
  });

  if (!searchTerm) {
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
            renderItem={bank => (
              <List.Item
                key={bank.ID}
                actions={[
                  <a
                    key={`a-${bank.ID}`}
                    onClick={() =>
                      setDrawer({
                        visible: true,
                        user: bank,
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
  }
  if (!data) return <ListingSkeleton />;
  if (error) return <p>Error!</p>;

  const showDrawer = bank => {};

  const onClose = () => {
    setDrawer({
      visible: false,
      user: null,
    });
  };

  return (
    <div>
      <Pagination
        hideOnSinglePage
        showLessItems
        className="listings-pagination"
        current={page}
        total={data.meta.total}
        onChange={newPage => setPage(newPage)}
      />

      <Content className="home">
        <div className="home-listings">
          <List
            dataSource={data.data}
            grid={{
              gutter: 16,
              column: 4,
              xs: 1,
              sm: 2,
              lg: 4,
            }}
            renderItem={bank => (
              <List.Item
                key={bank.data.ID}
                actions={[
                  <Button
                    key={`a-${bank.data.ID}`}
                    type="primary"
                    onClick={() =>
                      setDrawer({
                        visible: true,
                        user: bank.data,
                      })
                    }
                  >
                    View Bank Details
                  </Button>,
                ]}
              >
                <ListingCard bank={bank} favorites={favorites} setFavorites={setFavorites} />
              </List.Item>
            )}
          />
          <Drawer closable placement="right" visible={drawer.visible} width={640} onClose={onClose}>
            {drawer.user && <DrawerContent drawer={drawer} notes={notes} setNotes={setNotes} />}
          </Drawer>
        </div>
      </Content>
    </div>
  );
}

export default AppContent;
