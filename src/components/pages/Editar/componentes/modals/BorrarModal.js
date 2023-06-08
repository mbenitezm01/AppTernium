import { BiTrash } from 'react-icons/bi';
import { HiXMark } from 'react-icons/hi2';


function DeleteModal({ tipo, data, onClose, handleDelte }) {
    const handleClickDelete = () => {
        handleDelte(tipo, data[0].id);
        onClose();
    };

    console.log(data);
    return (
        <div className="modal">
            <div className="delete-modal">
                <p style={{fontSize: 'x-large', fontWeight: 'bold', borderBottom: '1px solid gray', padding: '5px'}}>Seguro que quiere borrar?</p>
                <div className='delete-btns-modal'>
                    <div className='delete-btn-modal' style={{backgroundColor: '#999', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '6rem',  borderRadius: '5px', padding: '5px'}} onClick={onClose}>
                        Cancelar
                        <HiXMark />
                    </div>
                    <div className='delete-btn-modal' style={{backgroundColor: '#f30', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '6rem',  borderRadius: '5px', padding: '5px'}} onClick={handleClickDelete}>
                        Aceptar
                        <BiTrash/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal