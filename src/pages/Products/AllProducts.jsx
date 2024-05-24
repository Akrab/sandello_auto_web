
import { Alert } from "react-bootstrap"
import { useProductsProvider } from "../../contexts/ProductsProvider"
import { useEffect } from "react";
export default function AllProducts() {

    const {} = useProductsProvider();

    useEffect(() => {console.log("AllProducts") }, []);

    return <div className="all-products-page">
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
}
