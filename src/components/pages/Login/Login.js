import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

import './Login.css';
import axios from 'axios';
import {useState} from 'react'


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try{
        const response = await axios.post(`http://localhost:5050/auth/login`, {
            correo: email,
            contrasena: password,
        });
        console.log(response.data);
        if(response.data.valido){
            sessionStorage.setItem('refreshToken', response.data.refreshToken);
            sessionStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('tipo_usuario', response.data.tipo_usuario);
            localStorage.setItem('nombre', response.data.nombre);
            localStorage.setItem('correo', response.data.correo);
            localStorage.setItem('id_usuario', response.data.id_usuario);
            localStorage.setItem('cet', response.data.cet);
            navigate("/busqueda")
        }
    }catch{
        alert('Usuario o contraseña incorrecta.');
    }
      

    };
  
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <input type="email" placeholder="Email" value={email} id="email" onChange={handleEmailChange} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Contraseña" value={password} id="password" onChange={handlePasswordChange} />
          </div>
          <button type="submit">Iniciar Sesion</button>
        </form>
        <div className="login-image"></div>
      </div>
    );
  };
  
  export default Login;


