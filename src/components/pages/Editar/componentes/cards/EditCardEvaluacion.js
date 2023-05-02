import { BiTrash, BiEditAlt } from 'react-icons/bi';

export default function EditCardEvaluacion({ data }){
    return (
        <div className='edit-card'>
            <div>
                <p>{data.fecha.slice(0, 10)}</p>
                <div>
                    <BiEditAlt className='edit-card-btns'/>
                    <BiTrash className='edit-card-btns'/>
                </div>
            </div>
            <p>{data.performance + ' ' + data.curva}</p>
            <p>{data.comentario}</p>
        </div>
    );
};