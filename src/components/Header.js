import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

//Importacion de estilos
import './sharedStyles/Header.css'

//Importacion de imagenes
import Logo from '../media/images/logo.png'

function Header(){
    return(
        <div>
            <div className="header-bg">
            <img src={Logo} className="logo"/>
                <Link to={"/busqueda"}> <Button variant="outline-dark" className="button-header">Busqueda</Button> </Link>
                <Link to={"/usuarios"}> <Button variant="outline-dark" className="button-header">Usuarios</Button> </Link>
                
            </div>
        </div>
    )
}
export default Header