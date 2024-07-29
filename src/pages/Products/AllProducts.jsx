
import { Alert, Container, OverlayTrigger, Tooltip, InputGroup, Spinner, Button, Table, Row, Col, Form } from "react-bootstrap"
import { useProductsProvider } from "../../contexts/ProductsProvider"
import { useEffect, useState } from "react";
import AdvancePaginator from "../../components/AdvancePaginator";

export default function AllProducts() {

    const { loadingStatus, LoadAllProducts, LoadByData, currentPage,
        maxPage, products } = useProductsProvider();

    const [update, setUpdate] = useState("");
    const [filterSku, setFilterSku] = useState("");
    const [filterName, setFilterName] = useState("");


    useEffect(() => {
        setFilterSku("")
        setFilterName("")
        LoadAllProducts(filterSku, filterName);
    }, []);


    const getRandomStr = () => {
        return (Math.random() + 1).toString(36).substring(7);
    }

    const onSetPage = (page) => {
        LoadByData(filterSku, filterName, page, () => {
            setUpdate(getRandomStr());
        });

    }

    const onChangeFilterSKU = (value) => {

        if (isLock()) return
        setFilterSku(value);
        if (value.length >= 3) {
            LoadByData(value, filterName, currentPage, () => {
                setUpdate(getRandomStr());
            });
        }
    }

    const onChangeFilterName = (value) => {
        if (isLock()) return
        setFilterName(value);
        if (value.length >= 3) {
            LoadByData(filterSku, value, currentPage, () => {
                setUpdate(getRandomStr());
            });
        }
    }

    const drawProducts = () => {

        return (<>
            {products.map(item => {
                return (<>
                    <tr >
                        <td style={{ "word-break": "break-all", "width": "8%" }} align="left">
                            {item.id}
                        </td >
                        <td style={{ "word-break": "break-all" }} align="center">{item.sku}</td>
                        <td style={{ "word-break": "break-word" }} align="center">
                            {item.brandName.name}
                        </td>
                        <td style={{}} align="center">
                            <OverlayTrigger
                                key={item.id}
                                placement="auto"

                                overlay={
                                    <Tooltip id={"tooltip"} >
                                        <strong>{item.product_name}</strong>
                                    </Tooltip>
                                }
                            >
                                <td > {item.product_name.length > 40 ? item.product_name.substring(0, 40) + "..." : item.product_name}</td>
                            </OverlayTrigger></td>
                        <td style={{}} align="center">                 <OverlayTrigger
                            key={item.id}
                            placement="auto"

                            overlay={
                                <Tooltip id={"tooltip"} >
                                    <strong>{item.applicability}</strong>
                                </Tooltip>
                            }
                        >
                            <td > {item.applicability.length > 40 ? item.applicability.substring(0, 40) + "..." : item.applicability}</td>
                        </OverlayTrigger></td>

                    </tr >
                </>)
            })}
        </>)

    }

    const isLock = () => {
        return loadingStatus != "SUCCESS";
    }

    const loadingSpinner = () => {
        if (loadingStatus != "LOADING") return

        return (<>
            <Spinner animation="grow" />
        </>)

    }

    const navigation = () => {

        return (<>

            <Row>
                <Col xs={6} md={3}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
                            <Form.Label column sm={3} style={{ "word-break": "break-all" }}>
                                SKU/Бренд
                            </Form.Label>
                            <Col xs="auto">
                                <Form.Control type="text" placeholder="Введите для поиска" value={filterSku} onChange={e => { onChangeFilterSKU(e.target.value) }}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={6} md={3}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
                            <Form.Label column sm={3}>
                                Название
                            </Form.Label>
                            <Col xs="auto">
                                <Form.Control type="text" placeholder="Введите для поиска" value={filterName} onChange={e => { onChangeFilterName(e.target.value) }}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>

                <Col xs={6} md={3}>
                    <Button href="/products/add" className="mb-2">
                        Добавить Товар 
                    </Button> 
    
                </Col>
                <Col xs={6} md={3}>
                    {loadingSpinner()}
                </Col>
            </Row>
        </>)

    }


    if (loadingStatus != "ERROR") return (<div className="localwarehouses-products-page">
        <Container>

            {navigation()}
            <br></br>
            <Table responsive="sm">
                <thead>
                    <tr >
                        <th align="left" > <p style={{ "text-align": "left" }}>ID</p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}>SKU
                        </p>

                        </th>
                        <th align="center"> <p style={{ "text-align": "center" }}>Бренд</p>

                        </th>

                        <th align="center"> <p style={{ "text-align": "center" }}>Наименование</p>
                        </th>
                        <th align="center"> <p style={{ "text-align": "center" }}>Описание</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {drawProducts()}
                </tbody>
            </Table>

            <AdvancePaginator page={currentPage} setPage={onSetPage} maxPages={maxPage} isLock={isLock()} />

        </Container>

    </div>)

    return <div className="all-products-page">
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
}
