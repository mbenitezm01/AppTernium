import { BiTrash, BiEditAlt } from 'react-icons/bi';

export default function EditCardComentarios ({ data, tipo, handleDelete }){
    return (
        <div className='edit-card'>
            <div>
                <p>{data.fecha.slice(0, 10)}</p>
                <div>
                    <BiEditAlt className='edit-card-btns'/>
                    <BiTrash className='edit-card-btns' onClick={() => handleDelete(tipo, data.id)}/>
                </div>
            </div>
            <p>{data.nota}</p>
            <p>{data.comentarios}</p>
        </div>
    );
};