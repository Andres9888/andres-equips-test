import React, { useEffect, useState } from 'react';

import { HeartOutlined } from '@ant-design/icons';
import { Input, Space, Button, Rate } from 'antd';
import { FcMoneyTransfer, FcCalendar, FcLibrary, FcAddressBook } from 'react-icons/fc';
import { Datum, Note } from 'types';

import { formatListingCurrency } from '../../../helper/formatCurrency';

const { TextArea } = Input;

interface Props {
  favorites: Datum[] | [];
  setFavorites: (favorites: Datum[] | []) => void;
  currentBank: Datum;
  notes: Note[] | [];
  setNotes: (favorites: Note[] | []) => void;
}
export const DrawerContent = ({ currentBank, notes, setNotes, favorites, setFavorites }: Props) => {
  const { NAME, ADDRESS, STNAME: STREET, ZIP, ESTYMD: ESTABLISHEDDATE, ASSET, ID } = currentBank.data;
  const [isFavorite, setIsFavorite] = useState(favorites.find(favorite => favorite.data.ID === ID) ? 1 : 0);
  const [value, setValue] = useState('');

  const hasNote = notes.find(note => note.ID === ID);

  useEffect(() => {
    hasNote && setValue(hasNote.note);
  }, []);

  const handleNoteSave = () => {
    hasNote ? setNotes([...notes.filter(note => note.ID !== ID), { ID, note: value }]) : setNotes([...notes, { ID, note: value }]);
  };

  const handleFavoriteChange = () => {
    favorites.find(favorite => favorite.data.ID === ID)
      ? setFavorites([...favorites.filter(favorite => favorite.data.ID !== ID)])
      : setFavorites([...favorites, currentBank]);
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
          {`Total Assets : ${formatListingCurrency(ASSET, 1000)}`}
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
