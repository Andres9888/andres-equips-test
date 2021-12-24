/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { List, Layout, Drawer, Input, Pagination, Affix, Card, Button } from 'antd';

const { TextArea } = Input;
export const DrawerContent = ({ drawer, notes, setNotes }) => {
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
      <h1>{drawer.user.NAME}</h1>
      <TextArea value={value} onChange={e => setValue(e.target.value)} rows={4} />
      <Button onClick={handleClick} type="primary">
        Save Note
      </Button>
    </>
  );
};
