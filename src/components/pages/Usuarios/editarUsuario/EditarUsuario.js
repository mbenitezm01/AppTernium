import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate} from "react-router-dom";
import './EditarUsuario.css'
import axios from "axios";
import { Table } from "react-bootstrap";

function EditarUsuario(){
    let user = {cet:"1234", 
    username:"juanPerez",  
    psswrd:"juan12345", 
    correo:"juan@ternium.com",
    admin: 1, 
    activo: true
    }

    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(true)

    const [info, setInfo] = useState({});
    const cet = useParams();

    const fetchInfoEmpleado = useCallback(async () => {
        const response = await axios.get(`http://localhost:5050/api/info-usuario/${cet.id}`);
        setInfo(response.data[0])
        setLoading(false)
    }, []);

    useEffect(() => {
        fetchInfoEmpleado()
    }, [fetchInfoEmpleado])

    function clickHandler(){
        const newData = {
                            correo: document.getElementById("edit-email").value,
                            admin: document.getElementById("admin-toggle").checked? 1:0, 
                            activo: document.getElementById("active-toggle").checked? true:false
                        }
        
        axios.patch(`http://localhost:5050/api/info-usuario/${cet.id}`, newData)
        //console.log(newData)
        
        
    }

    function eraseUserHandler(){
        axios.delete(`http://localhost:5050/api/info-usuario/${cet.id}`)
        alert("Usuario Borrado");
        //shennanigans
        navigate('/usuarios')
    }

    function changePasswordHandler(){
        navigate(`/editar-usuario/password/${cet.id}`)
    }

    if (isLoading){
        return(<div></div>)
    }


    return(
        <div id="editar-usuario">
            <div id="erase-user-div">
                <button id="delete-user-button" onClick={eraseUserHandler}>Eliminar Usuario</button>
            </div>
            <Table id = "edit-user-table">
                <tbody>
                    <tr>
                    <td>CET</td>
                    <td>{info.empleado_cet}</td>
                    </tr>
                    <tr>
                        <td>Correo</td>
                        <td><input id="edit-email" defaultValue={info.correo}></input></td>
                    </tr>
                    <tr>
                        <td>Contraseña</td>
                        <td><button onClick={changePasswordHandler}>Cambiar Contraseña</button></td>
                    </tr>
                    <tr>
                        <td>Admin</td>
                        <td><input type="checkbox" id="admin-toggle" defaultChecked></input></td>
                    </tr>
                    <tr>
                        <td>Activo</td>
                        <td><input type="checkbox" id="active-toggle" defaultChecked></input></td>
                    </tr>
                </tbody>
                
            </Table>

            <button onClick={clickHandler}>Actualizar</button>
            
        </div>
    )
} export default EditarUsuario

