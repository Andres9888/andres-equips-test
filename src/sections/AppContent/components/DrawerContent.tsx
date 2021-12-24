/* eslint-disable */
// @ts-nocheck
import { BankTwoTone, HomeTwoTone, CalendarTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Input, Space, Button } from 'antd';
import { FcMoneyTransfer, FcCalendar, FcLibrary, FcAddressBook } from 'react-icons/fc';
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

      <TextArea value={value} onChange={e => setValue(e.target.value)} rows={4} />
      <Button onClick={handleClick} type="primary">
        Save Note
      </Button>
    </>
  );
};
