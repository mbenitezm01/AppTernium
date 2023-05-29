import { useState, useEffect } from 'react';
import axios from 'axios';
import { read, utils, writeFile } from 'xlsx';

const Cargar = () => {
    const [state, setState] = useState();

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result, {cellDates: true});
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
        //const response = await axios.post(`http://localhost:5050/api/agregar-empleados`, state);
        
    }

    useEffect(() => {
        console.log(JSON.stringify(state))
    },[state])

    return (
        <>
        <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        <button onClick={handleClick}>Submit</button>
        </>
    )
}
export default Cargar