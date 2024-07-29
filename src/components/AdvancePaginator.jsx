
import { Pagination } from "react-bootstrap"
import _ from "lodash";

export default function AdvancePaginator({ page, setPage, maxPages, isLock }) {

    let items = []
    let _maxPages = parseInt(maxPages)
    let _page = parseInt(page)

    if (isLock == null) isLock = false;

    const handlePageChange = (e) => {
        setPage(parseInt(e));
    }

    const handlePageFirst = (e) => {
        setPage(0);
    }

    const handlePagePrev = (e) => {

        if (_page > 0)
            setPage(_page - 1);
    }

    const handlePageNext = (e) => {
        if (_page <= maxPages - 1)
            setPage(_page + 1);
    }

    const handlePageLast = (e) => {
        setPage(maxPages - 1);
    }

    const returnPaginationRange = () => {
        var sublings = 2;
        let totalPageNoInArra = sublings + 5;

        if (totalPageNoInArra >= _maxPages) {
            return _.range(1, _maxPages + 1)
        }

        let leftSiblingIndex = Math.max(page - sublings, 1)
        let rightSiblingIndex = Math.min(page + sublings, _maxPages);
        let shouldShowLeftDots = leftSiblingIndex > 2;
        let shouldShowRightDots = rightSiblingIndex < _maxPages - 2;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemsCount = 3 + 2 * sublings;
            let leftRange = _.range(1, leftItemsCount + 1)
            return [...leftRange, "...", _maxPages]
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemsCount = 3 + 2 * sublings;
            let rightRange = _.range(_maxPages - rightItemsCount + 1, _maxPages + 1)
            return [1, "...", ...rightRange];
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = _.range(leftSiblingIndex, rightSiblingIndex + 1)
            return [1, "...", ...middleRange, "...", _maxPages]
        }
    }



    items.push(
        <Pagination.First onClick={() => handlePageFirst()} disabled={isLock} />
    );

    items.push(
        <Pagination.Prev onClick={() => handlePagePrev()} disabled={isLock} />
    );

    var array = returnPaginationRange();

    array.map(value => {
        if (value == "...") {

            items.push(<Pagination.Ellipsis />);
            return;
        }

        items.push(
            <Pagination.Item key={value} onClick={() => handlePageChange(value - 1)} active={value - 1 == _page} disabled={isLock}>
                {value}
            </Pagination.Item>

        );

    });

    items.push(
        <Pagination.Next onClick={() => handlePageNext()} disabled={isLock} />
    );

    items.push(
        <Pagination.Last onClick={() => handlePageLast()} disabled={isLock} />
    );

    return (
        <>
            <Pagination>{items}</Pagination>
        </>
    );
}
