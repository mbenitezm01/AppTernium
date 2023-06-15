import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Btn from './Btn'

//Importacion de estilos
import './sharedStyles/Header.css'

//Importacion de imagenes
// import Logo from '../media/images/logo.png'
import Logo from '../media/logo-ternium.jpeg';

function Header(){
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/logout`, {
                refreshToken: sessionStorage.getItem('refreshToken')
            });
            localStorage.clear();
            sessionStorage.clear();
            navigate('/login');
        }catch{
            alert('Error en el sistema, volver a intentar');
        }
        
    };
    return(
        <div>
            <div className="header-bg">
                <div>
                    <img src={Logo} className="logo"/>
                    <Link to={"/busqueda"}  style={{width:'200px', margin:'0'}}> <Btn text={'Busqueda'} icon={'search'}/> </Link>
                    {localStorage.getItem('tipo_usuario') === 'administrador' ? <Link to={"/cargar"}  style={{width:'250px', margin:'0'}}> <Btn text={'Cargar Archivo'} icon={'upload'}/> </Link> : null}
                    {localStorage.getItem('tipo_usuario') === 'administrador' ? <Link to={"/usuarios"}  style={{width:'200px', margin:'0'}}> <Btn text={'Usuarios'} icon={'users'}/> </Link> : null}
                </div>
                <div>
                    <Btn style={{width:'200px', margin:'0'}} text={'Log out'} icon={'logout'} onClick={handleLogOut}/>
                </div>
                
            </div>
        </div>
    )
}
export default Header