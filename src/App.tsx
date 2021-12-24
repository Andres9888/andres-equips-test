import './App.css';
import { useState } from 'react';

import axios from 'axios';
import useSWR from 'swr';

import AppContent from './sections/AppContent';
import AppHeader from './sections/AppHeader';

function App() {
  const [searchTerm, setSearchTerm] = useState('test');
  const [page, setPage] = useState(1);
  const { data, error } = useSWR([page, searchTerm], () =>
    axios
      .get(
        `https://banks.data.fdic.gov/api/institutions?offset=${(page - 1) *
          16}&fields=NAME,ADDRESS,ASSET,ACTIVE,ESTYMD,NETINC,STNAME,WEBADDR,ZIP,UNINUM,OFFICES,&sort_by=NAME&sort_order=ASC&limit=16&search=NAME:${searchTerm}`
      )
      .then(res => res.data)
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  console.log(data);
  return (
    <>
      <AppHeader handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <AppContent data={data} error={error} page={page} searchTerm={searchTerm} setPage={setPage} />
    </>
  );
}

export default App;
