import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useOrdersProvider } from '../../contexts/OrdersProvider';

function OrdersInPage() {

    const {
        ordersInPage,
        selectOrdersInPage } = useOrdersProvider();

    const select = (e) => {
        switch (e.target.id) {
            case "1": selectOrdersInPage(10); break;
            case "3": selectOrdersInPage(50); break;
            default: selectOrdersInPage(30)
        }
    }

    return (
        <DropdownButton id="dropdown-item-button" title={ordersInPage} onInput={select}>
            <Dropdown.Item id="1" as="button" onClick={select} >10</Dropdown.Item>
            <Dropdown.Item id="2" as="button" onClick={select}>30</Dropdown.Item>
            <Dropdown.Item id="3" as="button" onClick={select}>50</Dropdown.Item>
        </DropdownButton>
    );
}

export default OrdersInPage;