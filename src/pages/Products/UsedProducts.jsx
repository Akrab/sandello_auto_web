
import { Alert } from "react-bootstrap"
import ProductsPaginator from "./ProductsPaginator"
import { useProductsProvider } from "../../contexts/ProductsProvider"
import { useState } from "react";
import { useEffect } from "react";

export default function UsedProducts() {

    const [page, setPage] = useState(0);
    const [maxPages, setMaxPages] = useState(10);
    const {} = useProductsProvider();

    useEffect(() => {console.log("UsedProducts") }, []);

    return <div className="used-products-page">
        <Alert key='todo' variant='info' >
            Упс! Скоро будет:)
        </Alert>
        <ProductsPaginator page={page} setPage={setPage} maxPages={maxPages} />
    </div>
}
