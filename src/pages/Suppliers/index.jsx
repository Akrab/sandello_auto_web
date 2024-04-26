
import React, { useEffect, useState } from "react";
import { Alert, Spinner, Container, Table, Button } from "react-bootstrap";
import { useSuppliersProvider } from "../../contexts/SuppliersProvider";
import SuppliersLine from "./SuppliersLine";
export default function Suppliers() {

    const {
        loadingStatus,
        suppliers,
        load,
        updateStatus,
        setUpdateStatus } = useSuppliersProvider();


    useEffect(() => { load() }, []);



    if (loadingStatus === "LOADING") return <div className="suppliers-page">
        <br></br>
        <h2 className="text-center">Загрузка</h2>
        <Spinner animation="border" variant="info" />
    </div>


    const drawSuppliers = () => {

        return (<>
            {suppliers.map(supplier => {
                return <SuppliersLine supplier={supplier} key={supplier.id} />
            })}
        </>)
    }


    if (loadingStatus === "SUCCESS") return (<div className="suppliers-page">
        <Container>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>e-mail</th>
                        <th>Описание</th>
                        <th>Статус(вкл/выкл)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {drawSuppliers()}
                </tbody>
            </Table>
            <br />
            <br />

        </Container>

    </div>)


    return <div className="suppliers-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>

};