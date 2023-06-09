import { useNavigate } from 'react-router';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { BiFileBlank } from 'react-icons/bi';
import { CgNotes } from 'react-icons/cg';
import { MdWorkOutline } from 'react-icons/md';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { GrContactInfo } from 'react-icons/gr';

export default function PerfilSideBar({ cet, empleado, cantUpwardFeedback, cantClienteProveedor, cantEvaluacion, cantTrayectoriaLaboral, cantPuestoProyeccion ,setEditarView }){
    const navigate = useNavigate();
    
    const handleClickView = (view) => {
        setEditarView(view);
    };


    return (
        <div className="perfil">
            <div className="perfil-header">
                <FaArrowLeft className='regresar-btn' onClick={() => navigate(`/ficha/${cet}`)}/>
                <FaUserCircle className="perfil-foto"/>
                <p>{empleado === null ? '' : empleado.nombre}</p>
            </div>
            <div className='perfil-body'>
                <div className='editar-btn' onClick={() => handleClickView('info-personal')}>
                    <div className='btn-icon'>
                        <GrContactInfo /><p>Información personal</p>
                    </div>
                </div>
                <div className='info-general'></div>
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
                <div className='editar-btn' onClick={() => handleClickView('puesto-proyeccion')}>
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