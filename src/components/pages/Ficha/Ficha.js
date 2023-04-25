import { useState, useEffect, useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../../media/images/logo.png';
import './Ficha.css';
import { HiDownload, HiPlus, HiMinus } from 'react-icons/hi';
import { MdModeEdit } from 'react-icons/md';
//Importacion de estilos

function Ficha(){
    const [zoom, setZoom] = useState(1);
    const [info, setInfo] = useState({});
    const printRef = useRef();
    const cet = useParams();

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const name = info.empleado.nombre.replace(/ /g, '_');
        pdf.save(info.empleado !== undefined ? `${info.empleado.cet}_${name}.pdf` : 'empleado.pdf');
    };

    const fetchInfoEmpleado = useCallback(async () => {
        console.log('Request');
        const response = await axios.get(`http://localhost:5050/api/info-empleado/${cet.id}`);
        setInfo(response.data);
    }, []);

    // const fetchInfoEmpleado = useCallback(async () => {
    //     const response = await axios.get(`http://localhost:5050/info-empleado/${cet.id}`);
    //     setInfo(response.data);
    // }, [cet.id]);

    useEffect(() => {
        fetchInfoEmpleado();
    }, [fetchInfoEmpleado]);

    let renderedInfoValue = null;
    if(info.empleado !== undefined){
        renderedInfoValue = (
            <tbody>
                <tr>
                    <td className='border-r'>Edad</td>
                    <td>{info.empleado.fecha_nacimiento.slice(0,10) || 0}</td>
                </tr>
                <tr>
                    <td className='border-r'>Antiguedad</td>
                    <td>{info.empleado.antiguedad || 0}</td>
                </tr>
                <tr>
                    <td className='border-r'>Estudios</td>
                    <td>{info.empleado.estudios ? 1 : 0}</td>
                </tr>
                <tr>
                    <td className='border-r'>Universidad</td>
                    <td>{info.empleado.estudios || 0}</td>
                </tr>
                <tr>
                    <td className='border-r'>Estructura 3</td>
                    <td>{info.empleado.estructura_3 || ''}</td>
                </tr>
                <tr>
                    <td className='border-r'>Estructura 4</td>
                    <td>{info.empleado.estructura_4 || ''}</td>
                </tr>
                <tr>
                    <td className='border-r'>Estructura 5</td>
                    <td>{info.empleado.estructura_5 || ''}</td>
                </tr>
                <tr>
                    <td className='border-r'>Direccion</td>
                    <td>{info.empleado.direccion || ''}</td>
                </tr>
                <tr>
                    <td className='border-r'>PC-CAT</td>
                    <td>{info.empleado.pc + ' - ' + (info.empleado.cat || '') || ''}</td>
                </tr>
            </tbody>
        );
    };

    let renderedEvaluaciones = null;
    if(info.evaluacion !== undefined && info.evaluacion.length > 0){
        renderedEvaluaciones = info.evaluacion.map(data => {
            return (
                <tr key={data.title}>
                    <td>{data.fecha.slice(0, 4) || ''}</td>
                    <td>{data.performance || 0}</td>
                    <td>{data.potencial || ''}</td>
                    <td>{data.curva || ''}</td>
                </tr>
            );
        });
    };

    let promedioUpwardFeedback = 0;
    let renderedUpwardFeedback = null;
    if(info.upwardfeedback !== undefined && info.upwardfeedback.length > 0){
        renderedUpwardFeedback = info.upwardfeedback.map(data => {
            promedioUpwardFeedback += data.nota;
            return (
                <tr key={data.comentarios}>
                    <td className='border-r'>{data.nota}</td>
                    <td>{data.comentarios}</td>
                </tr>
            );
        });
        promedioUpwardFeedback /= info.upwardfeedback.length 
    };

    let promedioClienteProveedor = 0;
    let renderedClienteProveedor = null;
    if(info.clienteproveedor !== undefined && info.clienteproveedor.length > 0){
        renderedClienteProveedor = info.clienteproveedor.map(data => {
            promedioClienteProveedor += data.nota
            return (
                <tr key={data.comentarios}>
                    <td className='border-r'>{data.nota}</td>
                    <td>{data.comentarios}</td>
                </tr>
            );
        });
        promedioClienteProveedor /= info.clienteproveedor.length;
    };

    let renderedTrayectoriaLaboral = null;
    if(info.trayectorialaboral !== undefined && info.trayectorialaboral.length > 0){
        renderedTrayectoriaLaboral = info.trayectorialaboral.map(data => {
            return (
                <tr key={data.fecha + data.empresa}>
                    <td>{data.fecha.slice(0, 10)}</td>
                    <td>{data.empresa}</td>
                    <td>{data.puesto}</td>
                </tr>
            );
        });
    }

    const handleClickZoom = (zoomDirection) => {
        if(zoomDirection){
            // if(zoom === 1){
            //     setZoom(2);
            // }else if(zoom === 2){
            //     setZoom(3);
            // }
            if(zoom !== 5){
                setZoom(zoom + 1);
            }
        }else{
            // if(zoom === 3){
            //     setZoom(2);
            // }else if(zoom === 2){
            //     setZoom(1);
            // }
            if(zoom !== 1){
                setZoom(zoom - 1);
            }
        }
    };

    let zoomContent = null;
    let padding = 0;
    if(zoom === 1){
        zoomContent = '100%';
        padding = 30;
    }else if(zoom === 2){
        zoomContent = '83.3%';
        padding = 60;
    }else if(zoom === 3){
        zoomContent = '75%';
        padding = 70;
    }else if(zoom === 4){
        zoomContent = '63.3%';
        padding = 90;
    }else if(zoom === 5){
        zoomContent = '50%';
        padding = 120;
    }

    return(
        <div className='page'>
            <div className='herramientas'>
                <button className='btn-herramientas' onClick={() => handleClickZoom(true)}><HiMinus /></button>
                <p className='zoom-content'>{zoomContent}</p>
                <button className='btn-herramientas' onClick={() => handleClickZoom(false)}><HiPlus /></button>
                <div className='border-l'>
                    <button className='btn-herramientas' onClick={handleDownloadPdf}><HiDownload /></button>
                    <button className='btn-herramientas'><MdModeEdit /></button>
                </div>
            </div>
            <div className='main-container' style={{padding: padding}}>
                {<div ref={printRef}>
                    <div className='main-header'>
                        <p className='main-title'>{info.empleado !== undefined ? info.empleado.nombre : ''}</p>
                        <img src={Logo} className='logo'/>
                    </div>
                    <div className='body'>
                        <div className='personal-section'>
                            <div className='personal-data'>
                                <div className='header'>
                                    <p>DATOS PERSONALES</p>
                                </div>
                                <table className='info'>
                                    {renderedInfoValue}
                                </table>
                            </div>
                            <div className='evaluations'>
                                <div className='header'>
                                    <p>EVALUACIONES ANUALES</p>
                                </div>
                                <table className='info'>
                                    <thead>
                                        <tr>
                                            <th>Año</th>
                                            <th>PERF</th>
                                            <th>POTENCIAL</th>
                                            <th>CURVA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderedEvaluaciones}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='upward-feedback'>
                            <div className='comment-header'>
                                <div>
                                    <p>UPWARD FEEDBACK: {info.upwardfeedback !== undefined ? info.upwardfeedback.length : 0}</p>
                                </div>
                                <div>
                                    <p>Promedio: {promedioUpwardFeedback.toFixed(1) || 0}</p>
                                </div>
                            </div>
                            {renderedUpwardFeedback !== null ? 
                            <table className='info'>
                                <thead>
                                    <tr>
                                        <th>Nota</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderedUpwardFeedback}
                                </tbody>
                            </table>
                            : null}
                        </div>
                        <div className='client-provider'>
                            <div className='comment-header'>
                                <div>
                                    <p>CLIENTE PROVEEDOR: {info.clienteproveedor !== undefined ? info.clienteproveedor.length : 0}</p>
                                </div>
                                <div>
                                    <p>Promedio: {promedioClienteProveedor.toFixed(1) || 0}</p>
                                </div>
                            </div>
                            {renderedClienteProveedor !== null ?
                            <table className='info'>
                                <thead>
                                    <tr>
                                        <th>Nota</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderedClienteProveedor}
                                </tbody>
                            </table>
                            : null}
                        </div>
                        <div className='work-history'>
                            <div className='header'>
                                <p>TRAYECTORIA LABORAL</p>
                            </div>
                            <table className='info'>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Empresa</th>
                                        <th>Puesto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderedTrayectoriaLaboral}
                                </tbody>
                            </table>
                        </div>
                        <div className='profile-summary'>
                            <div className='header'>
                                <p>RESUMEN PERFIL</p>
                            </div>
                        </div>
                        <div className='potential-job'>
                            <div className='header'>
                                <p>PUESTOS DE PROYECCIÓN</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default Ficha