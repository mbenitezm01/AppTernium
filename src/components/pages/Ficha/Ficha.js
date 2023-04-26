// Imports de hooks, media y paquetes
import { useState, useEffect, useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../../media/images/logo.png';

// Import de estilos
import './Ficha.css';

// Import de todos los componentes de la ficha
import Herramientas from './componentes/Herramientas';
import SeccionPersonal from './componentes/SeccionPersonal';
import Feedback from './componentes/Feedback';
import TrayectoriaLaboral from './componentes/TrayectoriaLaboral';
import ResumenPerfil from './componentes/ResumenPerfil';

function Ficha(){
    // Declaracion de variable para guardar la informacion traida de la API
    const [info, setInfo] = useState({});

    // Declaracion de variable para manejar el zoom de la ficha
    const [zoom, setZoom] = useState(1);

    // Declaracion de variables para poder descargar la vista en pdf y del CET del empleado
    const printRef = useRef();
    const cet = useParams();

    // Funcion que maneja el evento de descargar la ficha en PDF
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

    // Funcion que hace una peticion a la API y regresa toda la info personal
    const fetchInfoEmpleado = useCallback(async () => {
        console.log('Request');
        const response = await axios.get(`http://localhost:5050/api/info-empleado/${cet.id}`);
        setInfo(response.data);
    }, []);

    // useEffect
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
    let cantUpwardFeedback = 0;
    if(info.upwardfeedback !== undefined && info.upwardfeedback.length > 0){
        renderedUpwardFeedback = info.upwardfeedback.map(data => {
            promedioUpwardFeedback += data.nota;
            cantUpwardFeedback++;
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
    let cantClienteProveedor = 0;
    if(info.clienteproveedor !== undefined && info.clienteproveedor.length > 0){
        renderedClienteProveedor = info.clienteproveedor.map(data => {
            promedioClienteProveedor += data.nota;
            cantClienteProveedor++;
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

    let renderedResumenPerfil = null;
    if(info.resumenperfil !== undefined && info.resumenperfil.length > 0){
        renderedResumenPerfil = info.resumenperfil.map(data => {
            return (
                <tr key={data.comentarios}><td>{data.comentarios}</td></tr>
            );
        });
    };

    const handleClickZoom = (zoomDirection) => {
        if(zoomDirection){
            if(zoom !== 5){
                setZoom(zoom + 1);
            }
        }else{
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
            <Herramientas handleClickZoom={handleClickZoom} handleDownloadPdf={handleDownloadPdf} zoomContent={zoomContent}/>
            <div className='main-container' style={{padding: padding}}>
                {<div ref={printRef}>
                    <div className='main-header'>
                        <p className='main-title'>{info.empleado !== undefined ? info.empleado.nombre : ''}</p>
                        <img src={Logo} className='logo'/>
                    </div>
                    <div className='body'>
                        <SeccionPersonal renderedInfoValue={renderedInfoValue} renderedEvaluaciones={renderedEvaluaciones}/>
                        <Feedback renderedData={renderedUpwardFeedback} promedio={promedioUpwardFeedback} cantidad={cantUpwardFeedback} header='upward feedback'/>
                        <Feedback renderedData={renderedClienteProveedor} promedio={promedioClienteProveedor} cantidad={cantClienteProveedor} header='cliente proveedor'/>
                        <TrayectoriaLaboral datos={renderedTrayectoriaLaboral}/>
                        <ResumenPerfil datos={renderedResumenPerfil}/>
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