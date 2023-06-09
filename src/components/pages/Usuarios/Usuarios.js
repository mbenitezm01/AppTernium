import React, { useState, useCallback, useEffect } from 'react'
import { useTable, useRowSelect } from 'react-table'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Btn from '../../Btn'
import { AiFillCheckCircle } from 'react-icons/ai'
import './Usuarios.css'
import { IoSearchSharp } from 'react-icons/io5'


//Importacion de estilos
import './listaUsuarios.css'



function ListaUsuarios() {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    const navigate = useNavigate()

    const onNotificacionClick = () => {
        navigate("/usuarios/pendientes")
    }

    const fetchList = useCallback(async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/usuarios`);
        setData(response.data);
        setLoading(false)
    }, []);

    useEffect(() => {
        if(sessionStorage.length === 0) {
            localStorage.clear();
            navigate('/login');
        }
        if(localStorage.getItem('tipo_usuario') !== 'administrador') navigate('/busqueda');
        fetchList()
    }, [fetchList])

    // const data = React.useMemo(
    //     () => [ 
    //         { id: 12, correo: "[blanco]@ternium.mx" },
    //         { id: 13, correo: "[blanco]@ternium.mx" },
    //         { id: 14, correo: "[blanco]@ternium.mx" },
    //         { id: 15, correo: "[blanco]@ternium.mx" },
    //         { id: 16, correo: "[blanco]@ternium.mx" },
    //         { id: 17, correo: "[blanco]@ternium.mx" },

    //     ],
    //     []
    // )

    function handleEdit(cet) {
        //console.log('Editar', cet)
        navigate(`/editar-usuario/${cet}`)
    }

    function createUserHandler(){
        navigate('/crear-usuario')
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'CET',
                accessor: 'empleado_cet',
            },
            {
                Header: 'Correo Electronico',
                accessor: 'correo'
            },
            {
                id: 'admin',
                Header: 'Administrador',
                accessor: 'admin',
                Cell: ({ value }) => value ? <AiFillCheckCircle className='lista-key' /> : ''
            },
            {
                id: 'activo',
                Header: 'Activo',
                accessor: 'activo',
                Cell: ({ value }) => {
                    return value ? <AiFillCheckCircle className='lista-key' /> : ''
                }
            },
            {
                Header: () => (
                    <Btn text="Crear nuevo usuario" icon={"add"} onClick={createUserHandler}/>
                ),
                id: "acciones",
                Cell: ({ row }) => (
                    <>
                        <Btn text="Editar" icon={"edit"} onClick={() => handleEdit(row.original.empleado_cet)} />
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

    if (isLoading){
        return(<div></div>)
    }

    return (
        <div className="usuarios-fondo">
        <div className="listaUsuarios-bg">
            <button className='button-notificaciones' onClick={onNotificacionClick}>
            {'Notificaciones'}
            <IoSearchSharp className='logo-notificaciones'></IoSearchSharp>
            </button>
            <table className='table-usuarios'{...getTableProps()}>
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
        </div>

    )
}
export default ListaUsuarios