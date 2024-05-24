
import { Pagination } from "react-bootstrap"

export default function ProductsPaginator({page, setPage, maxPages}) {


    let items = []

    const handlePageChange =(e)=>{

        setPage(e);

    }

    for (let number = 0; number < maxPages; number++) {
        items.push(
            <Pagination.Item key={number + 1} onClick={() => handlePageChange(number)} active={number === page}>
                {number + 1}
            </Pagination.Item>,
        );
    }

    return (

        <>
            <Pagination>{items}</Pagination>
        </>
    );
}
