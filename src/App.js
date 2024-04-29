import { useState } from 'react';
import './App.css';
import { Navbar } from './components/navbar';
import { Page, PageContext } from './components/page';
import { SearchContext } from './components/search';

function App() {
  const [activePageItemIndex, setActivePageItemIndex] = useState(0);
  const [searchInputText, setSearchInputInput] = useState('');
  return (
    <PageContext.Provider value={[activePageItemIndex, setActivePageItemIndex]}>
      <SearchContext.Provider value={[searchInputText, setSearchInputInput]}>
        <Navbar />
        <Page />
      </SearchContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
