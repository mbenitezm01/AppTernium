import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Btn from './Btn'

//Importacion de estilos
import './sharedStyles/Header.css'

//Importacion de imagenes
import Logo from '../media/images/logo.png'

function Header(){
    return(
        <div>
            <div className="header-bg">
            <img src={Logo} className="logo"/>
                <Link to={"/busqueda"}  style={{width:'200px', margin:'0'}}> <Btn text={'Busqueda'} icon={'search'}/> </Link>
                <Link to={"/usuarios"}  style={{width:'200px', margin:'0'}}> <Btn text={'Usuarios'} icon={'users'}/> </Link>
                <Link to={"/cargar"}  style={{width:'250px', margin:'0'}}> <Btn text={'Cargar Archivo'} icon={'upload'}/> </Link>
            </div>
        </div>
    )
}
export default Header