import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";

function EditarPassword(){

    const cet = useParams();

    function clickHandler(){
        const pass1 = document.getElementById("new-pass-1").value
        const pass2 = document.getElementById("new-pass-2").value
        switch (true){
            case (pass1 === "" || pass2 === ""):
                alert("Al menos uno de los campos se encuentra vacio.\nPor favor ingresa la contrasena en ambos campos.");
                break;
            case (pass1 !== pass2):
                alert("Las contraseñas no coinciden.\nPor favor verifica las contraseñas.");
                break;
            case (pass1 === pass2):
                axios.patch(`http://localhost:5050/api/info-usuario/password/${cet.id}`, {contrasena: pass1})
                break;
        }
    }

    return(
        <div>
            <Table>
                <tbody>
                    <tr>
                        <td>Nueva Contraseña</td>
                        <td><input id="new-pass-1"></input></td>
                    </tr>
                    <tr>
                        <td>Confirmar Contraseña</td>
                        <td><input id="new-pass-2"></input></td>
                    </tr>
                </tbody>
            </Table>
            <button onClick={clickHandler}>Cambiar contraseña</button>
        </div>
    )
} export default EditarPassword