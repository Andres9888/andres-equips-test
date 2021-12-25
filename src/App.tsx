import './App.css';
import React, { useState } from 'react';

import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

import AppContent from './sections/AppContent';
import AppHeader from './sections/AppHeader';
import { ListingsData } from './types';

const fetcher = (url: string): Promise<ListingsData> => axios.get(url).then((response: AxiosResponse) => response.data);
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 16;
  const offset = (page - 1) * limit;
  const url = `https://banks.data.fdic.gov/api/institutions?offset=${offset}&fields=NAME,ADDRESS,ASSET,ACTIVE,ESTYMD,NETINC,STNAME,WEBADDR,ZIP,UNINUM,OFFICES,&sort_by=NAME&sort_order=ASC&limit=${limit}&search=NAME:${searchTerm}`;
  const { data, error } = useSWR(url, fetcher);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <AppHeader handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <AppContent data={data} error={error} page={page} searchTerm={searchTerm} setPage={setPage} />
    </>
  );
}

export default App;
