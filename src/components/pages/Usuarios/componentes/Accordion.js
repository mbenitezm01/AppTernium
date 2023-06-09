import { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiOutlineCloudUpload } from 'react-icons/ai';
import axios from 'axios';
import './Accordion.css';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



function Accordion() {

    const navigate = useNavigate()

    function returnHandler(){
        navigate('/usuarios')
    }

    useEffect(() => {
        if(sessionStorage.length === 0) {
            localStorage.clear();
            navigate('/login');
        }
        
        if(localStorage.getItem('tipo_usuario') !== 'administrador') navigate('/busqueda');
    }, []);


    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchPendientes();
    }, []);
    // let content = null;
    // if(activeIndex !== -1){
    //    const data = items[activeIndex].data.split('"');
    //    content = data.map((d, index) => {
    //       return ()
    //    });
    // }
    const handleCreate = async (id_pendiente, tipo, dataObject) => {
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            }
            dataObject.refreshToken = sessionStorage.getItem('refreshToken');
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/${tipo}`, dataObject, config);
            if(response.data.creado){
                handleDeletePendiente(id_pendiente);
            }
        }catch{
            alert('Error en el sistema, volver a intentar');
        }        
    }

    const handleDelete = async (id_pendiente, tipo, id) => {
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            }
            const data = {
                refreshToken: sessionStorage.getItem('refreshToken')
            }
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/${tipo}/${id.id}`, data, config);
            if(response.data.accessToken !== null) sessionStorage.setItem('accessToken', response.data.accessToken);
            if(response.data.borrado){
                handleDeletePendiente(id_pendiente);
            }
        }catch{
            alert('Volver a intentar');
        }
    };

    const handleEdit = async (id_pendiente, tipo, dataObject) => {
        const config = {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        }
        dataObject.refreshToken = sessionStorage.getItem('refreshToken');
        const response = await axios.patch(`${process.env.REACT_APP_API_HOST}/api/${tipo}`, dataObject);
        if(response.data.accessToken !== null) sessionStorage.setItem('accessToken', response.data.accessToken);
        if(response.data.editado){
            handleDeletePendiente(id_pendiente);
        }else{
            alert('Volver a intentar');
        }
    }

    const handleDeletePendiente = async (id_pendiente) => {
        const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/api/pendiente/${id_pendiente}`);
        if(response.data.borrado){
            let updatedContent = items.filter(data => {
                return data.data.id !== id_pendiente
            });
            setItems(updatedContent);
        }else{
            alert('Volver a intentar');
        }
    };

    const handleFetchComentario = async (tipo, id) => {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/${tipo}/${id}`);
        return response.data;
    };

    const handleClickSubmit =  (id_pendiente, tipo, dataObject, metodo) => {
        console.log(id_pendiente, tipo, dataObject, metodo);
        if(metodo === 'crear'){
            handleCreate(id_pendiente, tipo, dataObject);
            alert('Se ha creado el comentario pendiente');
        }else if(metodo === 'borrar'){
            handleDelete(id_pendiente, tipo, dataObject);
            alert('Se ha borrado el comentario pendiente');
        }else if(metodo === 'editar'){
            handleEdit(id_pendiente, tipo, dataObject);
            alert('Se ha editado el comentario pendiente');
        }
    }

    const fetchPendientes = async () => {
        try{
            console.log('Request');
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/pendiente`);
            const tempArr = [];
            // response.data.forEach(data => {
            for (const data of response.data.data) {
                if(data.metodo === 'crear'){
                    tempArr.push({data, item: null});
                }else{
                    // const res = handleFetchComentario(data.tabla, data.data.id);
                    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/api/${data.tabla}/${data.data.id}`);
                    tempArr.push({data, item: res.data});
                }
            };
            console.log(tempArr);
            setItems(tempArr);
        }catch{
            alert('Error en el sistema, volver a intentar');
        }
    };

    
    console.log(items);
    const content = items.map(i => {
        let contentTemp = null;
        if(i.data.metodo === 'borrar'){
            if(i.data.tabla === 'upward-feedback' || i.data.tabla === 'cliente-proveedor'){
                contentTemp = (
                    <div>
                        <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>{i.data.tabla === 'upward-feedback' ? 'Upward Feedback' : 'Cliente Proveedor'}</p>
                        <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Comentario a borrar: </p>
                        <div className='body-accordion'>
                            <p>Nota: {i.item.nota}</p>
                            <p>Comentario: {i.item.comentarios}</p>
                        </div>
                        <div className='btns-accordion'>
                            <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                            <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                        </div>
                    </div>
                )
            }else if(i.data.tabla === 'evaluacion'){
                contentTemp = (
                <div >
                    <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Evaluacion</p>
                    <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Comentario a borrar: </p>
                    <div className='body-accordion'>
                        <p>Performance: {i.item.performance}</p>
                        <p>Curva: {i.item.curva}</p>
                        <p>Potencial: {i.item.potencial}</p>
                        <p>Comentario: {i.item.comentario}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }else if(i.data.tabla === 'trayectoria'){
                contentTemp = (
                <div>
                    <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Trayectoria Laboral</p>
                    <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Comentario a borrar: </p>
                    <div className='body-accordion'>
                        <p>Cet: {i.item.empleado_cet}</p>
                        <p>Fecha: {i.item.fecha}</p>
                        <p>Empresa: {i.item.empresa}</p>
                        <p>Puesto: {i.item.puesto}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }else if(i.data.tabla === 'puesto-proyeccion'){
                contentTemp = (
                    <div>
                        <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Puesto de proyección</p>
                        <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Proyección a borrar: </p>
                        <div className='body-accordion'>
                            <p>Cet: {i.item.empleado_cet}</p>
                            <p>Fecha: {i.item.puesto}</p>
                        </div>
                        <div className='btns-accordion'>
                            <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                            <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                        </div>
                    </div>
                    )
            }
        }else if(i.data.metodo === 'editar'){
            if(i.data.tabla === 'upward-feedback' || i.data.tabla === 'cliente-proveedor'){
                contentTemp = (
                    <>
                        <div>
                            <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>{i.data.tabla === 'upward-feedback' ? 'Upward Feedback' : 'Cliente Proveedor'}</p>
                            <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Comentario anterior </p>
                            <div className='body-accordion'>
                                <p>Nota: {i.item.nota}</p>
                                <p>Comentario: {i.item.comentarios}</p>
                            </div>
                            
                        </div>
                        <div>
                            <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Comentario nuevo </p>
                            <div className='body-accordion'>
                                <p>Nota: {i.data.data.nota}</p>
                                <p>Comentario: {i.data.data.comentarios}</p>
                            </div>
                            <div className='btns-accordion'>
                                <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                                <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                            </div>
                        </div>
                    </>
                )
            }else if(i.data.tabla === 'evaluacion'){
                contentTemp = (
                    <>
                        <div>
                            <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Evaluacion</p>
                            <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Evaluacion anterior</p>
                            <div className='body-accordion' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>
                                <p>Performance: {i.item.performance}</p>
                                <p>Curva: {i.item.curva}</p>
                                <p>Potencial: {i.item.potencial}</p>
                                <p>Comentario: {i.item.comentario}</p>
                            </div>
                            
                        </div>
                        <div>
                            <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Evaluacion nueva</p>
                            <div className='body-accordion'>
                                <p>Performance: {i.data.data.performance}</p>
                                <p>Curva: {i.data.data.curva}</p>
                                <p>Potencial: {i.data.data.potencial}</p>
                                <p>Comentario: {i.data.data.comentario}</p>
                            </div>
                            <div className='btns-accordion'>
                                <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                                <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                            </div>
                        </div>
                    </>
                )
            }else if(i.data.tabla === 'trayectoria'){
                contentTemp = (
                    <>
                        <div>
                            <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Trayectoria Laboral</p>
                            <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Trayectoria laboral anterior</p>
                            <div className='body-accordion'>
                                <p>Cet: {i.item.empleado_cet}</p>
                                <p>Fecha: {i.item.fecha}</p>
                                <p>Empresa: {i.item.empresa}</p>
                                <p>Puesto: {i.item.puesto}</p>
                            </div>
                            
                        </div>
                        <div>
                            <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Trayectoria laboral nueva</p>
                            <div className='body-accordion'>
                                <p>Cet: {i.data.data.empleado_cet}</p>
                                <p>Fecha: {i.data.data.fecha}</p>
                                <p>Empresa: {i.data.data.empresa}</p>
                                <p>Puesto: {i.data.data.puesto}</p>
                            </div>
                            <div className='btns-accordion'>
                                <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                                <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                            </div>
                        </div>
                    </>
                )
            }else if(i.data.tabla === 'puesto-proyeccion'){
                contentTemp = (
                    <>
                        <div>
                            <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Puesto proyección</p>
                            <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Proyección anterior</p>
                            <div className='body-accordion'>
                                <p>Cet: {i.item.empleado_cet}</p>
                                <p>Puesto: {i.item.puesto}</p>
                            </div>
                            
                        </div>
                        <div>
                            <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Proyección nueva</p>
                            <div className='body-accordion'>
                                <p>Cet: {i.data.data.empleado_cet}</p>
                                <p>Puesto: {i.data.data.puesto}</p>
                            </div>
                            <div className='btns-accordion'>
                                <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                                <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                            </div>
                        </div>
                    </>
                )
            }
        }else if(i.data.metodo === 'crear'){
            if(i.data.tabla === 'upward-feedback' || i.data.tabla === 'cliente-proveedor'){
                contentTemp = (
                    <div>
                        <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>{i.data.tabla === 'upward-feedback' ? 'Upward Feedback' : 'Cliente Proveedor'}</p>
                        <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Comentario a crear: </p>
                        <div className='body-accordion'>
                            <p>Nota: {i.data.data.nota}</p>
                            <p>Comentario: {i.data.data.comentario}</p>
                        </div>
                        <div className='btns-accordion'>
                            <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                            <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                        </div>
                    </div>
                )
            }else if(i.data.tabla === 'evaluacion'){
                contentTemp = (
                <div >
                    <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Evaluacion</p>
                    <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Comentario a crear: </p>
                    <div className='body-accordion'>
                        <p>Performance: {i.data.data.performance}</p>
                        <p>Curva: {i.data.data.curva}</p>
                        <p>Potencial: {i.data.data.potencial}</p>
                        <p>Comentario: {i.data.data.comentario}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }else if(i.data.tabla === 'trayectoria'){
                contentTemp = (
                <div>
                    <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Trayectoria Laboral</p>
                    <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Comentario a crear: </p>
                    <div className='body-accordion'>
                        <p>Cet: {i.data.data.empleado_cet}</p>
                        <p>Fecha: {i.data.data.fecha}</p>
                        <p>Empresa: {i.data.data.empresa}</p>
                        <p>Puesto: {i.data.data.puesto}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }else if(i.data.tabla === 'puesto-proyeccion'){
                contentTemp = (
                    <div>
                        <p className='txt-align-left' style={{fontWeight: 'bold', fontSize: 'large'}}>Proyección de puesto</p>
                        <p className='txt-align-left' style={{marginTop: '10px', fontWeight: 'semi-bold', fontSize: 'medium'}}>Puesto a crear: </p>
                        <div className='body-accordion'>
                            <p>Cet: {i.data.data.empleado_cet}</p>
                            <p>Puesto: {i.data.data.puesto}</p>
                        </div>
                        <div className='btns-accordion'>
                            <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(i.data.id)}>Borrar petición</button>
                            <button className='btn-submit-accordion' onClick={() => handleClickSubmit(i.data.id, i.data.tabla, i.data.data, i.data.metodo)}>Realizar cambio</button>
                        </div>
                    </div>
                )
            }
        }
        return (
                <div className='accordion'>
                    <div className='title-accordion'>
                        <div style={{ display: 'flex', marginBottom: '10px', fontWeight: 'bold', fontSize: 'larger'}}>
                            {i.data.metodo === 'crear' ? <span style={{marginRight: '4px'}}><AiOutlineCloudUpload /></span> : null}
                            {i.data.metodo === 'borrar' ? <span style={{marginRight: '4px'}}><AiOutlineDelete /></span> : null}
                            {i.data.metodo === 'editar' ? <span style={{marginRight: '4px'}}><AiOutlineEdit /></span> : null}
                            <p>Editor: {i.data.nombre}</p>
                        </div>
                    </div>
                    {contentTemp !== null ? contentTemp.props.children : null} 
                </div>
        );
    });
    return (
        <div className='accordion-fondo'>
            <div className="return-button">
                <button onClick={returnHandler}><AiOutlineArrowLeft/>Regresar</button>
            </div>
            {content}
        </div>
    )

}
export default Accordion;