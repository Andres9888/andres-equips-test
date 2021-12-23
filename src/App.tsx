import './App.css';
import { useState } from 'react';

import axios from 'axios';
import useSWR from 'swr';

import AppContent from './sections/AppContent';
import AppHeader from './sections/AppHeader';

function App() {
  const [searchTerm, setSearchTerm] = useState('test');
  const { data, error } = useSWR(['/institutions', searchTerm], () =>
    axios({
      method: 'GET',
      url: 'https://banks.data.fdic.gov/api/institutions',
      params: {
        fields: 'NAME,ADDRESS,ASSET,ACTIVE,ESTYMD,NETINC,STNAME,WEBADDR,ZIP,UNINUM,OFFICES,',
        sort_by: 'NAME',
        sort_order: 'ASC',
        limit: 12,
        offset: 0,
        search: `NAME:${searchTerm}`,
      },
    }).then(res => res.data)
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  console.log(data);
  return (
    <>
      <AppHeader handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <AppContent data={data} error={error} searchTerm={searchTerm} />
    </>
  );
}

export default App;
