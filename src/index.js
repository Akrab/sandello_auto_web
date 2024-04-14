import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBarView from './components/navBarView';
import RootView from './components/root';

class App extends React.Component {

    constructor(props) {
        super(props)
        var page =  props.pathname.slice(1, props.pathname.length) 
        this.state = { currentPage:  page }
        this.selectPage = this.selectPage.bind(this)
    }

    selectPage(page) {
        this.setState({ currentPage: page })
    }

    render() {
        return (

            <div>
                <NavBarView currentPage = {this.state.currentPage} selectPage={this.selectPage} />
                <RootView currentPage={this.state.currentPage} />

            </div>
        )
    }

}

const navbarNavAltMarkup = ReactDOM.createRoot(document.getElementById('root'));
navbarNavAltMarkup.render(<App pathname={window.location.pathname} />)

