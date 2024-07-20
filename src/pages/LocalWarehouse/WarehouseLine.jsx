
import { useLocalWarehousesProvider } from "../../contexts/LocalWarehousesProvider";
import { Button } from "react-bootstrap";

export default function WarehouseLine({warehouse,  children }) {

    const onClickOpen = (e)=>{

    }

    const getRoomsCount = ()=>{
        var count = 0;
        for(var key in warehouse.rooms) count++;
        return count;
    }


    return (<tr>
        <td>{warehouse.id}</td>
        <td>{warehouse.name}</td>
        <td>{getRoomsCount()}</td>
        <td>{warehouse.items}</td>
        <td> <Button variant="secondary" onClick={onClickOpen}>Открыть</Button>{' '}</td>
    </tr>)
}
