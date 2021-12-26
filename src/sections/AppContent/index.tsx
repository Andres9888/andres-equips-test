import { useState } from 'react';

import { List, Layout, Drawer, Pagination, Button } from 'antd';
import { AxiosError } from 'axios';
import useLocalStorageState from 'use-local-storage-state';

import { ListingsData, Data, Datum } from '../../types';
import { ListingCard, ListingSkeleton, DrawerContent, ListingFavorite } from './components';

const { Content } = Layout;

interface Props {
  data: ListingsData | undefined;
  error: AxiosError;
  searchTerm: string;
  page: number;
  setPage: (page: number) => void;
}

interface Drawer {
  visible: boolean;
  user: Data | null;
}
function AppContent({ data, error, searchTerm, page, setPage }: Props) {
  const [favorites, setFavorites] = useLocalStorageState('favorites', []);
  const [notes, setNotes] = useLocalStorageState('notes', []);

  const [drawer, setDrawer] = useState<Drawer>({
    visible: false,
    user: null,
  });

  if (!searchTerm) return <ListingFavorite favorites={favorites} setFavorites={setFavorites} />;

  if (!data) return <ListingSkeleton />;
  if (error) return <p>Error!</p>;
  console.log(data);
  const { data: bankData, totals } = data;
  console.log(bankData);
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
        total={totals.count}
        onChange={(newPage: number) => setPage(newPage)}
      />

      <Content className="home">
        <div className="home-listings">
          <List
            dataSource={bankData}
            grid={{
              gutter: 16,
              column: 4,
              xs: 1,
              sm: 2,
              lg: 4,
            }}
            renderItem={(bank: Datum) => (
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
            {drawer.user && <DrawerContent drawer={drawer} favorites={favorites} notes={notes} setFavorites={setFavorites} setNotes={setNotes} />}
          </Drawer>
        </div>
      </Content>
    </div>
  );
}

export default AppContent;
