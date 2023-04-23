import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Busqueda from './components/pages/Busqueda/Busqueda';
import Ficha from './components/pages/Ficha/Ficha';
import Usuarios from './components/pages/Usuarios/Usuarios';
import Login from './components/pages/Login/Login'

//Imports de los componentes de las paginas

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='' element={<Navigate to="/busqueda" replace={true} />}/>
          <Route><Route path='/busqueda' element={<Busqueda />} /></Route>
          <Route><Route path='/ficha/:id' element={<Ficha />} /></Route>
          <Route><Route path='/usuarios' element={<Usuarios />} /></Route>
          <Route><Route path='/login' element={<Login />} /></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
