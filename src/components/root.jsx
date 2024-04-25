import Container from 'react-bootstrap/Container';

import HistoryImportPrice from '../pages/HistoryImportPrice';
import Brands from '../pages/Brands';
import Suppliers from '../pages/Suppliers';
import Surcharges from '../pages/Surcharges';
import React, { useContext, useState } from 'react';
import { SelectPageContext } from '../providers/SelectPageProvider';
import Main from '../pages/Main';

export default function PagesView() {

    const [page, setPage] = useContext(SelectPageContext);

    if (page === "home") return <Main />
    if (page === "brands") return <Brands />
    if (page === "suppliers") return <Suppliers />
    if (page === "surcharges") return <Surcharges />
    if (page === "historyImportPrice") return <HistoryImportPrice />

    return (<>
        <Container><div><h1> {page}</h1></div></Container>
    </>)

}


