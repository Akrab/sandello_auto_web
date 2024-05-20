
import Pagination from 'react-bootstrap/Pagination';

import { useHistoryImportPriceProvider } from '../../contexts/HistoryImportPriceProvider';

export default function PaginatorHistory({ childrens }) {

    const {
        currentPage,
        maxPages,
        loadPage,
    } = useHistoryImportPriceProvider();


    let items = [];
    const handlePageChange = (clickPage) => {
        loadPage(clickPage);
    }

    const renderPaginator = () => {

    }

    if (maxPages > 1 && maxPages < 30) {
        for (let number = 0; number < maxPages; number++) {
            items.push(
                <Pagination.Item key={number + 1} onClick={() => handlePageChange(number)} active={number === currentPage}>
                    {number + 1}
                </Pagination.Item>,
            );
        }
    }

    return (

        <>
            <Pagination>{items}</Pagination>
        </>
    );
}