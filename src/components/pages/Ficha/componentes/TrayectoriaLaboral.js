export default function TrayectoriaLaboral({ datos }){
    console.log(datos);
    return (
        <div className='work-history'>
            <div className='header'>
                <p>TRAYECTORIA LABORAL</p>
            </div>
            {datos !== null ?
            <table className='info'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Empresa</th>
                        <th>Puesto</th>
                    </tr>
                </thead>
                <tbody>
                    {datos}
                </tbody>
            </table> : null}
        </div>
    );
};