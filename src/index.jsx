import React from 'react';
import ReactDOM from 'react-dom/client';
import PagesView from './components/root';
import { SelectPageProvider } from './providers/SelectPageProvider';
import NavBarView from './components/navBarView';


const navbarNavAltMarkup = ReactDOM.createRoot(document.getElementById('root'));
navbarNavAltMarkup.render(<>
    <SelectPageProvider>
        <NavBarView />
        <PagesView />
    </SelectPageProvider>

</>)

