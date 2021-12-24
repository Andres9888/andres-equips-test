// @ts-nocheck

/* eslint-disable */

import { ListingCard, ListingSkeleton, DrawerContent } from './components';

import { List, Layout, Drawer, Input, Pagination, Affix, Card, Button } from 'antd';
import useLocalStorageState from 'use-local-storage-state';

import { useState } from 'react';

const { Content } = Layout;
function AppContent({ data, error, searchTerm, page, setPage }) {
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
            grid={{
              gutter: 16,
              column: 4,
              xs: 1,
              sm: 2,
              lg: 4,
            }}
            dataSource={favorites}
            renderItem={bank => (
              <List.Item
                key={bank.ID}
                actions={[
                  <a
                    onClick={() =>
                      setDrawer({
                        visible: true,
                        user: bank,
                      })
                    }
                    key={`a-${bank.ID}`}
                  >
                    View Profile
                  </a>,
                ]}
              >
                <ListingCard favorites={favorites} setFavorites={setFavorites} bank={bank} />
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
        className="listings-pagination"
        current={page}
        total={data.meta.total}
        onChange={newPage => setPage(newPage)}
        hideOnSinglePage
        showLessItems
      />
      <AnimatePresence>
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
                <List.Item
                  key={bank.data.ID}
                  actions={[
                    <Button
                      type="primary"
                      onClick={() =>
                        setDrawer({
                          visible: true,
                          user: bank.data,
                        })
                      }
                      key={`a-${bank.data.ID}`}
                    >
                      View Bank Details
                    </Button>,
                  ]}
                >
                  <ListingCard favorites={favorites} setFavorites={setFavorites} bank={bank} />
                </List.Item>
              )}
            />
            <Drawer width={640} placement="right" closable={true} onClose={onClose} visible={drawer.visible}>
              {drawer.user && <DrawerContent drawer={drawer} notes={notes} setNotes={setNotes} />}
            </Drawer>
          </div>
        </Content>
      </AnimatePresence>
    </div>
  );
}

export default AppContent;
