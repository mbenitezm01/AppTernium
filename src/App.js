import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Busqueda from './components/pages/Busqueda/Busqueda';
import Ficha from './components/pages/Ficha/Ficha';
import Usuarios from './components/pages/Usuarios/Usuarios';
import EditarUsuario from './components/pages/Usuarios/editarUsuario/EditarUsuario';
import CrearUsuario from './components/pages/Usuarios/editarUsuario/CrearUsuario';
import EditarPassword from './components/pages/Usuarios/editarUsuario/EditarPassword';

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
          <Route><Route path='/editar-usuario/:id' element={<EditarUsuario />} /></Route>
          <Route><Route path='/crear-usuario' element={<CrearUsuario />} /></Route>
          <Route><Route path='/editar-usuario/password/:id' element={<EditarPassword />} /></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// lineas a borrar: