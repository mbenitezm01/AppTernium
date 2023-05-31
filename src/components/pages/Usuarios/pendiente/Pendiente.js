import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from '../componentes/Accordion';

function Pendiente() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.length === 0) navigate('/login');
        if(localStorage.getItem('tipo_usuario') === 'observador' || localStorage.getItem('tipo_usuario') === 'editor') navigate('/busqueda');
    }, []);
    return (
        <div className="pendiente" style={{maxHeight: '90vh', width: '100vw', overflowY: 'auto'}}>
            <Accordion/>
        </div>
    )
}

export default Pendiente