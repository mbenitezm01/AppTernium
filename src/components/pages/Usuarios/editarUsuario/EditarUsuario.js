import React, { useEffect, useState } from "react";
// import usuario from ./hifhai
function EditarUsuario(){
    let user = {cet:"1234", username:"juanPerez",  psswrd:"juan12345", correo:"juan@ternium.com" }

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
    return(
        <div id="editar-usuario">
            <div id="editData">
                <input id="editCET" defaultValue={user.cet}></input>
                <input id="editUsername" defaultValue={user.username}></input>
                <input id="editPsswrd" defaultValue={user.psswrd}></input>
                <input id="editEmail" defaultValue={user.correo}></input>
                
            </div>
            <button onClick={clickHandler}>Actualizar</button>
        </div>
    )
} export default EditarUsuario

