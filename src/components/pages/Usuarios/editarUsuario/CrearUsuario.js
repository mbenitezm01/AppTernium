import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {BsArrowBarUp} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

import './CrearUsuario.css'

function CrearUsuario(){

    const navigate = useNavigate()

    useEffect(() => {
        if(sessionStorage.length === 0) {
            localStorage.clear();
            navigate('/login');
        }
        
        if(localStorage.getItem('tipo_usuario') !== 'administrador') navigate('/busqueda');
    }, []);

    function clickHandler(){
        let allGood = true
        //alert("crear usuario")
        let newAdmin = document.getElementById("create-admin-toggle").checked? 1 : 0;
        let newActive = document.getElementById("create-active-toggle").checked? true : false;

        let alertMssg = ""
        let newCet = document.getElementById("create-cet").value
        let newCorreo = document.getElementById("create-email").value
        let newPass = document.getElementById("create-password").value

        if (isNaN(newCet)){
            //alert("error en el cet")
            alertMssg += "Error en el campo CET\n"
            allGood = false
        }
        if (newCorreo === ""){
            alertMssg += "Error en el campo correo\n"
            allGood = false
        }
        if (newPass === ""){
            alertMssg += "Error en el campo contraseña\n"
            allGood = false
        }
        if (allGood === false){
            alert(alertMssg)
        } else {
            const newUserData = {
                correo: newCorreo,
                contrasena: newPass,
                admin: newAdmin,
                empleado_cet: +newCet,
                activo: newActive
            }
            if (window.confirm("Crear nuevo usuario?")){
                axios.post(`${process.env.REACT_APP_API_HOST}/api/agregar-usuario`, newUserData)
                alert("Usuario creado exitosamente")
                navigate('/usuarios')
            }
        }
    }

    function returnHandler(){
        navigate('/usuarios')
    }

    return(
        <div className="crear-usuario-fondo">
            <div className="crear-usuario">
                <div className= "header-buttons">
                    <button className="return-button" onClick={returnHandler}><AiOutlineArrowLeft/>Regresar</button>
                </div>
                <Table className='tabla-crear-usuario'>
                    <tr>
                        <td className='left'>CET</td>
                        <td className='right'><input id="create-cet"></input></td>
                    </tr>
                    <tr>
                        <td className='left'>Correo</td>
                        <td className='right'><input id="create-email"></input></td>
                    </tr>
                    <tr>
                        <td className='left'>Contraseña</td>
                        <td className='right'><input id="create-password"></input></td>
                    </tr>
                    <tr>
                        <td className='left'>Admin</td>
                        <td className='right'><input type="checkbox" id="create-admin-toggle"></input></td>
                    </tr>
                    <tr>
                        <td className='left'>Activo</td>
                        <td className='right'><input type="checkbox" id="create-active-toggle" defaultChecked></input></td>
                    </tr>
                </Table>

                <button onClick={clickHandler}>Crear Usuario <BsArrowBarUp/></button>
                
            </div>
        </div>
    )
} export default CrearUsuario