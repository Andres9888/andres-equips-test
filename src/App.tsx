import './App.css';
import { useState, ChangeEvent } from 'react';

import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { ListingsData } from 'types';

import AppContent from './sections/AppContent';
import AppHeader from './sections/AppHeader';

const fetcher = (url: string): Promise<ListingsData | undefined> => axios.get(url).then((response: AxiosResponse) => response.data);
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const limit = 16;
  const offset = (page - 1) * limit;
  const url = `https://banks.data.fdic.gov/api/institutions?offset=${offset}&fields=NAME,ADDRESS,ASSET,ESTYMD,STNAME,ZIP&sort_by=NAME&sort_order=ASC&limit=${limit}&search=NAME:${searchTerm}`;

  const { data, error } = useSWR<ListingsData | undefined>(url, fetcher);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <AppHeader handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <AppContent data={data} error={error} limit={limit} page={page} searchTerm={searchTerm} setPage={setPage} />
    </>
  );
}

export default App;
