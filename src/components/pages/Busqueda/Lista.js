import React from 'react'
import { useTable, useRowSelect } from 'react-table'

//Importacion de estilos
import './Lista.css'



function Lista() {

    const data = React.useMemo(
        () => [
            { cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 12, nombre: "pepe", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'CET',
                accessor: 'cet', // accessor is the "key" in the data
            },
            {
                Header: 'Nombre',
                accessor: 'nombre',
            },
            {
                Header: 'Estructura 3',
                accessor: 'est3'
            },
            {
                Header: 'Estructura 4',
                accessor: 'est4'
            },
            {
                Header: 'Puesto',
                accessor: 'puesto'
            },
            {
                Header: 'Jefe',
                accessor: 'jefe'
            },
            {
                Header: 'Antigüedad',
                accessor: 'antiguedad'
            },
            {
                Header: 'Performance',
                accessor: 'performance'
            },
            {
                Header: 'Calificación',
                accessor: 'calif'
            },
            {
                Header: 'Potencial',
                accessor: 'potencial'
            },
            {
                Header: 'Key Talent',
                accessor: 'keyT'
            },
        ],
        []
    )

    const tableInstance = useTable({ columns, data }, useRowSelect)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    return (
        <div className="lista-bg">
            <table {...getTableProps()}>
                <thead>
                    {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()}>
                                            {// Render the header
                                                column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                        rows.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()}>
                                    {// Loop over the rows cells
                                        row.cells.map(cell => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {// Render the cell contents
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>

        </div>

    )
}
export default Lista