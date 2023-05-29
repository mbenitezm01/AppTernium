import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate} from "react-router-dom";
import './EditarUsuario.css'
import axios from "axios";
import { Table } from "react-bootstrap";
import { AiOutlineArrowLeft, AiFillEdit, AiFillDelete } from "react-icons/ai";
import {BsArrowBarUp} from 'react-icons/bs'

function EditarUsuario(){

    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(true)

    const [info, setInfo] = useState({});
    const cet = useParams();

    const [adminCheck, setAdmin] = useState(0)
    const [activeCheck, setActive] = useState(false)

    const fetchInfoEmpleado = useCallback(async () => {
        const response = await axios.get(`http://localhost:5050/api/info-usuario/${cet.id}`);
        setInfo(response.data[0])
        setLoading(false)
    }, []);

    useEffect(() => {
        fetchInfoEmpleado()
    }, [fetchInfoEmpleado])

    useEffect(() => {
        setAdmin(info.admin)
        setActive(info.activo)
    },[info])

    function clickHandler(){
        const newData = {
            correo: document.getElementById("edit-email").value,
            admin: document.getElementById("admin-toggle").checked? 1:0, 
            activo: document.getElementById("active-toggle").checked? true:false
        }
        
        if (window.confirm("Guardar cambios?")){
            axios.patch(`http://localhost:5050/api/info-usuario/${cet.id}`, newData)
            alert("Cambios guardados exitosamente")
        }
    }

    function eraseUserHandler(){
        if (window.confirm("Deseas eliminar este usuario?\nEsta acción no se puede revertir.")){
            axios.delete(`http://localhost:5050/api/info-usuario/${cet.id}`)
            navigate('/usuarios')
        }
        
    }

    function returnHandler(){
        navigate('/usuarios')
    }

    function changePasswordHandler(){
        navigate(`/editar-usuario/password/${cet.id}`)
    }

    function adminClickHandler(){
        setAdmin((adminCheck===0)?1:0)
    }

    function activeClickHandler(){
        setActive(!activeCheck)
    }

    if (isLoading){
        return(<div></div>)
    }


    return(
        <div id="editar-usuario">
            <div id="erase-user-div">
                <button id="return-to-table" onClick={returnHandler}><AiOutlineArrowLeft/> Regresar</button>
                <button id="delete-user-button" onClick={eraseUserHandler}><AiFillDelete/>Eliminar Usuario</button>
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
                        <td><button onClick={changePasswordHandler}>Cambiar Contraseña <AiFillEdit/></button></td>
                    </tr>
                    <tr>
                        <td>Admin</td>
                        <td><input type="checkbox" id="admin-toggle" checked={adminCheck} onClick={adminClickHandler}></input></td>
                    </tr>
                    <tr>
                        <td>Activo</td>
                        <td><input type="checkbox" id="active-toggle" checked={activeCheck} onClick={activeClickHandler}></input></td>
                    </tr>
                </tbody>
                
            </Table>

            <button onClick={clickHandler}>Actualizar <BsArrowBarUp/></button>
            
        </div>
    )
} export default EditarUsuario

