import React, { useEffect, useState } from "react";
import './EditarUsuario.css'
import { Table } from "react-bootstrap";

function EditarUsuario(){
    let user = {cet:"1234", 
    username:"juanPerez",  
    psswrd:"juan12345", 
    correo:"juan@ternium.com",
    admin: 1, 
    activo: true
    }

    function clickHandler(){
        // editar dato
        // llamar usuario.fetchData
        
        let alertText = ""
        const newCET = document.getElementById("editCET").value
        const newUsr = document.getElementById("editUsername").value
        const newPass = document.getElementById("editPsswrd").value
        const newEmail = document.getElementById("editEmail").value

        if (newCET !== currCET){
            alertText += "New CET: " + newCET + "\n"
            setCET(newCET)
        }
        if (newUsr !== currUsr){
            alertText += "New usr: " + newUsr + "\n"
            setUsr(newUsr)
        }
        if (newPass !== currPass){
            alertText += "New pass: " + newPass + "\n"
            setPass(newPass)
        }
        if (newEmail !== currEmail){
            alertText += "New email: " + newEmail + "\n"
            setEmail(newEmail)
        }

        if (alertText !== ""){
            alert(alertText)
        }
    }
    const [currUsr, setUsr] = useState(user.username)
    const [currCET, setCET] = useState(user.cet)
    const [currPass, setPass] = useState(user.psswrd)
    const [currEmail, setEmail] = useState(user.correo)
    const [currAdmin, setAdmin] = useState(user.admin)
    const [currActivo, setActivo] = useState(user.activo)

    function adminToggleHandle(){

    }
    return(
        <div id="editar-usuario">

            <Table>
                <tr>
                    <td>CET</td>
                    <td>{currCET}</td>
                </tr>
                <tr>
                    <td>Nombre</td>
                    <td>{currUsr}</td>
                </tr>
                <tr>
                    <td>Correo</td>
                    <td><input id="edit-email" defaultValue={user.correo}></input></td>
                </tr>
                <tr>
                    <td>Contraseña</td>
                    <td><input id="edit-password" defaultValue={user.psswrd}></input></td>
                </tr>
                <tr>
                    <td>Admin</td>
                    <td><input type="checkbox" id="admin-toggle"></input></td>
                </tr>
                <tr>
                    <td>Activo</td>
                    <td><input type="checkbox" id="active-toggle"></input></td>
                </tr>
            </Table>

            <button onClick={clickHandler}>Actualizar</button>
            <button id="delete-user-button">Eliminar Usuario</button>
        </div>
    )
} export default EditarUsuario

