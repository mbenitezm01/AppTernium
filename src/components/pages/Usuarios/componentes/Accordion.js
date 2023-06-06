import { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiOutlineCloudUpload } from 'react-icons/ai';
import axios from 'axios';
import './Accordion.css';

function Accordion() {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    const fetchPendientes = async () => {
        try{
            const response = await axios.get('http://localhost:5050/api/pendiente');
            setItems(response.data);
        }catch{
            alert('Error en el sistema, volver a intentar');
        }
    };

    useEffect(() => {
        fetchPendientes();
    }, []);
    console.log(items);
    // let content = null;
    // if(activeIndex !== -1){
    //    const data = items[activeIndex].data.split('"');
    //    content = data.map((d, index) => {
    //       return ()
    //    });
    // }
    const handleCreate = async (id_pendiente, tipo, dataObject) => {
        try{
            const response = await axios.post(`http://localhost:5050/api/${tipo}`, dataObject);
            if(response.data.creado){
                handleDeletePendiente(id_pendiente);
            }
        }catch{
            alert('Error en el sistema, volver a intentar');
        }        
    }

    const handleDelete = async (id_pendiente, tipo, id) => {
        try{
            const response = await axios.delete(`http://localhost:5050/api/${tipo}/${id}`);
            if(response.data.borrado){
                handleDeletePendiente(id_pendiente);
            }
        }catch{
            alert('Volver a intentar');
        }
    };

    const handleEdit = async (id_pendiente, tipo, dataObject) => {
        const response = await axios.patch(`http://localhost:5050/api/${tipo}`, dataObject);
        if(response.data.editado){
            handleDeletePendiente(id_pendiente);
        }else{
            alert('Volver a intentar');
        }
    }

    const handleDeletePendiente = async (id_pendiente) => {
        const response = await axios.delete(`http://localhost:5050/api/pendiente/${id_pendiente}`);
        if(response.data.borrado){
            let updatedContent = items.filter(data => {
                return data.id !== id_pendiente
            });
            setItems(updatedContent);
            alert('Se ha borrado el comentario pendiente');
        }else{
            alert('Volver a intentar');
        }
    };

    const handleFetchComentario = async (tipo, id) => {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/${tipo}/${id}`);
        console.log(response.data);
        return response.data;
    };

    const handleClickSubmit =  (id_pendiente, tipo, dataObject, metodo) => {
        console.log(id_pendiente, tipo, dataObject, metodo);
        if(metodo === 'crear'){
            handleCreate(id_pendiente, tipo, dataObject);
        }else if(metodo === 'borrar'){
            handleDelete(id_pendiente, tipo, dataObject);
        }else if(metodo === 'editar'){
            handleEdit(id_pendiente, tipo, dataObject);
        }
        setActiveIndex(-1);
    }

    const content = items.map((item, index) => {
        const json = JSON.parse(item.data);
        let temp = null;
        if(item.metodo !== 'crear'){
            temp = json.id !== undefined ? handleFetchComentario(item.tabla, json.id) : handleFetchComentario(item.tabla, json);
        }
        console.log(temp);
        let contentTemp = null;
        if(item.metodo === 'borrar'){
            if(item.tabla === 'upward-feedback' || item.tabla === 'cliente-proveedor'){
                contentTemp = (
                <div>
                    <p className='txt-align-left'>{item.tabla === 'upward-feedback' ? 'Comentario a borrar de tabla: Upward Feedback' : 'Comentario a borrar de tabla: Cliente Proveedor'}</p>
                    <div className='body-accordion'>
                        <p>Nota: {temp.nota}</p>
                        <p>Comentario: {temp.comentarios}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(item.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(item.id, item.tabla, JSON.parse(item.data), item.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }else if(item.tabla === 'evaluacion'){
                contentTemp = (
                <div >
                    <p className='txt-align-left'>Comentario a borrar de tabla: Evaluacion</p>
                    <div className='body-accordion'>
                        <p>Performance: {temp.performance}</p>
                        <p>Curva: {temp.curva}</p>
                        <p>Potencial: {temp.potencial}</p>
                        <p>Comentario: {temp.comentario}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(item.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(item.id, item.tabla, JSON.parse(item.data), item.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }else if(item.tabla === 'trayectoria'){
                contentTemp = (
                <div>
                    <p className='txt-align-left'>Comentario a borrar de tabla: Trayectoria Laboral</p>
                    <div className='body-accordion'>
                        <p>Cet: {temp.empleado_cet}</p>
                        <p>Fecha: {temp.fecha}</p>
                        <p>Empresa: {temp.empresa}</p>
                        <p>Puesto: {temp.puesto}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(item.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(item.id, item.tabla, JSON.parse(item.data), item.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }
            // contentTemp = (
            //     <div>
            //         <div className='body-accordion'>
            //             <p>Id del comentario a borrar: {item.data}</p>
            //             <p></p>
            //         </div>
            //         <div className='btns-accordion'>
            //             <button onClick={() => handleDeletePendiente(item.id)}>Borrar</button>
            //             <button onClick={() => handleClickSubmit(item.id, item.tabla, JSON.parse(item.data), item.metodo)}>Realizar cambio</button>
            //         </div>
            //     </div>
            // )
        }else{
            if(item.tabla === 'upward-feedback' || item.tabla === 'cliente-proveedor'){
                contentTemp = (
                <div>
                    <p className='txt-align-left'>{item.tabla === 'upward-feedback' ? 'Upward Feedback' : 'Cliente Proveedor'}</p>
                    <div className='body-accordion'>
                        <p>Nota: {json.nota}</p>
                        <p>Comentario: {json.comentarios}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(item.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(item.id, item.tabla, JSON.parse(item.data), item.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }else if(item.tabla === 'evaluacion'){
                contentTemp = (
                <div >
                    <p className='txt-align-left'>Evaluacion</p>
                    <div className='body-accordion'>
                        <p>Performance: {json.performance}</p>
                        <p>Curva: {json.curva}</p>
                        <p>Potencial: {json.potencial}</p>
                        <p>Comentario: {json.comentario}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(item.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(item.id, item.tabla, JSON.parse(item.data), item.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }else if(item.tabla === 'trayectoria'){
                contentTemp = (
                <div>
                    <p className='txt-align-left'>Trayectoria Laboral</p>
                    <div className='body-accordion'>
                        <p>Cet: {json.empleado_cet}</p>
                        <p>Fecha: {json.fecha}</p>
                        <p>Empresa: {json.empresa}</p>
                        <p>Puesto: {json.puesto}</p>
                    </div>
                    <div className='btns-accordion'>
                        <button className='btn-submit-accordion' onClick={() => handleDeletePendiente(item.id)}>Borrar petición</button>
                        <button className='btn-submit-accordion' onClick={() => handleClickSubmit(item.id, item.tabla, JSON.parse(item.data), item.metodo)}>Realizar cambio</button>
                    </div>
                </div>
                )
            }
        }
        
        return (
            <div key={index} className='accordion'>
                <div className='title-accordion'>
                    <div style={{ display: 'flex', marginBottom: '10px'}}>
                        {item.metodo === 'crear' ? <span style={{marginRight: '4px'}}><AiOutlineCloudUpload /></span> : null}
                        {item.metodo === 'borrar' ? <span style={{marginRight: '4px'}}><AiOutlineDelete /></span> : null}
                        {item.metodo === 'editar' ? <span style={{marginRight: '4px'}}><AiOutlineEdit /></span> : null}
                        <p>Editor: {item.nombre}</p>
                    </div>
                </div>
                {contentTemp.props.children}
            </div>
        );
});

return (
    <div>
        {content}
    </div>
)

}
export default Accordion;