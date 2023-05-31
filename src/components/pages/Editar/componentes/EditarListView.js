import { HiOutlineDocumentAdd } from 'react-icons/hi';
import NoCard from './cards/NoCard';

export default function EditarListView({ renderedItems, openModal }){
    return(
        <div className='edit-list-view'>
            <div className="agregar">
                <button className='agregar-btn' onClick={openModal}><p>Agregar</p><HiOutlineDocumentAdd /></button>
            </div>
            <div className={renderedItems === null ? 'edit-list-no' : 'edit-list'}>
                {renderedItems === null ? <NoCard /> : renderedItems}
            </div>
        </div>
        
    );
};