// @ts-nocheck

/* eslint-disable */

import { ListingCard } from './components/ListingCard';

import { List, Layout, Drawer, Input, Pagination, Affix } from 'antd';
import useLocalStorageState from 'use-local-storage-state';

import { useState } from 'react';
const { TextArea } = Input;
const { Content } = Layout;
function AppContent({ data, error, searchTerm }) {
  const [favorites, setFavorites] = useLocalStorageState('favorites', []);
  const [notes, setNotes] = useLocalStorageState('notes', []);
  const [value, setValue] = useState('');
  const [drawer, setDrawer] = useState({
    visible: false,
    user: null,
  });
  const [bankId, setBankId] = useState('');

  const showDrawer = ID => {
    setDrawer({
      visible: true,
      user: ID,
    });
  };

  const onClose = () => {
    setDrawer({
      visible: false,
      user: null,
    });
  };

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
                        user: bank.ID,
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
            <List.Item
              key={bank.data.ID}
              actions={[
                <a
                  onClick={() =>
                    setDrawer({
                      visible: true,
                      user: bank.data,
                    })
                  }
                  key={`a-${bank.data.ID}`}
                >
                  View Profile
                </a>,
              ]}
            >
              <ListingCard favorites={favorites} setFavorites={setFavorites} bank={bank} />
            </List.Item>
          )}
        />
        <Drawer width={640} placement="right" closable={true} onClose={onClose} visible={drawer.visible}>
          {drawer.user && (
            <>
              <h1>{drawer.user.NAME}</h1>
              <TextArea onChange={e => setNotes([...notes, { ID: drawer.user.ID, note: e.target.value }])} rows={4} />
            </>
          )}
        </Drawer>
      </div>
    </Content>
  );
}

export default AppContent;
