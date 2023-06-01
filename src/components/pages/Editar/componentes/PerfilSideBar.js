import { FaUserCircle } from 'react-icons/fa';
import { BiFileBlank } from 'react-icons/bi';
import { CgNotes } from 'react-icons/cg';
import { MdWorkOutline } from 'react-icons/md';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

export default function PerfilSideBar({ empleado, cantUpwardFeedback, cantClienteProveedor, cantEvaluacion, cantTrayectoriaLaboral, cantPuestoProyeccion ,setEditarView }){
    const handleClickView = (view) => {
        setEditarView(view);
    };


    return (
        <div className="perfil">
            <div className="perfil-header">
                <FaUserCircle className="perfil-foto"/>
                <p>{empleado === null ? '' : empleado.nombre}</p>
            </div>
            <div className='perfil-body'>
                <div className='editar-btn' onClick={() => handleClickView('upward-feedback')}>
                    <div className='btn-icon'>
                        <CgNotes /><p>Upward Feedback</p>
                    </div>
                    <p>{cantUpwardFeedback}</p>
                </div>
                <div className='editar-btn' onClick={() => handleClickView('evaluacion')}>
                    <div className='btn-icon'>
                        <BiFileBlank /><p>Evaluacion</p>
                    </div>
                    <p>{cantEvaluacion}</p>
                </div>
                <div className='editar-btn' onClick={() => handleClickView('trayectoria')}>
                    <div className='btn-icon'>
                        <MdWorkOutline /><p>Trayectoria Laboral</p>
                    </div>
                    <p>{cantTrayectoriaLaboral}</p>
                </div>
                <div className='editar-btn' onClick={() => handleClickView('proyeccion-puesto')}>
                    <div className='btn-icon'>
                        <HiOutlineClipboardDocumentCheck /><p>Proyeccion de Puesto</p>
                    </div>
                    <p>{cantPuestoProyeccion}</p>
                </div>
                <div className='editar-btn' onClick={() => handleClickView('cliente-proveedor')}>
                    <div className='btn-icon'>
                        <CgNotes /><p>Cliente Proveedor</p>
                    </div>
                    <p>{cantClienteProveedor}</p>
                </div>
            </div>
        </div>
    );
};