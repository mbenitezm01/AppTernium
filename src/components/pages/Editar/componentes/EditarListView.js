import { HiOutlineDocumentAdd } from 'react-icons/hi';
import NoCard from './cards/NoCard';

export default function EditarListView({ renderedItems, openModal }){
    return(
        <div className='edit-list-view'>
            <div className="agregar">
                <button className='agregar-btn' onClick={openModal}><p>Agregar</p><HiOutlineDocumentAdd /></button>
            </div>
            <div className={renderedItems.length === 0 ? 'edit-list-no' : 'edit-list'}>
                {renderedItems.length === 0 ? <NoCard /> : renderedItems}
            </div>
        </div>
        
    );
};