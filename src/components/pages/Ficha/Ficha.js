import { useState, useEffect, useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../../media/images/logo.png';
import './Ficha.css';
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
        pdf.save(info.empleado !== null ? `${info.empleado.nombre}.pdf` : 'empleado.pdf');
    };

    const fetchInfoEmpleado = useCallback(async () => {
        const response = await axios.get(`http://localhost:5050/info-empleado/${cet.id}`);
        setInfo(response.data);
    }, []);

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
                    <td className='border-r'>Area Manager</td>
                    <td>{info.empleado.area_manager || ''}</td>
                </tr>
                <tr>
                    <td className='border-r'>Direccion</td>
                    <td>{info.empleado.direccion || ''}</td>
                </tr>
                <tr>
                    <td className='border-r'>Puesto</td>
                    <td>{info.empleado.puesto || ''}</td>
                </tr>
                <tr>
                    <td className='border-r'>PC-CAT</td>
                    <td>{info.empleado.pc_cat || ''}</td>
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
            if(zoom === 1){
                setZoom(2);
            }else if(zoom === 2){
                setZoom(3);
            }
        }else{
            if(zoom === 3){
                setZoom(2);
            }else if(zoom === 2){
                setZoom(1);
            }
        }
    };

    let padding = 0;
    if(zoom === 1){
        padding = 30;
    }else if(zoom === 2){
        padding = 60;
    }else if(zoom === 3){
        padding = 90;
    }

    return(
        <div className='page'>
            <div className='herramientas'>
                <button onClick={() => handleClickZoom(false)}>+</button>
                <button onClick={() => handleClickZoom(true)}>-</button>
                <button onClick={handleDownloadPdf}>print</button>
            </div>
            <div className='main-container' style={{padding: padding}}>
                <div ref={printRef}>
                    <div className='main-header'>
                        <p>{info.empleado !== undefined ? info.empleado.nombre : ''}</p>
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
                    {/* <div className='zoom'>
                        <button className='rounded-l' onClick={() => handleClickZoom(false)}>+</button>
                        <button className='rounded-r' onClick={() => handleClickZoom(true)}>-</button>
                    </div>
                    <div className='zoom'>
                        <button onClick={handleDownloadPdf}>Download</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default Ficha