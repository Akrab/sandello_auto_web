import { Form, Button, ListGroup } from "react-bootstrap"
import { useState } from "react";

export default function OrderLine({ orderData, children }) {



    const getLogo = () => {
        if (orderData.marketplace === "ozon") return "./img/logo/LogoOzon_64x64.png"

        return "./img/logo/LogoNotFoundShop_66x60.png"
    }

    const drawWarehouseSellers = () => {

        return (<>
            {orderData.warehouseSellers.map(item => {
                if (item.count <= 0)
                    return <>   <span style={{ "background-color": "#f4735230" }} >{item.name + " " + item.price + " x" + item.count}</span><br /> </>
                return <>   <span>{item.name + " " + item.price + " x" + item.count}</span><br /> </>
            })}
        </>)

    }


    return (<tr>
        {/* style={{"background-color": "#f4735230"}} */}
        <td> <img
            src={getLogo()}
            height="20"
        /> {orderData.id}</td>
        <td>{orderData.shop}</td>
        <td style={{ "word-break": "break-all", "width": "10%" }}>{orderData.state}</td>
        <td>{orderData.shipping_date}</td>
        <td style={{ "word-break": "break-all", "width": "15%" }}>{orderData.name}</td>
        <td>{orderData.sku}</td>
        <td style={{ "width": "9%" }}>{orderData.count}</td>
        <td style={{ "width": "9%" }}>{orderData.price}</td>
        <td style={{ "font-size": "90%" }}> {drawWarehouseSellers()}

        </td>

    </tr>)
}