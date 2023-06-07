import { BiTrash, BiEditAlt } from 'react-icons/bi';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';


function CardInfoPersonal({ data, tipo, handleClickEdit }) {
    return (
        <div className='edit-card'>
            <div className='edit-card-header'>
                <p>{data.nombre}</p>
                <div>
                    <BiEditAlt className='edit-card-btns' onClick={() => handleClickEdit(tipo, data.id)}/>
                </div>
            </div>
            <div className='edit-card-body'>
                <p>Puesto: {data.puesto}</p>
                <p>Estructura 3: {data.estructura_3}</p>
                <p>Estructura 4: {data.estructura_4}</p>
                <p>Estructura 5: {data.estructura_5}</p>
                <p>CET de Jefe: {data.jefe_cet}</p>
                <p>Antiguedad: {data.antiguedad}</p>
                <p>Key talent: {data.keyTalent ? <IoIosCheckmarkCircle style={{color: '#00FF00'}}/> : <IoIosCloseCircle style={{color: '#FF0000'}}/>}</p>
                <p>Fecha de nacimiento: {data.fecha_nacimiento.slice(0, 10)}</p>
                <p>Universidad: {data.universidad}</p>
                <p>Direccion: {data.direccion}</p>
                <p>PC-CAT: {data.pc + ' - ' + data.cat}</p>
            </div>
        </div>
    )
}

export default CardInfoPersonal