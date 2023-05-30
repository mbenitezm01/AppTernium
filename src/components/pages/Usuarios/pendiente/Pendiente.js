import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from '../componentes/Accordion';

function Pendiente() {
    const [data, setData] = useState([]);

    const fetchPendientes = async () => {
        try{
            const response = await axios.get('http://localhost:5050/api/pendiente');
            setData(response.data);
        }catch{
            alert('Error en el sistema, volver a intentar');
        }

    };

    useEffect(() => {
        fetchPendientes();
    }, []);

    return (
        <div style={{maxHeight: '80vh', width: '80vw', overflowY: 'auto'}}>
            <Accordion items={data}/>
        </div>
    )
}

export default Pendiente