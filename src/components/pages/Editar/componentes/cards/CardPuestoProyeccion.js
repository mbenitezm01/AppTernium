import { BiTrash, BiEditAlt } from 'react-icons/bi';

function CardPuestoProyeccion({ data, tipo, handleDeleteClick, handleClickEdit }) {
    return (
        <div className='edit-card'>
            <div className='edit-card-header'>
                <p>Puesto</p>
                <div>
                    <BiEditAlt className='edit-card-btns' onClick={() => handleClickEdit(tipo, data.id)}/>
                    <BiTrash className='edit-card-btns' onClick={() => handleDeleteClick(tipo, data.id)}/>
                </div>
            </div>
            <div className='edit-card-body'>
                <p>{data.puesto}</p>
            </div>
        </div>
    )
}

export default CardPuestoProyeccion