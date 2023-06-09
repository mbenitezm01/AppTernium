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
        console.log(process.env);
        const config = {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        }
        const data = {
            refreshToken: sessionStorage.getItem('refreshToken')
        }
        const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/empleados`, data, config);
        if(response.data.accessToken !== null) sessionStorage.setItem('accessToken', response.data.accessToken);
        setData(response.data.data);
    }, []);
    
    useEffect(() => {
        if(sessionStorage.length === 0){
            localStorage.clear();
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