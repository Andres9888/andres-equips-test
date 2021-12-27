import { useEffect, ChangeEvent } from 'react';

import { BankTwoTone } from '@ant-design/icons';
import { Input, Layout, Affix } from 'antd';
import { options } from 'config/typedConfig';
import Typed from 'typed.js';

interface Props {
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const { Header } = Layout;
const { Search } = Input;
function AppHeader({ searchTerm, handleSearchChange }: Props) {
  useEffect(() => {
    const typed = new Typed('.ant-input', options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Affix className="app__affix-header" offsetTop={0}>
      <Header className="app-header">
        <div className="app-header__logo-search-section">
          <div className="app-header__logo">
            <div>
              <BankTwoTone />
            </div>
          </div>
          <Search placeholder="Search to filter what you are looking for" type="text" value={searchTerm} onChange={handleSearchChange} />
        </div>
      </Header>
    </Affix>
  );
}

export default AppHeader;
