//import { Link } from "react-router-dom"
import Sidebar from './Sidebar.js'
import Lista from './Lista.js'


//Importacion de estilos
import './Busqueda.css'

function Busqueda(){
    return(
        <div className='view-container'>
            <Sidebar />
            <Lista />
        </div>
    )
}
export default Busqueda