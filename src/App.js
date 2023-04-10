import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Busqueda from './components/pages/Busqueda/Busqueda';
import Ficha from './components/pages/Ficha/Ficha';
import Usuarios from './components/pages/Usuarios/Usuarios';

//Imports de los componentes de las paginas

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route><Route path='/busqueda' element={<Busqueda />} /></Route>
          <Route><Route path='/ficha' element={<Ficha />} /></Route>
          <Route><Route path='/usuarios' element={<Usuarios />} /></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
