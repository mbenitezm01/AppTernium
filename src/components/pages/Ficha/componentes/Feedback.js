export default function Feedback({ renderedData, cantidad, promedio, header}){
    const contenidoHeader = header !== undefined ? header.toUpperCase() : ' ';
    return(
        <div className="feedback">
            <div className='comment-header'>
                <div>
                    <p>{contenidoHeader} {renderedData !== undefined ? cantidad : 0}</p>
                </div>
                <div>
                    <p>Promedio {promedio !== undefined ? promedio.toFixed(1) : 0}</p>
                </div>
            </div>
            {renderedData !== null ? 
            <table className='info'>
                <thead>
                    <tr>
                        <th>Nota</th>
                        <th>Comentario</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedData}
                </tbody>
            </table>
            : null}
        </div>
    );
};