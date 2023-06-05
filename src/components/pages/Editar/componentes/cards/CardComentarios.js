import { BiTrash, BiEditAlt } from 'react-icons/bi';

export default function CardComentarios ({ data, tipo, handleDelete, handleDeleteClick, handleClickEdit }){
    return (
        <div className='edit-card'>
            <div>
                <p>{data.fecha.slice(0, 10)}</p>
                <div>
                    <BiEditAlt className='edit-card-btns' onClick={() => handleClickEdit(tipo, data.id)}/>
                    <BiTrash className='edit-card-btns' onClick={() => handleDeleteClick(tipo, data.id)}/>
                </div>
            </div>
            <p>{data.nota}</p>
            <p>{data.comentarios}</p>
        </div>
    );
};