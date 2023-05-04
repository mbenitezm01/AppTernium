import { useState } from "react";
import { GrClose } from 'react-icons/gr';

export default function CreateModal  ({ tipo, handleSubmitCreate, closeModal }) {
    const [comentario, setComentario] = useState('');
    const [nota, setNota] = useState(0);
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

    }else if (tipo === 'evaluacion'){
        name = 'Evaluaciones';
        
    }else if (tipo === 'trayectoria'){
        name = 'Trayectoria Laboral';
        
    }else if (tipo === 'proyeccion-puesto'){
        name = 'Proyección de Puesto';
    }

    const handleSubmit = (event) => {
        if(comentario === '' && nota === 0){
            alert('Debe de agregar los datos de ambos campos');
            return;
        }
        event.preventDefault();
        handleSubmitCreate(tipo, nota, comentario);
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
                    <button className="agregar-btn" onClick={() => handleSubmitCreate(tipo, nota, comentario)}>Submit</button>
                </div>
            </form>
        </div>
    )
}
