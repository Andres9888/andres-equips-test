import './App.css';
import { useState } from 'react';

import { Pagination } from 'antd';
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
          20}&fields=NAME,ADDRESS,ASSET,ACTIVE,ESTYMD,NETINC,STNAME,WEBADDR,ZIP,UNINUM,OFFICES,&sort_by=NAME&sort_order=ASC&limit=20&search=NAME:${searchTerm}`
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
      <Pagination className="listings-pagination" current={page} defaultPageSize={20} total={300} onChange={newPage => setPage(newPage)} />
      <AppContent data={data} error={error} searchTerm={searchTerm} />
    </>
  );
}

export default App;
