import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBarView from './components/navBarView';
import RootView from './components/root';

function App() {

    return (
        <div>
        <NavBarView/>    
         <RootView/>
        </div>
    )

}

const navbarNavAltMarkup = ReactDOM.createRoot(document.getElementById('root'));
navbarNavAltMarkup.render(<App></App>)

