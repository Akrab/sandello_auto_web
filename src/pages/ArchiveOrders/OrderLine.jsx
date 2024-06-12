import { GetOrderProductState } from "../../constants";
import { useOrdersProvider } from "../../contexts/OrdersProvider";

export default function OrderLine({ orderData, children }) {


    const {
        acceptTheOrderToProcess,
        acceptProcessOrder,
    } = useOrdersProvider();

    const getLogo = () => {
        if (orderData.marketplace === "ozon") return "./img/logo/LogoOzon_64x64.png"

        return "./img/logo/LogoNotFoundShop_66x60.png"
    }



    return (<tr>
        <td align="left"> <img
            src={getLogo()}
            height="20"
        /> {orderData.id}</td>
        <td align="center">{orderData.shop}</td>
        <td style={{ "word-break": "break-all", "width": "10%" }} align="center"> { GetOrderProductState(orderData.state)}</td>
        <td style={{ "word-break": "break-all", "width": "5%" }} align="center">{orderData.shippingDate}</td>
        <td style={{ "word-break": "break-all", "width": "35%" }} align="center">{orderData.name}</td>
        <td style={{ "word-break": "break-all", "width": "12%" }} align="center">{orderData.sku}</td>
        <td style={{ "width": "9%" }} align="center">{orderData.count}</td>
        <td style={{ "width": "9%" }} align="center">{orderData.price}</td>

    </tr>)
}