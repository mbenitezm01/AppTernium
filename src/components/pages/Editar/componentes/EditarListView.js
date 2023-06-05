import { HiOutlineDocumentAdd } from 'react-icons/hi';
import NoCard from './cards/NoCard';

export default function EditarListView({ renderedItems, openModal, tipo }){
    let label = null;
    switch (tipo){
        case 'upward-feedback':
            label = 'Upward Feedback'
            break;
        case 'evaluacion':
            label = 'Evaluación';
            break;
        case 'trayectoria':
            label = 'Trayectoria Laboral';
            break;
        case 'proyeccion-puesto':
            label = 'Proyección de puesto';
            break;
        case 'cliente-proveedor':
            label = 'Cliente proveedor';
            break;
    }
    return(
        <div className='edit-list-view'>
            <div className="agregar">
                <p>{label}</p>
                <button className='agregar-btn' onClick={openModal}><p>Agregar</p><HiOutlineDocumentAdd /></button>
            </div>
            <div className={renderedItems === null ? 'edit-list-no' : 'edit-list'}>
                {renderedItems === null ? <NoCard /> : renderedItems}
            </div>
        </div>
        
    );
};