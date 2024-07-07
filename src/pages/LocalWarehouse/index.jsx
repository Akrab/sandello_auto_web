
import { React, useEffect } from "react";
import { Alert, Spinner, Container, Table, Form, Col, Row, Button } from "react-bootstrap";
import { useLocalWarehousesProvider } from "../../contexts/LocalWarehousesProvider";
import WarehouseLine from "./WarehouseLine";


export default function LocalWarehouse() {

    const {
        loadingStatus,
        load,
        warehouses,
    } = useLocalWarehousesProvider();

    useEffect(() => { load() }, []);

    const navigation = () => {
        return (<>
            <td> <Button variant="primary">Создать склад</Button>{' '}</td>
            <br></br></>)
    }


    const drawWarehouses = () => {
        return (<>
            {warehouses.map(warehouse => {
                return <WarehouseLine warehouse={warehouse} key={warehouse.id} />
            })}
        </>)
    }


    const drawLoad = () => {
        return (
            <div className="localwarehouse-page">
                <br></br>

                <Container>
                    <div align="center">
                        <h2 className="text-center">Загрузка  </h2><Spinner animation="border" variant="info" align="center" />

                    </div>

                </Container>

            </div>
        )
    }



    if (loadingStatus === "LOADING") return drawLoad();


    if (loadingStatus === "SUCCESS") return (<div className="localwarehouse-page">
        <Container>
            <br></br>
            {navigation()}
            <br></br>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Комнат</th>
                        <th>Товаров</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {drawWarehouses()}
                </tbody>
            </Table>

        </Container>

    </div>)



    return <div className="localwarehouse-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
}