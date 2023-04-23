import React, {useEffect, useState} from 'react'

import './Login.css'

function Login(){

    //const[logData, updateLogData] = useState("");

    const dataDavid = {
        usr: "david",
        psswrd : "martinez"
    };

    let usr = ""
    let psswrd = ""

    function displayLoginInfo(){
        
        usr = document.getElementById("username").value;
        psswrd= document.getElementById("pass").value;
        if (usr === dataDavid.usr && psswrd === dataDavid.psswrd){
            alert("Hola, David!")
        } else{
            alert("El usuario o la contraseña son incorrectos\nPor favor verifica tu información")
        }
    }

    

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
            </div>
            <img src="../../../../logo512.png" alt="logo"></img>
        </div>
    )
}
export default Login