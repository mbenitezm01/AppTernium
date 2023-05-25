import { useEffect, useState } from 'react';
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

    //const [empleado, setEmpleado] = useState(location.state.emplaedo.empleado || null);
    const [clienteproveedor, setClienteProveedor] = useState(location.state.empleado.clienteproveedor || null);
    const [upwardfeedback, setUpwardFeedback] = useState(location.state.empleado.upwardfeedback || null);
    const [trayectorialaboral, setTrayectoriaLaboral] = useState(location.state.empleado.trayectorialaboral || null);
    const [evaluacion, setEvaluacion] = useState(location.state.empleado.evaluacion || null);

    const handleCloseCreateModal = () => {
        setModal(false);
    };

    const handleOpenCreateModal = () => {
        setModal(true);
    };

    const handleSubmitCreate = async (tipo, dataObject) => {
        console.log(tipo, dataObject);
        // const { empleado_cet, fecha, nota, comentario} = req.body;
        if(location.state === null){
            return;
        }

        console.log('request');
        const response = await axios.post(`http://localhost:5050/api/${tipo}`, dataObject);
        console.log(response.data);
        if(response.data.creado){
            let updatedContent = null;
            console.log(response.data.data, tipo);
            switch(tipo){
                case 'upward-feedback':
                    updatedContent = [response.data.data, ...upwardfeedback];
                    setUpwardFeedback(updatedContent);
                    break;
                case 'cliente-proveedor':
                    updatedContent = [response.data.data, ...clienteproveedor];
                    setClienteProveedor(updatedContent);
                    break;
                case 'evaluacion':
                    updatedContent = [response.data.data, ...evaluacion];
                    setEvaluacion(updatedContent);
                    break;
                case 'trayectoria':
                    updatedContent = [response.data.data, ...trayectorialaboral];
                    setTrayectoriaLaboral(updatedContent);
                    break;
                // case 'proyeccion-puesto':
                //     updatedContent = [response.data.data, ...location.state.empleado.]
            }
        }
        setModal(false);
    };

    const handleDelete = async (tipo, id) => {
        if(location.state === null){
            return
        }

        console.log('Delete request');
        const response = await axios.delete(`http://localhost:5050/api/${tipo}/${id}`);
        console.log(response);
        if(response.data.borrado){
            let updatedContent;
            switch(tipo){
                case 'upward-feedback':
                    updatedContent = upwardfeedback.filter((data) => {
                        return data.id !== id;
                    });
                    setUpwardFeedback(updatedContent);
                    break;
                case 'cliente-proveedor':
                    updatedContent = clienteproveedor.filter((data) => {
                        return data.id !== id;
                    });
                    setClienteProveedor(updatedContent);
                case 'trayectoria':
                    updatedContent = trayectorialaboral.filter((data) => {
                        return data.id !== id;
                    });
                    setTrayectoriaLaboral(updatedContent);
                case 'evaluacion':
                    updatedContent = evaluacion.filter((data) => {
                        return data.id !== id;
                    });
                    setEvaluacion(updatedContent);
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
        if(upwardfeedback !== null){
            renderedItems = upwardfeedback.map((data) => {
                return <EditCardComentarios data={data} tipo='upward-feedback' handleDelete={handleDelete}/>
            });
        }
    }else if(editarView === 'cliente-proveedor'){
        if(clienteproveedor !== null){
            renderedItems = clienteproveedor.map((data) => {
                return <EditCardComentarios data={data} tipo='cliente-proveedor' handleDelete={handleDelete}/>
            });
        }
    }else if (editarView === 'evaluacion'){
        if(evaluacion !== null){
            renderedItems = evaluacion.map((data) => {
                return <EditCardEvaluacion data={data} tipo='evaluacion' handleDelete={handleDelete}/>
            });
        }
    }else if(editarView === 'trayectoria'){
        if(trayectorialaboral !== null){
            renderedItems = trayectorialaboral.map(data => {
                return <EditarCardTrayectoriaLaboral data={data} tipo='trayectoria' handleDelete={handleDelete}/>
            });
        }
    }else if(editarView === 'proyeccion-puesto'){
        // content = <PuestoProyeccionView />
    }

    return (
        <div className='editar-ficha'>
            <PerfilSideBar 
                setEditarView={setEditarView} 
                empleado={location.state.empleado.empleado} 
                cantClienteProveedor={clienteproveedor.length || 0} 
                cantUpwardFeedback={upwardfeedback.length || 0} 
                cantEvaluacion={evaluacion.length || 0} 
                cantTrayectoriaLaboral={trayectorialaboral.length || 0} 
                cantPuestoProyeccion={0}
            />
            <EditarListView renderedItems={renderedItems} tipo={editarView} openModal={handleOpenCreateModal}/>
            {modal ? <CreateModal tipo={editarView} handleSubmitCreate={handleSubmitCreate} closeModal={handleCloseCreateModal} cet={location.state !== null ? location.state.cet.id : null}/> : null}
        </div>
    );
};

export default Editar;