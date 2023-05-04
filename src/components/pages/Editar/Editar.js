import { useEffect } from 'react';
import './Editar.css';
import { useLocation } from 'react-router-dom';

function Editar(){
    const location = useLocation();
    console.log(location.state);
    useEffect(() =>{
        // Verificar que el cet (id) del local storage no sea igual al cet del 
        // empleado que se envio por useLocation
    }, []);
    
    return (
        <div>
            Editar
        </div>
    );
};

export default Editar;