import React from 'react';
import Container from 'react-bootstrap/Container';

import Brands from './brandsView/brands';

class RootView extends React.Component {

    render() {
        return (
            <Container>
                <Brands />
            </Container>)
    }
}

export default RootView