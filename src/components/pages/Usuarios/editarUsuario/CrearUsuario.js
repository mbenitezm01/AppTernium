import React from "react";
import { Table } from "react-bootstrap";

function CrearUsuario(){

    function clickHandler(){
        //alert("crear usuario")
        let alertMssg = ""
        let cet = document.getElementById("create-cet").value
        if (isNaN(cet)){
            //alert("error en el cet")
            alertMssg += "Error en el campo CET\n"
        } else {
            //alert("ta bn")
        }
        
    }

    return(
        <div id="crear-usuario">
            <Table>
                <tr>
                    <td>CET</td>
                    <td><input id="create-cet"></input></td>
                </tr>
                <tr>
                    <td>Nombre de Usuario</td>
                    <td><input id="create-username"></input></td>
                </tr>
                <tr>
                    <td>Correo</td>
                    <td><input id="create-email"></input></td>
                </tr>
                <tr>
                    <td>Contraseña</td>
                    <td><input id="create-password"></input></td>
                </tr>
                <tr>
                    <td>Admin</td>
                    <td><input type="checkbox" id="create-admin-toggle"></input></td>
                </tr>
                <tr>
                    <td>Activo</td>
                    <td><input type="checkbox" id="create-active-toggle" defaultChecked></input></td>
                </tr>
            </Table>

            <button onClick={clickHandler}>Crear Usuario</button>
            
        </div>
    )
} export default CrearUsuario