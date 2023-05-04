import { HiOutlineDocumentAdd } from 'react-icons/hi';

export default function EditarListView({ renderedItems }){
    return(
        <div className="edit-list-view">
            <div className="agregar">
                <div className='agregar-btn'><p>Agregar</p><HiOutlineDocumentAdd /></div>
            </div>
            <div className='edit-list'>
                {renderedItems}
            </div>
        </div>
        
    );
};