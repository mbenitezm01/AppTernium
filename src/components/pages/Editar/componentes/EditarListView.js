import { HiOutlineDocumentAdd } from 'react-icons/hi';

export default function EditarListView({ renderedItems, tipo, openModal }){
    return(
        <div className="edit-list-view">
            <div className="agregar">
                <button className='agregar-btn' onClick={openModal}><p>Agregar</p><HiOutlineDocumentAdd /></button>
            </div>
            <div className='edit-list'>
                {renderedItems}
            </div>
        </div>
        
    );
};