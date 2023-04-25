import React from 'react'
import { useNavigate } from 'react-router-dom';

import './Login.css'

function Login(){

    const navigate = useNavigate(); // hook para navegar entre vistas    


    const userArray = [{usr:"david", psswrd:"martinez"},{usr:"leonardo",psswrd:"davinci"},{usr:"keanu", psswrd:"reeves"}]

    function displayLoginInfo(){
        // datos de prueba de login
        let usuario = {usr:"", psswrd:""}
        let usr = ""
        let psswrd = ""
        usr = document.getElementById("username").value;
        psswrd = document.getElementById("pass").value;
        //usuario = userArray.find(x => x.usr === usuario.usr);
        //usrQuery = userArray.find(x => x.usr === usr)

        if (userArray.find(x => x.usr === usr)){ // revisa el userArray, cambiar despues
            if (psswrd === userArray.find(x => x.usr === usr).psswrd){
                usuario.usr = usr;
                usuario.psswrd = psswrd
                //alert("usuario: " + usuario.usr + "\npassword: " + usuario.psswrd)
                navigate('/usuarios')
            } else {
                document.getElementById("error-msg").innerHTML = "El usuario o contraseña son incorrectos"
            }
            
        }else{
            //alert("El usuario o la contraseña son incorrectos\nPor favor verifica tu información")
            document.getElementById("error-msg").innerHTML = "El usuario o contraseña son incorrectos"
        }
    }

    
    // considerar cambiar el componente img por image
    return(
        <div id="login-page">
            <div id="login-box">
                <h2>Login</h2>
                <form>
                    <label for="username">Usuario</label><br></br>
                    <input type="text" id="username" name="usuario" required></input><br></br>
                    <label for="pass">Contraseña</label><br></br>
                    <input type="password" id="pass" name="contrasena"></input><br></br>
                </form>
                <button onClick={displayLoginInfo}>Ingresar</button><br></br>
                <p id="error-msg"></p>
            </div>
            
            <img src="../../../../TerniumLoginImg.jpeg" id="login-image" alt="logo"></img>
            
        </div>
    )
}
export default Login