import { useEffect, useState } from 'react';
import './Editar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PerfilSideBar from './componentes/PerfilSideBar';
import EditarListView from './componentes/EditarListView';
import EditCardComentarios from './componentes/cards/EditCardComentarios';
import EditCardEvaluacion from './componentes/cards/EditCardEvaluacion';
// import ClienteProveedorView from './componentes/ClienteProveedorView';
// import UpwardFeedbackView from './componentes/UpwardFeedbackView';
// import EvaluacionView from './componentes/Evaluacion';
// import TrayectoriaLaboralView from './componentes/TrayectoriaLaboralView';
// import PuestoProyeccionView from './componentes/PuestoProyeccionView';

function Editar(){
    const [editarView, setEditarView] = useState('upward-feedback');
    const location = useLocation();
    const navigate = useNavigate();
    let content = null;

    useEffect(() => {
        if(location.state === null){
            navigate('/busqueda');
        }
    }, []);

    let renderedItems = null;
    if(editarView === 'upward-feedback'){
        // content = <UpwardFeedbackView />
        if(location.state !== null){
            renderedItems = location.state.empleado.upwardfeedback.map((data) => {
                return <EditCardComentarios data={data}/>
            });
        }
    }else if(editarView === 'cliente-proveedor'){
        if(location.state !== null){
            renderedItems = location.state.empleado.clienteproveedor.map((data) => {
                return <EditCardComentarios data={data}/>
            });
        }
        // content = <ClienteProveedorView />
    }else if (editarView === 'evaluacion'){
        if(location.state !== null){
            renderedItems = location.state.empleado.evaluacion.map((data) => {
                return <EditCardEvaluacion data={data}/>
            });
        }
        // content = <EvaluacionView />
    }else if(editarView === 'trayectoria'){
        // content = <TrayectoriaLaboralView />
    }else if(editarView === 'proyeccion-puesto'){
        // content = <PuestoProyeccionView />
    }
    console.log(location.state);
    content = <EditarListView renderedItems={renderedItems}/>


    return (
        <div className='editar-ficha'>
            <PerfilSideBar 
                setEditarView={setEditarView} 
                empleado={location.state !== null ? location.state.empleado.empleado : null} 
                cantClienteProveedor={location.state !== null ? location.state.empleado.clienteproveedor.length : 0} 
                cantUpwardFeedback={location.state !== null ? location.state.empleado.upwardfeedback.length : 0} 
                cantEvaluacion={location.state !== null ? location.state.empleado.evaluacion.length : 0} 
                cantTrayectoriaLaboral={location.state !== null ? location.state.empleado.trayectorialaboral.length : 0} 
                cantPuestoProyeccion={0}
            />
            <EditarListView renderedItems={renderedItems} editarView={editarView}/>
        </div>
    );
};

export default Editar;