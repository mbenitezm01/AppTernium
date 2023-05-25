import { useEffect, useState } from 'react';
import axios from 'axios';
import './Editar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PerfilSideBar from './componentes/PerfilSideBar';
import EditarListView from './componentes/EditarListView';
import CardComentarios from './componentes/cards/CardComentarios';
import CardEvaluacion from './componentes/cards/CardEvaluacion';
import CardTrayectoriaLaboral from './componentes/cards/CardTrayectoriaLaboral';
import CreateModal from './componentes/modals/CreateModal';
import EditModal from './componentes/modals/EditModal';

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
    const [editModal, setEditModal] = useState(false);
    let content = null;

    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    //const [empleado, setEmpleado] = useState(location.state.emplaedo.empleado || null);
    const [clienteproveedor, setClienteProveedor] = useState(null);
    const [upwardfeedback, setUpwardFeedback] = useState(null);
    const [trayectorialaboral, setTrayectoriaLaboral] = useState(null);
    const [evaluacion, setEvaluacion] = useState(null);
    const [contentEdit, setContentEdit] = useState(null);

    const handleCloseCreateModal = () => {
        setModal(false);
    };

    const handleOpenCreateModal = () => {
        setModal(true);
    };

    const handleCloseEditModal = () => {
        setEditModal(false);
    }

    const handleOpenEditModal = (tipo, id) => {
        switch(tipo){
            case 'upward-feedback':
                content = upwardfeedback.filter((data) => {
                    return data.id === id;
                });
                setContentEdit(content);
                break;
            case 'cliente-proveedor':
                content = clienteproveedor.filter((data) => {
                    return data.id === id;
                });
                setContentEdit(content);
                break;
            case 'trayectoria':
                content = trayectorialaboral.filter((data) => {
                    return data.id === id;
                });
                setContentEdit(content);
                break;
            case 'evaluacion':
                content = evaluacion.filter((data) => {
                    return data.id === id;
                });
                setContentEdit(content);
                break;
        }
        setEditModal(true);
    }

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
        console.log(tipo, id)
        const response = await axios.delete(`http://localhost:5050/api/${tipo}/${id}`);
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
    };

    const handleEdit = async (tipo, dataObject) => {
        console.log('Edit Request');
        const response = await axios.patch(`http://localhost:5050/api/${tipo}`, dataObject);

        if(response.data.editado){
            let updatedContent;
            switch(tipo){
                case 'upward-feedback':
                    updatedContent = upwardfeedback.map(data => {
                        if(data.id === dataObject.id){
                            return {...data, ...dataObject}
                        }
                        return data;
                    });
                    setUpwardFeedback(updatedContent);
                    break;
                case 'cliente-proveedor':
                    updatedContent = clienteproveedor.map(data => {
                        if(data.id === dataObject.id){
                            return {...data, ...dataObject}
                        }
                        return data;
                    });                    
                    setClienteProveedor(updatedContent);
                    break;
                case 'evaluacion':
                    updatedContent = evaluacion.map(data => {
                        if(data.id === dataObject.id){
                            console.log(dataObject);
                            return {...data, ...dataObject}
                        }
                        return data;
                    });
                    setEvaluacion(updatedContent);
                    break;
                case 'trayectoria':
                    updatedContent = trayectorialaboral.map(data => {
                        if(data.id === dataObject.id){
                            return {...data, ...dataObject}
                        }
                        return data;
                    });
                    setTrayectoriaLaboral(updatedContent);
                    break;
                // case 'proyeccion-puesto':
                //     updatedContent = [response.data.data, ...location.state.empleado.]
            }

        }
        setEditModal(false);
    };

    const fetchInfoEmpleado = async () => {
        console.log('Request');
        const response = await axios.get(`http://localhost:5050/api/info-empleado/${location.state.cet.id}`);
        setClienteProveedor(response.data.clienteproveedor);
        setTrayectoriaLaboral(response.data.trayectorialaboral);
        setUpwardFeedback(response.data.upwardfeedback);
        setEvaluacion(response.data.evaluacion);
    };
    useEffect(() => {
        if(location.state === null){
            navigate('/busqueda');
        }

        fetchInfoEmpleado();
        
    }, []);

    let renderedItems = null;
    if(editarView === 'upward-feedback'){
        if(upwardfeedback !== null){
            renderedItems = upwardfeedback.map((data) => {
                return <CardComentarios data={data} tipo='upward-feedback' handleDelete={handleDelete} handleClickEdit={handleOpenEditModal}/>
            });
        }
    }else if(editarView === 'cliente-proveedor'){
        if(clienteproveedor !== null){
            renderedItems = clienteproveedor.map((data) => {
                return <CardComentarios data={data} tipo='cliente-proveedor' handleDelete={handleDelete} handleClickEdit={handleOpenEditModal}/>
            });
        }
    }else if (editarView === 'evaluacion'){
        if(evaluacion !== null){
            renderedItems = evaluacion.map((data) => {
                return <CardEvaluacion data={data} tipo='evaluacion' handleDelete={handleDelete} handleClickEdit={handleOpenEditModal}/>
            });
        }
    }else if(editarView === 'trayectoria'){
        if(trayectorialaboral !== null){
            renderedItems = trayectorialaboral.map(data => {
                return <CardTrayectoriaLaboral data={data} tipo='trayectoria' handleDelete={handleDelete} handleClickEdit={handleOpenEditModal}/>
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
                cantClienteProveedor={clienteproveedor !== null ? clienteproveedor.length : 0} 
                cantUpwardFeedback={upwardfeedback !== null ?  upwardfeedback.length : 0} 
                cantEvaluacion={evaluacion !== null ? evaluacion.length : 0} 
                cantTrayectoriaLaboral={trayectorialaboral !== null ?  trayectorialaboral.length : 0} 
                cantPuestoProyeccion={0}
            />
            <EditarListView renderedItems={renderedItems} tipo={editarView} openModal={handleOpenCreateModal}/>
            {modal ? <CreateModal tipo={editarView} handleSubmitCreate={handleSubmitCreate} closeModal={handleCloseCreateModal} cet={location.state !== null ? location.state.cet.id : null}/> : null}
            {editModal ? <EditModal tipo={editarView} data={contentEdit} handleSubmitCreate={handleEdit} closeModal={handleCloseEditModal} /> : null}
        </div>
    );
};

export default Editar;