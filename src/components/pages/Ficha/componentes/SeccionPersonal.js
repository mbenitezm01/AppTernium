import Header from "./Header";

export default function SeccionPersonal({ renderedInfoValue, renderedEvaluaciones}){
    return (
        <div className='personal-section'>
            <div className='personal-data'>
                <Header texto='datos personales'/>
                {renderedInfoValue !== null ? <table className='info'>{renderedInfoValue}</table> : null}
            </div>
            <div className='evaluations'>
                <Header texto='evaluaciones anuales'/>
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
    );
};