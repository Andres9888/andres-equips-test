/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Input, Space, Button, Rate } from 'antd';
import { FcMoneyTransfer, FcCalendar, FcLibrary, FcAddressBook } from 'react-icons/fc';

const { TextArea } = Input;
export const DrawerContent = ({ drawer: currentBank, notes, setNotes, favorites, setFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(favorites.find(favorite => favorite.data.ID === currentBank.ID) ? 1 : 0);
  const [value, setValue] = useState('');

  const hasNote = notes.find(note => note.ID === currentBank.ID);

  const { NAME, ADDRESS, STNAME: STREET, ZIP, ESTYMD: ESTABLISHEDDATE, ASSET } = currentBank;

  useEffect(() => {
    hasNote && setValue(notes.find(note => note.ID === currentBank.ID).note);
  }, []);

  const handleNoteSave = () => {
    hasNote
      ? setNotes([...notes.filter(x => x.ID !== currentBank.ID), { ID: currentBank.ID, note: value }])
      : setNotes([...notes, { ID: currentBank.ID, note: value }]);
  };

  const handleFavoriteChange = () => {
    favorites.find(favorite => favorite.data.ID === currentBank.ID)
      ? setFavorites([...favorites.filter(favorite => favorite.data.ID !== currentBank.ID)])
      : setFavorites([...favorites, { data: currentBank }]);
  };

  return (
    <>
      <h3>
        <Space>
          <FcLibrary />
          {NAME}
        </Space>
      </h3>
      <h3>
        <FcAddressBook />
        {ADDRESS}
      </h3>

      <h3>{`${STREET} , ${ZIP}`}</h3>
      <h3>
        <Space>
          <FcCalendar />
          {`Established Date : ${ESTABLISHEDDATE}`}
        </Space>
      </h3>

      <h3>
        <Space>
          <FcMoneyTransfer />
          {`Total Assets : ${ASSET}`}
        </Space>
      </h3>

      <TextArea rows={4} value={value} onChange={e => setValue(e.target.value)} />
      <br />
      <Space>
        <Button type="primary" onClick={handleNoteSave}>
          Save Note
        </Button>
        <Rate character={<HeartOutlined />} count={1} defaultValue={isFavorite} onChange={handleFavoriteChange} />
      </Space>
    </>
  );
};
