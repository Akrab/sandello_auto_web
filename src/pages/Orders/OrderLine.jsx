import { Button, Spinner} from "react-bootstrap"

import { GetOrderProductState } from "../../constants";
import { useOrdersProvider } from "../../contexts/OrdersProvider";

export default function OrderLine({ orderData, children }) {


    const {
        acceptTheOrderToProcess,
        acceptProcessOrder,
    } = useOrdersProvider();

    const inProcessOnClick = (e) => {
        console.log(orderData)
        var data = {
            id: orderData.id,
            productId: orderData.productId
        }
        acceptTheOrderToProcess(data)
    }

    const getLogo = () => {
        if (orderData.marketplace === "ozon") return "./img/logo/LogoOzon_64x64.png"

        return "./img/logo/LogoNotFoundShop_66x60.png"
    }

    const drawWarehouseSellers = () => {
        //  <span style={{ "background-color": "#f4735230" }} >
        return (<>
            {orderData.warehouseSellers.map(item => {
                if (item.count <= 0)
                    return <>    <span class="text-black-50"> {item.name + " " + item.price + " x" + item.count}</span> <br /> </>
                return <>   <span class="text-success">{item.name + " " + item.price + " x" + item.count}</span><br /> </>
            })}
        </>)

    }


    const drawAcceptToProcessBtn = () => {
        var stateText = GetOrderProductState(orderData.state)
        return <><span>{stateText} <br /> <br />
            <Button variant="success" size="sm" onClick={inProcessOnClick}>В обработку</Button>{' '}
        </span> </>
    }

    const drawOrderState = () => {
      
        var stateText = GetOrderProductState(orderData.state)
        if (orderData.state == 0) {

            var processOrder = acceptProcessOrder[orderData.id]


            if (processOrder == null) {
                return drawAcceptToProcessBtn();
            }

            if (processOrder[orderData.productId] == null) {
                return drawAcceptToProcessBtn();
            }

            return <><span>{stateText} <br /> <br />
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                   Обновление...
                </Button>{' '}
            </span> </>

        }

        return <>{stateText}</>
    }


    return (<tr>
        <td align="left"> <img
            src={getLogo()}
            height="20"
        /> {orderData.id}</td>
        <td align="center">{orderData.shop}</td>
        <td style={{ "word-break": "break-all", "width": "10%" }} align="center"> {drawOrderState()}</td>
        <td style={{ "word-break": "break-all", "width": "5%" }} align="center">{orderData.shippingDate}</td>
        <td style={{ "word-break": "break-all", "width": "15%" }} align="center">{orderData.name}</td>
        <td style={{ "word-break": "break-all", "width": "12%" }} align="center">{orderData.sku}</td>
        <td style={{ "width": "9%" }} align="center">{orderData.count}</td>
        <td style={{ "width": "9%" }} align="center">{orderData.price}</td>
        <td style={{ "font-size": "90%" }} align="left"> {drawWarehouseSellers()}

        </td>

    </tr>)
}