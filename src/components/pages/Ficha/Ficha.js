import { useState } from 'react';
import Logo from '../../../media/images/logo.png';
import './Ficha.css';
//Importacion de estilos

function Ficha({ empleado }){
    const [zoom, setZoom] = useState(1);

    const personalData = [
        {title: 'Edad', value: 44},
        {title: 'Antigüedad', value: 3},
        {title: 'Estudios', value: 0},
        {title: 'Universidad', value: 0},
        {title: 'Area Manager', value: 'Pesqueria 2'},
        {title: 'Direccion', value: 'Automacion y Control Tx'},
        {title: 'Puesto', value: 'Ingeniero en automacion'},
        {title: 'PC-CAT', value: '51 - 51'}
    ]

    const evaluaciones = [
        {title: 2022, pref: 4, potencial: 'AP (MT)', curva: 'TX DIMA CI'},
        {title: 2021, pref: 5, potencial: 'PROM (M)', curva: 'TX DIMA CI'},
        {title: 2020, pref: 4, potencial: 'PROM (M)', curva: 'TX DIMA CI'},
        {title: 2019, pref: null, potencial: null, curva: null},
        {title: 2017, pref: null, potencial: null, curva: null},
        {title: 2016, pref: null, potencial: null, curva: null},
    ];

    const upwardFeedback = [];

    const clienteProveedor = [
        {nota: 5, comentario: 'Conocimientos y vocacion de servicio'},
        {nota: 5, comentario: 'Excelente elemento, con alto sentido de orientación al servicio, y alto conocimiento técnico.'},
        {nota: 4, comentario: 'Su aporte técnico y liderazgo ha sido clave para varios hitos del proyecto'},
        {nota: 5, comentario: 'Cuando se presentan problemas viene con soluciones. Muy efectivo en su trabajo y mucho compromiso. Debe mejorar el control del estrés ante la presión.'}
    ];

    const trayectoriaLaboral = [
        {fecha: '2005-01-22', empresa: 'CEMEX', puesto: 'Mecanico'},
        {fecha: '2008-10-16', empresa: 'BAT', puesto: 'Ingeniero en sistemas'},
        {fecha: '2017-06-02', empresa: 'John Deere', puesto: 'Mecanico'}
    ]

    const renderedInfoValue = personalData.map(data => {
        return (
            <tr>
                <td className='border-r'>{data.title}</td>
                <td>{data.value}</td>
            </tr>
        )
    });

    const renderedEvaluaciones = evaluaciones.map(data => {
        return (
            <tr>
                <td>{data.title}</td>
                <td>{data.pref}</td>
                <td>{data.potencial}</td>
                <td>{data.curva}</td>
            </tr>
        );
    });

    const renderedClienteProveedor = clienteProveedor.map(data => {
        return (
            <tr>
                <td className='border-r'>{data.nota}</td>
                <td>{data.comentario}</td>
            </tr>
        );
    });
    
    const renderedTrayectoriaLaboral = trayectoriaLaboral.map(data => {
        return (
            <tr>
                <td>{data.fecha}</td>
                <td>{data.empresa}</td>
                <td>{data.puesto}</td>
            </tr>
        );
    });

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
        <div className='main-container' style={{padding: padding}}>
            <div className='main-header'>
                {/* Deberia ir el nombre del empleado pasado como prop */}
                <p>Juan Gzz Gzz</p>
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
                            <p>UPWARD FEEDBACK: {upwardFeedback.length}</p>
                        </div>
                        <div>
                            <p>Promedio: 0</p>
                        </div>
                    </div>
                </div>
                <div className='client-provider'>
                    <div className='comment-header'>
                        <div>
                            <p>CLIENTE PROVEEDOR: {clienteProveedor.length}</p>
                        </div>
                        <div>
                            <p>Promedio: 0</p>
                        </div>
                    </div>
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
                </div>
                <div className='work-history'>
                    <div className='header'>
                        <p>TRAYECTORIA LABORAL</p>
                    </div>
                    <table className='info'>
                        <thead>
                            <th>Fecha</th>
                            <th>Empresa</th>
                            <th>Puesto</th>
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
            <div className='zoom'>
                <button className='rounded-l' onClick={() => handleClickZoom(false)}>+</button>
                <button className='rounded-r' onClick={() => handleClickZoom(true)}>-</button>
            </div>
        </div>
    )
}
export default Ficha