import React from 'react'
import { useTable, useRowSelect } from 'react-table'

//Importacion de estilos
import './listaUsuarios.css'



function ListaUsuarios() {

    function handleEdit(rowData){
        console.log('Editar', rowData)
    }

    function handleDelete(rowData){
        console.log('Eliminar', rowData)
    }

    const data = React.useMemo(
        () => [
            { id: 12, usuario: "pepe", correo: "[blanco]@ternium.mx" },
            { id: 12, usuario: "pepe", correo: "[blanco]@ternium.mx" },
            { id: 12, usuario: "pepe", correo: "[blanco]@ternium.mx" },
            { id: 12, usuario: "pepe", correo: "[blanco]@ternium.mx" },
            { id: 12, usuario: "pepe", correo: "[blanco]@ternium.mx" },
            { id: 12, usuario: "pepe", correo: "[blanco]@ternium.mx" },

        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Usuario',
                accessor: 'usuario',
            },
            {
                Header: 'Correo Electronico',
                accessor: 'correo'
            },
            {
                Header: "Acciones",
                id: "acciones",
                Cell: ({ row }) => (
                    <>
                        <button onClick={() => handleEdit(row.original)}>Editar</button>
                        <button onClick={() => handleDelete(row.original)}>Eliminar</button>
                    </>
                )
            }
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
        <div className="listaUsuarios-bg">
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
export default ListaUsuarios