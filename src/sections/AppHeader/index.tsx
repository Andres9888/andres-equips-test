import React from 'react';

import { BankOutlined } from '@ant-design/icons';
import { Input, Layout, Affix } from 'antd';

interface Props {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const { Header } = Layout;
const { Search } = Input;
function AppHeader({ searchTerm, handleSearchChange }: Props) {
  return (
    <Affix className="app__affix-header" offsetTop={0}>
      <Header className="app-header">
        <div className="app-header__logo-search-section">
          <div className="app-header__logo">
            <div>
              <BankOutlined />
            </div>
          </div>
          <Search placeholder="Search to filter what you are looking for" type="text" value={searchTerm} onChange={handleSearchChange} />;
        </div>
      </Header>
    </Affix>
  );
}

export default AppHeader;
