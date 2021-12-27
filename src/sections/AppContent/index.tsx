import { useState } from 'react';

import { List, Layout, Drawer, Pagination, Button, Empty } from 'antd';
import { AxiosError } from 'axios';
import { ListingsData, Datum, Note } from 'types';
import useLocalStorageState from 'use-local-storage-state';

import { ListingCard, ListingSkeleton, DrawerContent, ListingFavorite } from './components';

const { Content } = Layout;

interface Drawer {
  visible: boolean;
  user: Datum | null;
}

interface Props {
  data: ListingsData | undefined;
  error: AxiosError;
  searchTerm: string;
  page: number;
  setPage: (page: number) => void;
}
function AppContent({ data, error, searchTerm, page, setPage }: Props) {
  const [favorites, setFavorites] = useLocalStorageState<Datum[] | []>('favorites', []);
  const [notes, setNotes] = useLocalStorageState<Note[] | []>('notes', []);

  const [drawer, setDrawer] = useState<Drawer>({
    visible: false,
    user: null,
  });

  if (!searchTerm) return <ListingFavorite favorites={favorites} setFavorites={setFavorites} />;
  if (!data) return <ListingSkeleton />;
  if (error) return <Empty image="/images/error-image.gif" />;

  const { data: bankData, totals } = data;

  return (
    <div>
      <Pagination
        hideOnSinglePage
        showLessItems
        className="listings-pagination"
        current={page}
        showSizeChanger={false}
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
                        user: bank,
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
          <Drawer
            closable
            placement="right"
            visible={drawer.visible}
            width={640}
            onClose={() => {
              setDrawer({
                visible: false,
                user: null,
              });
            }}
          >
            {drawer.user && (
              <DrawerContent currentBank={drawer.user} favorites={favorites} notes={notes} setFavorites={setFavorites} setNotes={setNotes} />
            )}
          </Drawer>
        </div>
      </Content>
    </div>
  );
}

export default AppContent;
