import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from '../componentes/Accordion';

function Pendiente() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(sessionStorage.length === 0) {
            localStorage.clear();
            navigate('/login');
        }
        if(localStorage.getItem('tipo_usuario') === 'observador' || localStorage.getItem('tipo_usuario') === 'editor') navigate('/busqueda');
    }, []);
    return (
        <div className="pendiente">
            <Accordion/>
        </div>
    )
}

export default Pendiente