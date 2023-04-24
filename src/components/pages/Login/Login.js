import React from 'react'

import './Login.css'

function Login(){

    //const[logData, updateLogData] = useState("");

    const dataDavid = {
        usr: "david",
        psswrd : "martinez"
    };
    

    function isUser(user, query){
        return user.usr === query
    }

    const userArray = [{usr:"david", psswrd:"martinez"},{usr:"leonardo",psswrd:"davinci"},{usr:"keanu", psswrd:"reeves"}]

    function displayLoginInfo(){
        // datos de prueba de login
        let usuario = {usr:"", psswrd:""}
        let usrQuery = {usr:"", psswrd:""}
        usuario.usr = document.getElementById("username").value;
        usuario.psswrd = document.getElementById("pass").value;
        //usuario = userArray.find(x => x.usr === usuario.usr);
        usrQuery = userArray.find(x => x.usr === usuario.usr)

        if (usrQuery  !== undefined){
            if (usuario.usr === usrQuery.usr && usuario.psswrd === usrQuery.psswrd){
                alert("usuario: " + usuario.usr + "\npassword: " + usuario.psswrd)
            } else {
                document.getElementById("errorMsg").innerHTML = "El usuario o contraseña son incorrectos"
            }
            
        }else{
            //alert("El usuario o la contraseña son incorrectos\nPor favor verifica tu información")
            document.getElementById("errorMsg").innerHTML = "El usuario o contraseña son incorrectos"
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
                <p id="errorMsg"></p>
            </div>
            
            <img src="../../../../TerniumLoginImg.jpeg" id="login-image" alt="logo"></img>
            
        </div>
    )
}
export default Login