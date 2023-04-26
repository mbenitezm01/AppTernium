export default function TrayectoriaLaboral({ datos }){
    return (
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
                    {datos}
                </tbody>
            </table>
        </div>
    );
};