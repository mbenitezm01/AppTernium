import { useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.js'
import Lista from './Lista.js'


//Importacion de estilos
import './Busqueda.css'

function Busqueda(){
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const handleSubmit = useRef();

    const [filterState, setFilterState] = useState({
        name: '',
        cet: '',
        antMin: '',
        antMax: '',
        perfMin: '',
        perfMax: '',
        est3: '',
        est4: '',
        est5: '',
        jefe: '',
        puesto: '',
        key: '',
    });

    
    const fetchList = useCallback(async () => {
        console.log('Request');
        console.log(process.env)
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/empleados`);
        setData(response.data);
        

    }, []);
    
    useEffect(() => {
        if(localStorage.length === 0){
            navigate('/login');
        }
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
            <Sidebar filterState={filterState} setFilterState={setFilterState} handleSubmit={handleSubmit} data={data}/>
            <Lista data={data} filtersState={filterState} handleSubmit={handleSubmit}/>
        </div>
    )
}
export default Busqueda