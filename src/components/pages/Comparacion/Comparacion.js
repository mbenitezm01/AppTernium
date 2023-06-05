import { useSearchParams, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { FichaComparacion } from './FichaComparacion';
import './Comparacion.css'

function Comparacion(){
    const [params, setParams] = useSearchParams();
    const [info, setInfo] = useState([]);
    const navigate = useNavigate();

    // Funcion que hace una peticion a la API y regresa toda la info personal
    const fetchInfoEmpleado = async () => {
        console.log('Request');
        const response1 = await axios.get(`${process.env.REACT_APP_API_HOST}/api/info-empleado/${params.get('ficha1')}`);
        const response2 = await axios.get(`${process.env.REACT_APP_API_HOST}/api/info-empleado/${params.get('ficha2')}`);
        if(response1.data.encontrado && response2.data.encontrado){
            setInfo([response1.data, response2.data]);
        }
    };

    // useEffect
    useEffect(() => {
        if(sessionStorage.length === 0) {
            localStorage.clear();
            navigate('/login');
        }
        fetchInfoEmpleado();
    }, []);

    return(
        <div className='comparacion'>
            <div className='left'>
                {info.length > 0 ? <FichaComparacion info={info[0]}/> : null}
            </div>
            <div className='right'>
                {info.length > 0 ? <FichaComparacion info={info[1]}/> : null}
            </div>
        </div>
    )
}
export default Comparacion;