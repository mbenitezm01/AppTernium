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
        case 'puesto-proyeccion':
            label = 'Proyección de puesto';
            break;
        case 'cliente-proveedor':
            label = 'Cliente proveedor';
            break;
        case 'info-personal':
            label = 'Información personal';
            break;
    }
    return(
        <div className='edit-list-view'>
            <div className="agregar">
                <p>{label}</p>
                {tipo === 'info-personal' ? <button disabled className='agregar-btn-disabled'><p style={{marginBottom: '0px'}}>Agregar</p><HiOutlineDocumentAdd /></button> : <button className='agregar-btn' onClick={openModal}><p>Agregar</p><HiOutlineDocumentAdd /></button>}
            </div>
            <div className={(renderedItems === null || renderedItems.length === 0) ? 'edit-list-no' : 'edit-list'}>
                {(renderedItems === null || renderedItems.length === 0) ? <NoCard /> : renderedItems}
            </div>
        </div>
        
    );
};