import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { read, utils } from 'xlsx';

import './Cargar.css';

const Cargar = () => {
    const [state, setState] = useState();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('empleados');

    useEffect(() => {
        if(sessionStorage.length === 0){
            localStorage.clear();
             navigate('/login');
        }
    }, []);

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result, { cellDates: true });
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setState(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const handleClick = async () => {
        console.log(selectedCategory)
        const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/agregar-${selectedCategory}`, state);
        console.log(response.data);
        alert(response.data.mensaje)

    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <h1>Cargar Archivo</h1>
            <div>
                <ul className="category-tabs">
                    <li
                        className={selectedCategory === 'empleados' ? 'active' : ''}
                        onClick={() => handleCategoryChange('empleados')}
                    >
                        Empleados
                    </li>
                    <li
                        className={selectedCategory === 'evaluaciones' ? 'active' : ''}
                        onClick={() => handleCategoryChange('evaluaciones')}
                    >
                        Evaluaciones
                    </li>
                    <li
                        className={selectedCategory === 'upward-feedback' ? 'active' : ''}
                        onClick={() => handleCategoryChange('upward-feedback')}
                    >
                        Upward Feedback
                    </li>
                    <li
                        className={selectedCategory === 'cliente-proveedor' ? 'active' : ''}
                        onClick={() => handleCategoryChange('cliente-proveedor')}
                    >
                        Cliente Proveedor
                    </li>
                    <li
                        className={selectedCategory === 'trayectoria-laboral' ? 'active' : ''}
                        onClick={() => handleCategoryChange('trayectoria-laboral')}
                    >
                        Trayectoria Laboral
                    </li>
                </ul>
            </div>
            <div className="file-upload-section">
                <h2>Cargar datos a {selectedCategory}</h2>
                <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                <button onClick={handleClick}>Subir</button>
            </div>
        </div>
    );
}
export default Cargar