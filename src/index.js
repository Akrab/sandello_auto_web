import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBarView from './components/navBarView';
import RootView from './components/root';
import Container from 'react-bootstrap/Container';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = { currentPage: 0 }
        this.selectPage = this.selectPage.bind(this)
    }

    selectPage(page) {
        this.setState({ currentPage: page })
    }

    render() {
        return (

            <div>
                <NavBarView selectPage={this.selectPage} />
                <RootView currentPage={this.state.currentPage} />

            </div>
        )
    }

}

const navbarNavAltMarkup = ReactDOM.createRoot(document.getElementById('root'));
navbarNavAltMarkup.render(<App />)

