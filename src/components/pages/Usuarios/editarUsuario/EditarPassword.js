import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {BsArrowBarUp} from 'react-icons/bs'

import './CrearUsuario.css'

function EditarPassword(){

    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('tipo_usuario') === 'observador') navigate('/busqueda');
    }, []);
    
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
                if (window.confirm("Cambiar contraseña?")){
                    axios.patch(`http://localhost:5050/api/info-usuario/password/${cet.id}`, {contrasena: pass1})
                    alert("Contraseña cambiada exitosamente")
                    navigate(`/editar-usuario/${cet.id}`)
                }
                break;
        }
    }

    function returnHandler(){
        navigate(`/editar-usuario/${cet.id}`)
    }

    return(
        <div>
            <div className="header-buttons">
                <button onClick={returnHandler}><AiOutlineArrowLeft/>Regresar</button>
            </div>
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
            <button onClick={clickHandler}>Cambiar contraseña <BsArrowBarUp/></button>
        </div>
    )
} export default EditarPassword