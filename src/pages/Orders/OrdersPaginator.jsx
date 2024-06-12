
import { Pagination } from "react-bootstrap"

export default function OrdersPaginator({ page, setPage, maxPages }) {


    let items = []

    const handlePageChange = (e) => {

        setPage(e);

    }

    items.push(<Pagination.First onClick={() => handlePageChange(0)} />)
    items.push(<Pagination.Prev onClick={() => handlePageChange(page - 1)} />)

    for (let number = 0; number < maxPages; number++) {
        items.push(
            <Pagination.Item key={number + 1} onClick={() => handlePageChange(number)} active={number === page}>
                {number + 1}
            </Pagination.Item>,
        );
    }

    items.push(<Pagination.Next onClick={() => handlePageChange(page + 1)} />)
    items.push(<Pagination.Last onClick={() => handlePageChange(maxPages - 1)} />)
    return (

        <>
            <Pagination>{items}</Pagination>
        </>
    );
}
