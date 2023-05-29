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
                <div>
                    <img src={Logo} className="logo"/>
                    <Link to={"/busqueda"}  style={{width:'200px', margin:'0'}}> <Btn text={'Busqueda'} icon={'search'}/> </Link>
                    <Link to={"/usuarios"}  style={{width:'200px', margin:'0'}}> <Btn text={'Usuarios'} icon={'users'}/> </Link>
                </div>
                <div>
                    <Link to={"/login"}  style={{width:'200px', margin:'0'}}> <Btn text={'Log out'} icon={'logout'}/> </Link>
                </div>

            </div>
        </div>
    )
}
export default Header