import React from "react";

import { useState } from "react";
import { Nav, Container } from 'react-bootstrap/';
import AllProducts from "./AllProducts";
import UsedProducts from "./UsedProducts";
import { useProductsProvider } from "../../contexts/ProductsProvider";

export default function Products() {


    const {} = useProductsProvider();
    const [tab, setTab] = useState("used");

    const onSelectTab = (e) => {
        setTab(e.target.id)
    }

    const drawContent = () => {
        if (tab === "used") return (<><UsedProducts /> </>)
        if (tab === "all") return (<><AllProducts /> </>)
    }

    const TabsExample = () => {
        return (<>
            <br></br>
            <Nav variant="tabs" defaultActiveKey="used">
                <Nav.Item>
                    <Nav.Link eventKey="used" id="used" onClick={onSelectTab} >В Магазине</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="all" id="all" onClick={onSelectTab}>Все товары поставщиков</Nav.Link>
                </Nav.Item>
            </Nav></>
        );
    }

    return <main className="products-page">
        <Container>
            {TabsExample()}
            <br></br>
            {drawContent()}
        </Container>
    </main>
}