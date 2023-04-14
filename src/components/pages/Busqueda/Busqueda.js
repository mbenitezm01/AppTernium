//import { Link } from "react-router-dom"
import Sidebar from './Sidebar.js'

//Importacion de estilos
import './Busqueda.css'

function Busqueda(){
    return(
        <div className='view-container'>
            <Sidebar />
            <div>Busqueda</div>
        </div>
    )
}
export default Busqueda