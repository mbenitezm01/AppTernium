import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Busqueda from './components/pages/Busqueda/Busqueda';
import Ficha from './components/pages/Ficha/Ficha';
import Usuarios from './components/pages/Usuarios/Usuarios';
import Editar from './components/pages/Editar/Editar';
import Comparacion from './components/pages/Comparacion/Comparacion';
import Login from './components/pages/Login/Login'
import EditarUsuario from './components/pages/Usuarios/editarUsuario/EditarUsuario';
import CrearUsuario from './components/pages/Usuarios/editarUsuario/CrearUsuario';
import EditarPassword from './components/pages/Usuarios/editarUsuario/EditarPassword';

//Imports de los componentes de las paginas

const Layout = ({ children }) =>(

<>
    <Header />
    {children}
  </>
);


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Navigate to="/login" replace={true} />}/>
          <Route><Route path='/busqueda' element={<Layout><Busqueda /></Layout>} /></Route>
          <Route><Route path='/ficha/:id' element={<Layout><Ficha /></Layout>} /></Route>
          <Route><Route path='/ficha/:id/editar' element={<Layout><Editar /></Layout>} /></Route>
          <Route><Route path='/usuarios' element={<Layout><Usuarios /></Layout>} /></Route>
          <Route><Route path='/comparacion' element={<Layout><Comparacion /></Layout>} /></Route>
          <Route><Route path='/login' element={<Login />} /></Route>

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