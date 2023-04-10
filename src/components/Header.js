import { Link } from "react-router-dom"

//Importacion de estilos
import './sharedStyles/Header.css'

//Importacion de imagenes
import Logo from '../media/images/logo.png'

function Header(){
    return(
        <div>
            <div>
            <img src={Logo}/>
                <Link to={"/busqueda"}> <button className="botones-Header">Busqueda</button> </Link>
                <Link to={"/usuarios"}> <button className="botones-Header">Usuarios</button> </Link>
            </div>
        </div>
    )
}
export default Header