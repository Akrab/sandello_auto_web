
import React, { useState, useEffect, createContext} from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import BrandLineItem from "./brandLineItem";
import { SetBrandsProvider } from "../../providers/SetBrandsProvider";


export default function Brands() {
    const [loadingStatus, setLoadingStatus] = useState("LOADING");

    let items = [];
    async function load() {
        // setLoadingStatus("LOADING");
        // const getInfoResponse = await getInfo();

        // if (getInfoResponse?.status === "error") { }; // return setLoadingStatus("ERROR"); Заккоментировал так как не будет работать
        // setInfo(getInfoResponse?.result);
        // console.log(info);
        // setLoadingStatus("SUCCESS");
    };


    useEffect(() => {
        load()
    }, []);



    const loading = () => {
        if (loadingStatus == "LOADING") {
            return (<div align="center"> <Spinner animation="border" role="status" variant="info" >
                <span className="visually-hidden" >Loading...</span>
            </Spinner> </div>)
        }
    }

    const alert = () => {

        if (loadingStatus == "ERROR")
            return (<Alert key={"danger"} variant={'danger'}>
                В результате загрузки что-то пошло не так;(
            </Alert>)
    }

    const buttons = () => {

        if (loadingStatus == "ERROR") return;
        let count = 0;
        // var count = Object.keys(this.state.updated).length

        if (count == 0) {
            return <div align="right" >
                <Button variant="secondary">Сохранить</Button>{' '}
            </div>
        }

        return <div align="right" >
            <Button variant="primary" >Сохранить</Button>{' '}
        </div>

    }

    return (<Container>

        <Table responsive="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Статус(вкл/выкл)</th>

                </tr>
            </thead>
            <tbody>
                <BrandLineItem id_switch="11" id='1' title="1234r"  enabled = "true" />
                <BrandLineItem id_switch="121" id='2' title="1231qwa"  enabled = "false"/>
                {/* {this.state.brands.map((item, index) =>
                    < BrandLineItem item={item} key={index} onSelect={this.clickUpdateElentHandler} />
                )} */}

            </tbody>
        </Table>

        {/* {loading()}
        {alert()} */}
        {buttons()}

        <br />
    </Container>)

}