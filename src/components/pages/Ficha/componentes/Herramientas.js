import { HiDownload, HiPlus, HiMinus } from 'react-icons/hi';
import { MdModeEdit } from 'react-icons/md';

export default function Herramientas ({ handleClickZoom, handleDownloadPdf, zoomContent, handleEdit }){
    return (
        <div className='herramientas'>
            <button className='btn-herramientas' onClick={() => handleClickZoom(true)}><HiMinus /></button>
            <p className='zoom-content'>{zoomContent}</p>
            <button className='btn-herramientas' onClick={() => handleClickZoom(false)}><HiPlus /></button>
            <div className='border-l'>
                <button className='btn-herramientas' onClick={handleDownloadPdf}><HiDownload /></button>
                <button className='btn-herramientas' onClick={handleEdit}><MdModeEdit /></button>
            </div>
        </div>
    );
};