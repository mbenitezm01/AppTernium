import { useSearchParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { FichaComparacion } from './FichaComparacion';
import './Comparacion.css'

function Comparacion(){
    const [params, setParams] = useSearchParams();
    const [info, setInfo] = useState([]);

    // Funcion que hace una peticion a la API y regresa toda la info personal
    const fetchInfoEmpleado = async () => {
        console.log('Request');
        const response1 = await axios.get(`http://localhost:5050/api/info-empleado/${params.get('ficha1')}`);
        const response2 = await axios.get(`http://localhost:5050/api/info-empleado/${params.get('ficha2')}`);
        if(response1.data.encontrado && response2.data.encontrado){
            setInfo([response1.data, response2.data]);
        }
    };

    // useEffect
    useEffect(() => {
        fetchInfoEmpleado();
    }, []);

    return(
        <div className='comparacion'>
            {info.length > 0 ? <FichaComparacion info={info[0]}/> : null}
            {info.length > 0 ? <FichaComparacion info={info[1]}/> : null}
        </div>
    )
}
export default Comparacion;