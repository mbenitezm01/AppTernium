import { useState, useCallback } from "react";
import { GrClose } from 'react-icons/gr';

export default function CreateModal  ({ tipo, handleSubmitCreate, closeModal, cet }) {
    // No todos se usan al mismo tiempo, se usan para crear y modificar los valores de cada
    // una de las evaluaciones, comentarios, puestos de proyeccion, entre otros.
    const [comentario, setComentario] = useState('');
    const [nota, setNota] = useState(0);
    const [potencial, setPotencial] = useState('AP (MT)');
    const [curva, setCurva] = useState('TX DIMA CI');
    const [puesto, setPuesto] = useState('');
    const [fecha, setFecha] = useState('');

    // Estas variables son responsables de crear los campos a llenar en el modal.
    let content = null;
    let name = null;

    // Aqui se evalua que se debe de desplegar en el Modal.
    if(tipo === 'upward-feedback'){
        name = 'Upward Feedback';
        content = (
            <>
                <textarea 
                    value={comentario} 
                    type="text" 
                    className="input-box comentario" 
                    placeholder="Comentarios..."
                    onChange={(e) => setComentario(e.target.value)}
                />
                <div>
                    <span style={{marginRight: '10px'}}>Nota</span>
                    <input 
                        value={nota}
                        type='number'
                        className="input-box nota"
                        onChange={(e) => setNota(e.target.value)}
                    />
                </div>
                
            </>
        )
    }else if (tipo === 'cliente-proveedor'){
        name = 'Cliente Proveedor';
        content = (
            <>
                <textarea 
                    value={comentario} 
                    type="text" 
                    className="input-box comentario" 
                    placeholder="Comentarios..."
                    onChange={(e) => setComentario(e.target.value)}
                />
                <div>
                    <span style={{marginRight: '10px'}}>Nota</span>
                    <input 
                        value={nota}
                        type='number'
                        className="input-box nota"
                        onChange={(e) => setNota(e.target.value)}
                    />
                </div>
                
            </>
        )
    }else if (tipo === 'evaluacion'){
        name = 'Evaluaciones';
        content = (
            <>
                <div style={{marginBottom: '10px'}}>
                    <span style={{marginRight: '10px'}}>Performance</span>
                    <input 
                        value={nota}
                        type='number'
                        className="input-box nota"
                        onChange={(e) => setNota(e.target.value)}
                    />
                </div>
                <textarea 
                    value={comentario} 
                    type="text" 
                    className="input-box comentario" 
                    placeholder="Comentarios..."
                    onChange={(e) => setComentario(e.target.value)}
                />
                <div style={{marginBottom: '10px'}}>
                    <span style={{marginRight: '10px'}}>Curva</span>
                    <select
                        name="Curva"
                        className="curva"
                        onChange={(e) => setCurva(e.target.value)}
                    >
                        <option value='TX DIMA CI'>TX DIMA CI</option>
                        <option value='Otro'>Otro</option>
                    </select>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <span style={{marginRight: '10px'}}>Potencial</span>
                    <select 
                        name="Curva"
                        className="curva"
                        onChange={(e) => setPotencial(e.target.value)}
                    >
                        <option value='AP (MT)'>AP (MT)</option>
                        <option value='PROM (M)'>PROM (M)</option>
                        <option value='Otro'>Otro</option>
                    </select>
                </div>
            </>
        )
        
    }else if (tipo === 'trayectoria'){
        name = 'Trayectoria Laboral';
        content = (
            <>
                <input style={{marginBottom: '10px'}}
                    value={comentario} 
                    type="text" 
                    className="input-box comentario" 
                    placeholder="Empresa..."
                    onChange={(e) => setComentario(e.target.value)}
                />
                <input style={{marginBottom: '10px'}}
                    value={puesto}
                    type='text'
                    className="input-box comentario"
                    placeholder="Puesto..."
                    onChange={(e) => setPuesto(e.target.value)}
                />
                <input style={{marginBottom: '10px'}}
                    value={fecha}
                    type='date'
                    onChange={(e) => setFecha(e.target.value)}
                />
            </>
        )
        
    }else if (tipo === 'puesto-proyeccion'){
        name = 'Proyección de Puesto';
        content = (
            <>
                <input style={{marginBottom: '10px'}}
                    value={puesto}
                    type='text'
                    className="input-box comentario"
                    placeholder="Puesto..."
                    onChange={(e) => setPuesto(e.target.value)}
                />  
            </>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(comentario, nota);
        if(tipo === 'upward-feedback'){
            if(comentario === '' && nota === 0){
                alert('Debe de agregar los datos de todos los campos');
            }else{
                handleSubmitCreate(tipo, {
                    empleado_cet: cet,
                    nota: nota,
                    comentario: comentario
                });
            }
        }else if(tipo === 'cliente-proveedor'){
            if(comentario === '' && nota === 0){
                alert('Debe de agregar los datos de todos los campos');
            }else{
                handleSubmitCreate(tipo, {
                    empleado_cet: cet,
                    nota: nota,
                    comentario: comentario
                });
            }
        }else if(tipo === 'evaluacion'){
            if(comentario === '' && nota === 0 && curva === '' && potencial === ''){
                alert('Debe de agregar los datos de todos los campos');
            }else{
                handleSubmitCreate(tipo, {
                    empleado_cet: cet,
                    performance: nota,
                    potencial: potencial,
                    curva: curva,
                    comentario: comentario
                })
            }
        }else if(tipo === 'trayectoria'){
            if(comentario === '' && puesto === '' && fecha === ''){
                alert('Debe de agregar los datos de todos los campos')
            }else{
                handleSubmitCreate(tipo, {
                    empleado_cet: cet,
                    fecha: fecha,
                    empresa: comentario,
                    puesto: puesto
                })
            }

        }else if(tipo === 'puesto-proyeccion'){
            if(puesto === ''){
                alert('Debe de agregar los datos de todos los campos');
            }else{
                handleSubmitCreate(tipo, {
                    empleado_cet: cet,
                    puesto: puesto
                })
            }
        }
    };

    return (
        <div className="modal">
            <form className="create-modal" onSubmit={handleSubmit}>
                <div className="create-modal-header">
                    <p>{name}</p>
                    <GrClose className='close-modal-icon' onClick={closeModal} style={{cursor: 'pointer'}}/>
                </div>
                <div className="create-modal-body">
                    {content}
                </div>
                <div className="create-modal-footer">
                    <button className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    )
}
