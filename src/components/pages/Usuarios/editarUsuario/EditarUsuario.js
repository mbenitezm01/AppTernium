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
        // const newCET = document.getElementById("editCET").value
        // const newUsr = document.getElementById("editUsername").value
        const newPass = document.getElementById("edit-password").value
        const newEmail = document.getElementById("edit-email").value


        // if (newCET !== currCET){
        //     alertText += "New CET: " + newCET + "\n"
        //     setCET(newCET)
        // }
        // if (newUsr !== currUsr){
        //     alertText += "New usr: " + newUsr + "\n"
        //     setUsr(newUsr)
        // }

        if (newPass !== currPass){
            alertText += "New pass: " + newPass + "\n"
            setPass(newPass)
        }
        if (newEmail !== currEmail){
            alertText += "New email: " + newEmail + "\n"
            setEmail(newEmail)
        }
        
        // determina permisos de administrador
        var isAdmin = document.getElementById("admin-toggle")
        if (isAdmin.checked){
            alertText += "is admin\n";
        } else {
            alertText += "is not admin\n";
        }

        // determina permisos de actividad
        var isActive = document.getElementById("active-toggle")
        if(isActive.checked){
            alertText += "is active\n";
        } else {
            alertText += "is not active\n";
        }

        if (alertText !== ""){
            alert(alertText)
        }
        
    }
    //const [currUsr, setUsr] = useState(user.username)
    const [currCET, setCET] = useState(user.cet)
    const [currPass, setPass] = useState(user.psswrd)
    const [currEmail, setEmail] = useState(user.correo)
    const [currAdmin, setAdmin] = useState(user.admin)
    const [currActivo, setActivo] = useState(user.activo)

    
    



    function eraseUserHandler(){
        alert("Erase user");
    }


    return(
        <div id="editar-usuario">
            <div id="erase-user-div">
                <button id="delete-user-button" onClick={eraseUserHandler}>Eliminar Usuario</button>
            </div>
            <Table>
                <tr>
                    <td>CET</td>
                    <td>{currCET}</td>
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
                    <td><input type="checkbox" id="admin-toggle" defaultChecked></input></td>
                </tr>
                <tr>
                    <td>Activo</td>
                    <td><input type="checkbox" id="active-toggle" defaultChecked></input></td>
                </tr>
            </Table>

            <button onClick={clickHandler}>Actualizar</button>
            
        </div>
    )
} export default EditarUsuario

