
import { useLocalWarehousesProvider } from "../../contexts/LocalWarehousesProvider";
import { Button } from "react-bootstrap";

export default function WarehouseLine({warehouse,  children }) {

    const onClickOpen = (e)=>{

    }


    return (<tr>
        <td>{warehouse.id}</td>
        <td>{warehouse.name}</td>
        <td>{warehouse.rooms}</td>
        <td>{warehouse.products}</td>
        <td> <Button variant="secondary" onClick={onClickOpen}>Открыть</Button>{' '}</td>
    </tr>)
}
