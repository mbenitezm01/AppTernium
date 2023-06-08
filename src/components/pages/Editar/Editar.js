import { useEffect, useState } from 'react';
import axios from 'axios';
import './Editar.css';
import { useNavigate, useParams } from 'react-router-dom';
import PerfilSideBar from './componentes/PerfilSideBar';
import EditarListView from './componentes/EditarListView';
import CardComentarios from './componentes/cards/CardComentarios';
import CardEvaluacion from './componentes/cards/CardEvaluacion';
import CardTrayectoriaLaboral from './componentes/cards/CardTrayectoriaLaboral';
import CreateModal from './componentes/modals/CreateModal';
import EditModal from './componentes/modals/EditModal';
import DeleteModal from './componentes/modals/BorrarModal';
import CardPuestoProyeccion from './componentes/cards/CardPuestoProyeccion';
import CardInfoPersonal from './componentes/cards/CardInfoPersonal';

function Editar(){
    const [editarView, setEditarView] = useState('upward-feedback');
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    let content = null;
    const { id } = useParams();
    const navigate = useNavigate();
    const [clienteproveedor, setClienteProveedor] = useState(null);
    const [upwardfeedback, setUpwardFeedback] = useState(null);
    const [trayectorialaboral, setTrayectoriaLaboral] = useState(null);
    const [evaluacion, setEvaluacion] = useState(null);
    const [puestoproyeccion, setPuestoProyeccion] = useState(null);
    const [infoPersonal, setInfoPersonal] = useState(null);
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
        console.log(tipo);
        switch(tipo){
            case 'upward-feedback':
                content = upwardfeedback.filter((data) => {
                    return data.id === id;
                });
                console.log(content);
                setContentEdit(content);
                break;
            case 'cliente-proveedor':
                console.log(content);
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
            case 'puesto-proyeccion':
                content = puestoproyeccion.filter((data) => {
                    return data.id === id;
                });
                setContentEdit(content);
                break;
            case 'info-personal':
                setContentEdit([infoPersonal]);
        }
        setEditModal(true);
    }

    const handleSubmitCreate = async (tipo, dataObject) => {
        console.log(tipo, dataObject);
        console.log('Create request');


        if(localStorage.getItem('tipo_usuario') === 'editor'){            
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/pendiente`, {
                data: JSON.stringify(dataObject),
                id_usuario: parseInt(localStorage.getItem('id_usuario')),
                empleado_cet: parseInt(localStorage.getItem('cet')),
                tabla: editarView,
                metodo: 'crear'
            })
            alert('Se ha notificado al administrador y se va a evaluar tu comentario');
        }else if(localStorage.getItem('tipo_usuario') === 'administrador'){
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/${tipo}`, dataObject);
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
                    case 'puesto-proyeccion':
                        updatedContent = [response.data.data, ...puestoproyeccion];
                        setPuestoProyeccion(updatedContent);
                        break;
                }
            }
        }else if(localStorage.getItem('tipo_usuario') === 'observador'){
            alert('Usted es solo observador')
            return;
        }    
        setModal(false);
    };

    const handleDelete = async (tipo, id) => {
        console.log('Delete request');
        console.log(tipo, id)
        if(localStorage.getItem('tipo_usuario') === 'editor'){
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/pendiente`, {
                data: `{"id": ${id}}`,
                id_usuario: parseInt(localStorage.getItem('id_usuario')),
                empleado_cet: parseInt(localStorage.getItem('cet')),
                tabla: editarView,
                metodo: 'borrar'
            });
            alert('Se ha notificado al administrador y se va a evaluar tu comentario');
        }else if(localStorage.getItem('tipo_usuario') === 'administrador'){
            const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/api/${tipo}/${id}`);
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
                        break;
                    case 'trayectoria':
                        updatedContent = trayectorialaboral.filter((data) => {
                            return data.id !== id;
                        });
                        setTrayectoriaLaboral(updatedContent);
                        break;
                    case 'evaluacion':
                        updatedContent = evaluacion.filter((data) => {
                            return data.id !== id;
                        });
                        setEvaluacion(updatedContent);
                        break;
                    case 'puesto-proyeccion':
                        updatedContent = puestoproyeccion.filter((data) => {
                            return data.id !== id;
                        });
                        setPuestoProyeccion(updatedContent);
                }
            }
        }else if(localStorage.getItem('tipo_usuario') === 'observador'){
            alert('Usted es solo observador')
        }
        
    };

    const handleEdit = async (tipo, dataObject) => {
        console.log('Edit Request');
        if(localStorage.getItem('tipo_usuario') === 'editor'){
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/pendiente`, {
                data: JSON.stringify(dataObject),
                id_usuario: parseInt(localStorage.getItem('id_usuario')),
                empleado_cet: parseInt(localStorage.getItem('cet')),
                tabla: editarView,
                metodo: 'editar'
            });
            alert('Se ha notificado al administrador y se va a evaluar tu comentario');
        }else if(localStorage.getItem('tipo_usuario') === 'administrador'){
            const response = await axios.patch(`${process.env.REACT_APP_API_HOST}/api/${tipo}`, dataObject);
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
                    case 'puesto-proyeccion':
                        console.log(dataObject);
                        updatedContent = puestoproyeccion.map(data => {
                            console.log(data.id);
                            if(data.id === dataObject.id){
                                return {...data, ...dataObject}
                            }
                            return data;
                        });
                        setPuestoProyeccion(updatedContent);
                    case 'info-personal':
                        setInfoPersonal(dataObject);
                        break;
                }
            }
        }else if(localStorage.getItem('tipo_usuario') === 'observador'){
            alert('Usted es solo observador')
        }
        setEditModal(false);
    };

    const fetchInfoEmpleado = async () => {
        console.log('Request');
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/info-empleado/${id}`);
        setClienteProveedor(response.data.clienteproveedor);
        setTrayectoriaLaboral(response.data.trayectorialaboral);
        setUpwardFeedback(response.data.upwardfeedback);
        setEvaluacion(response.data.evaluacion);
        setPuestoProyeccion(response.data.puestoproyeccion);
        setInfoPersonal(response.data.empleado);
    };
    useEffect(() => {
        if(sessionStorage.length === 0) {
            localStorage.clear();
            navigate('/login');
        }
        
        if(id === localStorage.getItem('cet')){
            navigate('/busqueda');
        }

        fetchInfoEmpleado();
        
    }, []);

    const handleDeleteClick = (tipo, id) => {
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
            case 'puesto-proyeccion':
                content = puestoproyeccion.filter((data) => {
                    return data.id === id;
                });
                setContentEdit(content);
        }
        setDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
    }

    let renderedItems = null;
    if(editarView === 'upward-feedback'){
        if(upwardfeedback !== null){
            renderedItems = upwardfeedback.map((data) => {
                return <CardComentarios data={data} tipo='upward-feedback' handleDeleteClick={handleDeleteClick} handleClickEdit={handleOpenEditModal}/>
            });
        }
    }else if(editarView === 'cliente-proveedor'){
        if(clienteproveedor !== null){
            renderedItems = clienteproveedor.map((data) => {
                return <CardComentarios data={data} tipo='cliente-proveedor' handleDeleteClick={handleDeleteClick} handleClickEdit={handleOpenEditModal}/>
            });
        }
    }else if (editarView === 'evaluacion'){
        if(evaluacion !== null){
            renderedItems = evaluacion.map((data) => {
                return <CardEvaluacion data={data} tipo='evaluacion' handleDeleteClick={handleDeleteClick} handleClickEdit={handleOpenEditModal}/>
            });
        }
    }else if(editarView === 'trayectoria'){
        if(trayectorialaboral !== null){
            renderedItems = trayectorialaboral.map(data => {
                return <CardTrayectoriaLaboral data={data} tipo='trayectoria' handleDeleteClick={handleDeleteClick} handleClickEdit={handleOpenEditModal}/>
            });
        }
    }else if(editarView === 'puesto-proyeccion'){
        if(puestoproyeccion !== null){
            renderedItems = puestoproyeccion.map(data => {
                return <CardPuestoProyeccion data={data} tipo='puesto-proyeccion' handleDeleteClick={handleDeleteClick} handleClickEdit={handleOpenEditModal}/>
            });
        }
    }else if(editarView === 'info-personal'){
        if(infoPersonal !== null){
            renderedItems = <CardInfoPersonal data={infoPersonal} tipo='info-personal' handleClickEdit={handleOpenEditModal}/>
        }
    }
    return (
        <div className='editar-ficha'>
            <PerfilSideBar 
                cet={id}
                setEditarView={setEditarView} 
                empleado={infoPersonal !== null ? infoPersonal : null} 
                cantClienteProveedor={clienteproveedor !== null ? clienteproveedor.length : 0} 
                cantUpwardFeedback={upwardfeedback !== null ?  upwardfeedback.length : 0} 
                cantEvaluacion={evaluacion !== null ? evaluacion.length : 0} 
                cantTrayectoriaLaboral={trayectorialaboral !== null ?  trayectorialaboral.length : 0} 
                cantPuestoProyeccion={puestoproyeccion !== null ? puestoproyeccion.length : 0}
            />
            <EditarListView renderedItems={renderedItems} tipo={editarView} openModal={handleOpenCreateModal}/>
            {modal ? <CreateModal tipo={editarView} handleSubmitCreate={handleSubmitCreate} closeModal={handleCloseCreateModal} cet={id}/> : null}
            {editModal ? <EditModal tipo={editarView} data={contentEdit} handleSubmitCreate={handleEdit} closeModal={handleCloseEditModal} /> : null}
            {deleteModal ? <DeleteModal tipo={editarView} data={contentEdit} handleDelte={handleDelete} onClose={handleCloseDeleteModal}/> : null}
        </div>
    );
};

export default Editar;