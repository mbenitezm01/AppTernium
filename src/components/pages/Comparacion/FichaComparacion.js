import React from 'react'
import SeccionPersonal from '../Ficha/componentes/SeccionPersonal'
import Feedback from '../Ficha/componentes/Feedback'
import TrayectoriaLaboral from '../Ficha/componentes/TrayectoriaLaboral'
import ResumenPerfil from '../Ficha/componentes/ResumenPerfil'
import Logo from '../../../media/logo-ternium.jpeg'


export const FichaComparacion = ({info}) => {

    let renderedInfoValue = null;
    if(info.empleado !== undefined){
        renderedInfoValue = (
            <tbody>
                <tr key={info.empleado.fecha_nacimiento.slice(0,10)}>
                    <td className='border-r'>Edad</td>
                    <td>{info.empleado.fecha_nacimiento.slice(0,10) || 0}</td>
                </tr>
                <tr key={info.empleado.antiguedad}>
                    <td className='border-r'>Antiguedad</td>
                    <td>{info.empleado.antiguedad || 0}</td>
                </tr>
                <tr key='estudios'>
                    <td className='border-r'>Estudios</td>
                    <td>{info.empleado.estudios ? 1 : 0}</td>
                </tr>
                <tr key='universidad'>
                    <td className='border-r'>Universidad</td>
                    <td>{info.empleado.estudios || 0}</td>
                </tr>
                <tr key={info.empleado.puesto}>
                    <td className='border-r'>Puesto</td>
                    <td>{info.empleado.puesto || ''}</td>
                </tr>
                <tr key={info.empleado.estructura_3}>
                    <td className='border-r'>Estructura 3</td>
                    <td>{info.empleado.estructura_3 || ''}</td>
                </tr>
                <tr key={info.empleado.estructura_4}>
                    <td className='border-r'>Estructura 4</td>
                    <td>{info.empleado.estructura_4 || ''}</td>
                </tr>
                <tr key={info.empleado.direccion}>
                    <td className='border-r'>Direccion</td>
                    <td>{info.empleado.direccion || ''}</td>
                </tr>
                <tr key={info.empleado.pc}>
                    <td className='border-r'>PC-CAT</td>
                    <td>{info.empleado.pc + ' - ' + (info.empleado.cat || '') || ''}</td>
                </tr>
            </tbody>
        );
    };

    // Se cargan los datos de las evaluaciones
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

    // Se cargan los datos de upward feedback al igual que el promedio de las evaluaciones y la cantidad de comentarios
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

    // Se cargan los datos de cliente proveedor al igual que el promedio de las evaluaciones y la cantidad de comentarios
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

    // Se cargan los datos de la trayectoria laboral
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

    // Se cargan los datos del resumen del perfil
    let renderedResumenPerfil = null;
    if(info.resumenperfil !== undefined && info.resumenperfil.length > 0){
        renderedResumenPerfil = info.resumenperfil.map(data => {
            return (
                <p className='resumen-perfil' key={data.comentarios}>{data.comentarios}</p>
            );
        });
    };
  return (
    <div className='ficha-comparacion'>
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
    </div>
    )
}
