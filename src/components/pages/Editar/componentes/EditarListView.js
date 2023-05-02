import { HiOutlineDocumentAdd } from 'react-icons/hi';

export default function EditarListView({ renderedItems }){
    return(
        <div className="edit-list-view">
            <div className="agregar">
                <button><p>Agregar</p><HiOutlineDocumentAdd /></button>
            </div>
            <div className='edit-list'>
                {renderedItems}
            </div>
        </div>
        
    );
};