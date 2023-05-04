//import { Link } from "react-router-dom"
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.js'
import Lista from './Lista.js'


//Importacion de estilos
import './Busqueda.css'

function Busqueda(){

    const [data, setData] = useState([]);

    const handleSubmit = useRef();

    const [filterState, setFilterState] = useState({
        name: '',
        cet: '',
        antMin: '',
        antMax: '',
        califMin: '',
        califMax: '',
        est3: '',
        est4: '',
        perf: '',
        jefe: '',
        pot: '',
        puesto: '',
        key: '',
    });

    
    const fetchList = useCallback(async () => {
        console.log('Request');
        const response = await axios.get(`http://localhost:5050/api/empleados`);
        setData(response.data);
    }, []);
    
    useEffect(() => {
        fetchList();
    }, [fetchList]);
    
    /*
    function handleSubmit(){
        console.log('datos:')
        console.log(filterState)
    }
    */

    return(
        <div className='view-container'>
            <Sidebar filterState={filterState} setFilterState={setFilterState} handleSubmit={handleSubmit}/>
            <Lista data={data} filtersState={filterState} handleSubmit={handleSubmit}/>
        </div>
    )
}
export default Busqueda