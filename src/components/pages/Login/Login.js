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
  
      // Prepare the login data
      const loginData = {
        email: email,
        password: password,
      };
      
      try{
        const response = await axios.post(`http://localhost:5051/auth/login`, {
            correo: email,
            contrasena: password,
          });
          console.log(response.data)
          navigate("/busqueda")
      }

      catch{
        alert("no se puede")

      }
      

    };
  
    return (
<div className="login-container">
<div className="login-image"></div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} id="email" onChange={handleEmailChange} />
          </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" value={password} id="password" onChange={handlePasswordChange} />
          </div>
        <button type="submit">Login</button>
      </form>
    </div>
    );
  };
  
  export default Login;


