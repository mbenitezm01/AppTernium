import { useState } from 'react';
import { GrClose } from 'react-icons/gr';


export default function EditModal({ tipo, data, closeModal, handleSubmitCreate }) {
    let tempComentario;
    if(tipo === 'evaluacion'){
        tempComentario = data[0].comentario
    }else if(tipo === 'trayectoria'){
        tempComentario = data[0].empresa;
        console.log(data[0].empresa);
    }else{
        tempComentario = data[0].comentarios;
    }
    let tempNota = tipo === 'evaluacion' ? data[0].performance : data[0].nota;
    console.log(data[0].potencial);
    const [comentario, setComentario] = useState(tempComentario);
    const [nota, setNota] = useState(tempNota);
    const [potencial, setPotencial] = useState(data[0].potencial);
    const [curva, setCurva] = useState(data[0].curva);
    const [puesto, setPuesto] = useState(data[0].puesto);
    const [fecha, setFecha] = useState(data[0].fecha.slice(0, 10));

    let content = null;
    let name = null;
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
                <div>
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
                <div>
                    <span style={{marginRight: '10px'}}>Curva</span>
                    <select
                        value={curva}
                        name="Curva"
                        className="curva"
                        onChange={(e) => setCurva(e.target.value)}
                    >
                        <option value='TX DIMA CI'>TX DIMA CI</option>
                        <option value='Otro'>Otro</option>
                    </select>
                </div>
                <div>
                    <span style={{marginRight: '10px'}}>Potencial</span>
                    <select 
                        value={potencial}
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
        console.log(potencial, curva);
    }else if (tipo === 'trayectoria'){
        name = 'Trayectoria Laboral';
        content = (
            <>
                <input 
                    value={comentario} 
                    type="text" 
                    className="input-box comentario" 
                    placeholder="Empresa..."
                    onChange={(e) => setComentario(e.target.value)}
                />
                <input 
                    value={puesto}
                    type='text'
                    className="input-box comentario"
                    placeholder="Puesto..."
                    onChange={(e) => setPuesto(e.target.value)}
                />
                <input 
                    value={fecha}
                    type='date'
                    onChange={(e) => setFecha(e.target.value)}
                />
            </>
        )
        
    }else if (tipo === 'proyeccion-puesto'){
        name = 'Proyección de Puesto';
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(tipo === 'upward-feedback'){
            if(comentario === '' && nota === 0){
                alert('Debe de agregar los datos de todos los campos');
            }else{
                handleSubmitCreate(tipo, {
                    id: data[0].id,
                    nota: nota,
                    comentarios: comentario
                });
            }
        }else if(tipo === 'cliente-proveedor'){
            if(comentario === '' && nota === 0){
                alert('Debe de agregar los datos de todos los campos');
            }else{
                handleSubmitCreate(tipo, {
                    id: data[0].id,
                    nota: nota,
                    comentarios: comentario
                });
            }
        }else if(tipo === 'evaluacion'){
            if(comentario === '' && nota === 0 && curva === '' && potencial === ''){
                alert('Debe de agregar los datos de todos los campos');
            }else{
                handleSubmitCreate(tipo, {
                    id: data[0].id,
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
                handleSubmitCreate(tipo,  {
                    id: data[0].id,
                    fecha: fecha,
                    empresa: comentario,
                    puesto: puesto
                })
            }

        }else if(tipo === 'proyeccion-puesto'){

        }
    };

    return (
        <div className="modal" onSubmit={handleSubmit}>
            <form className="create-modal">
                <div className="create-modal-header">
                    <p>{name}</p>
                    <GrClose className='close-modal-icon' onClick={closeModal} style={{cursor: 'pointer'}}/>
                </div>
                <div className="create-modal-body">
                    {content}
                </div>
                <div className="create-modal-footer">
                    <button className="agregar-btn">Submit</button>
                </div>
            </form>
        </div>
    )
}
