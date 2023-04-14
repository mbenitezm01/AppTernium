
//Importacion de estilos
import './Lista.css'

function Lista(){
    const mockData = [
        {cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes"},
        {cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes"},
        {cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes"},
        {cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes"},
        {cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes"}


    ];

    const renderedRows = mockData.map(data => {
        return(
            <tr>
                <td><input type="checkbox"/></td>
                <td>{data.cet}</td>
                <td>{data.nombre}</td>
                <td>{data.est3}</td>
                <td>{data.est4}</td>
                <td>{data.puesto}</td>
                <td>{data.jefe}</td>
                <td>{data.antiguedad}</td>
                <td>{data.performance}</td>
                <td>{data.calif}</td>
                <td>{data.potencial}</td>
                <td>{data.keyT}</td>


            </tr>
        )
    })


    return(
        <div className="busquedaLista">
            <table>
            
                 <tr>
                    <th>checkbox</th>
                    <th>CET</th>
                    <th>Nombre</th>
                    <th>Estructura3</th>
                    <th>Estructura4</th>
                    <th>Puesto</th>
                    <th>Jefe</th>
                    <th>Antigüedad</th>
                    <th>Performance</th>
                    <th>Calificacion</th>
                    <th>Potencial</th>
                    <th>Key talent</th>
                </tr>
            {renderedRows}
        
         </table>
        </div>
        
    )
}
export default Lista