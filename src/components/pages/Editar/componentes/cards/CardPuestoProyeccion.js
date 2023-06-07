import { BiTrash, BiEditAlt } from 'react-icons/bi';

function CardPuestoProyeccion({ data, tipo, handleDelete, handleDeleteClick, handleClickEdit }) {
    return (
        <div className='edit-card'>
            <div>
                <p>Puesto</p>
                <div>
                    <BiEditAlt className='edit-card-btns' onClick={() => handleClickEdit(tipo, data.id)}/>
                    <BiTrash className='edit-card-btns' onClick={() => handleDeleteClick(tipo, data.id)}/>
                </div>
            </div>
            <p>{data.puesto}</p>
        </div>
    )
}

export default CardPuestoProyeccion