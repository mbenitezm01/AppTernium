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
      <div class="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;