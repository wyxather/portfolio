import { useState } from 'react';
import './App.css';
import { Navbar } from './components/navbar';
import { Page, PageContext } from './components/page';

function App() {
  const [activePageItemIndex, setActivePageItemIndex] = useState(0);
  return (
    <PageContext.Provider value={[activePageItemIndex, setActivePageItemIndex]}>
      <Navbar />
      <Page />
    </PageContext.Provider>
  );
}

export default App;
