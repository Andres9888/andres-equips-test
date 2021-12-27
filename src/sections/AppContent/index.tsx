import { useState } from 'react';

import { List, Layout, Button, Empty } from 'antd';
import { AxiosError } from 'axios';
import { gridOptions } from 'config/ListGridConfig';
import { ListingsData, Datum, Note, Drawer } from 'types';
import useLocalStorageState from 'use-local-storage-state';

import { ListingCard, ListingSkeleton, DrawerContent, ListingFavorite, ListingPagination, ListingDrawer } from './components';

const { Content } = Layout;

interface Props {
  data: ListingsData | undefined;
  error: AxiosError;
  searchTerm: string;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}
function AppContent({ data, error, searchTerm, page, setPage, limit }: Props) {
  const [favorites, setFavorites] = useLocalStorageState<Datum[] | []>('favorites', []);
  const [notes, setNotes] = useLocalStorageState<Note[] | []>('notes', []);

  const [drawer, setDrawer] = useState<Drawer>({
    visible: false,
    currentBank: null,
  });

  if (!searchTerm) return <ListingFavorite favorites={favorites} setFavorites={setFavorites} />;
  if (!data) return <ListingSkeleton />;
  if (error) return <Empty image="/images/error-image.gif" />;

  const { data: bankData, totals } = data;

  return (
    <>
      <ListingPagination limit={limit} page={page} setPage={setPage} total={totals.count} />

      <Content className="home">
        <div className="home-listings">
          <List
            dataSource={bankData}
            grid={gridOptions}
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
                        currentBank: bank,
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
          <ListingDrawer isVisible={drawer.visible} setDrawer={setDrawer}>
            {drawer.currentBank && (
              <DrawerContent currentBank={drawer.currentBank} favorites={favorites} notes={notes} setFavorites={setFavorites} setNotes={setNotes} />
            )}
          </ListingDrawer>
        </div>
      </Content>
    </>
  );
}

export default AppContent;
