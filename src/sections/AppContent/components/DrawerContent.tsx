/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Input, Space, Button, Rate } from 'antd';
import { FcMoneyTransfer, FcCalendar, FcLibrary, FcAddressBook } from 'react-icons/fc';

const { TextArea } = Input;
export const DrawerContent = ({ drawer, notes, setNotes, favorites, setFavorites }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    notes.find(x => x.ID === drawer.user.ID) && setValue(notes.find(x => x.ID === drawer.user.ID).note);
  }, []);

  const handleClick = () => {
    notes.find(x => x.ID === drawer.user.ID)
      ? setNotes([...notes.filter(x => x.ID !== drawer.user.ID), { ID: drawer.user.ID, note: value }])
      : setNotes([...notes, { ID: drawer.user.ID, note: value }]);
  };
  return (
    <>
      <h3>
        <Space>
          <FcLibrary />
          {drawer.user.NAME}
        </Space>
      </h3>
      <h3>
        <FcAddressBook />
        {drawer.user.ADDRESS}
      </h3>

      <h3>{`${drawer.user.STNAME} , ${drawer.user.ZIP}`}</h3>
      <h3>
        <Space>
          <FcCalendar />
          {`Established Date : ${drawer.user.ESTYMD}`}
        </Space>
      </h3>

      <h3>
        <Space>
          <FcMoneyTransfer />
          {`Total Assets : ${drawer.user.ASSET}`}
        </Space>
      </h3>

      <TextArea rows={4} value={value} onChange={e => setValue(e.target.value)} />
      <Button type="primary" onClick={handleClick}>
        Save Note
      </Button>
      <Rate
        character={<HeartOutlined />}
        count={1}
        defaultValue={favorites.find(x => x.data.ID === drawer.user.ID) ? 1 : 0}
        onChange={() =>
          favorites.find(x => x.data.ID === drawer.user.ID)
            ? setFavorites([...favorites.filter(e => e.data.ID !== drawer.user.ID)])
            : setFavorites([...favorites, { data: drawer.user }])
        }
      />
    </>
  );
};
