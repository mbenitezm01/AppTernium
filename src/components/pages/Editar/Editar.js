import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Editar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PerfilSideBar from './componentes/PerfilSideBar';
import EditarListView from './componentes/EditarListView';
import EditCardComentarios from './componentes/cards/EditCardComentarios';
import EditCardEvaluacion from './componentes/cards/EditCardEvaluacion';
import EditarCardTrayectoriaLaboral from './componentes/cards/EditarCardTrayectoriaLaboral';
import CreateModal from './componentes/modals/CreateModal';

// function agregarComentario(tipo, comentario, nota){
//     switch(tipo){
//         case 'upward-feedback':
//             const updatedContent = [{}]
//             location.state
//     }
// }


function Editar(){
    const [editarView, setEditarView] = useState('upward-feedback');
    const [modal, setModal] = useState(false);
    let content = null;

    const location = useLocation();
    const navigate = useNavigate();

    const handleCloseCreateModal = () => {
        setModal(false);
    };

    const handleOpenCreateModal = () => {
        setModal(true);
    };

    const handleSubmitCreate = async (tipo, dataObject) => {
        // const { empleado_cet, fecha, nota, comentario} = req.body;
        if(location.state === null){
            return;
        }
        console.log('request');
        const response = await axios.post(`http://localhost:5050/api/${tipo}`, dataObject);
        console.log(response.data);
        if(response.data.creado){
            let updatedContent;
            switch(tipo){
                case 'upward-feedback':
                    updatedContent = [response.data.data, ...location.state.empleado.upwardfeedback];
                    location.state.empleado.upwardfeedback = updatedContent;
                case 'cliente-proveedor':
                    updatedContent = [response.data.data, ...location.state.empleado.clienteproveedor];
                    location.state.empleado.clienteproveedor = updatedContent;
                case 'evaluacion':
                    updatedContent = [response.data.data, ...location.state.empleado.evaluacion];
                    location.state.empleado.evaluacion = updatedContent;
            }
        }
        setModal(false);
    };

    useEffect(() => {
        if(location.state === null){
            navigate('/busqueda');
        }
    }, []);

    let renderedItems = null;
    if(editarView === 'upward-feedback'){
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
    }else if (editarView === 'evaluacion'){
        if(location.state !== null){
            renderedItems = location.state.empleado.evaluacion.map((data) => {
                return <EditCardEvaluacion data={data}/>
            });
        }
    }else if(editarView === 'trayectoria'){
        if(location.state !== null){
            renderedItems = location.state.empleado.trayectorialaboral.map(data => {
                return <EditarCardTrayectoriaLaboral data={data}/>
            });
        }
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
            <EditarListView renderedItems={renderedItems} tipo={editarView} openModal={handleOpenCreateModal}/>
            {modal ? <CreateModal tipo={editarView} handleSubmitCreate={handleSubmitCreate} closeModal={handleCloseCreateModal} cet={location.state !== null ? location.state.cet.id : null}/> : null}
        </div>
    );
};

export default Editar;