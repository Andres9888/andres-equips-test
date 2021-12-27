import { useEffect, ChangeEvent } from 'react';

import { BankTwoTone } from '@ant-design/icons';
import { Input, Layout, Affix } from 'antd';
import Typed from 'typed.js';

interface Props {
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const { Header } = Layout;
const { Search } = Input;
function AppHeader({ searchTerm, handleSearchChange }: Props) {
  useEffect(() => {
    // Options for the Typed object
    const options = {
      strings: [
        'Hey, If you need to find something just search and it will filter it',
        'Or Leave it Blank to Return your Favorite Banks',
        "Let's Go!",
        'Search for your favorite bank',
        '',
      ],
      bindInputFocusEvents: true,
      attr: 'placeholder',
      typeSpeed: 25,
      backSpeed: 25,
      cursorChar: '_',
      startDelay: 1150,
      smartBackspace: true,
      showCursor: true,
    };

    // New Typed instance
    const typed = new Typed('.ant-input', options);

    // Destroy Typed instance on unmounting the component to prevent memory leaks
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
