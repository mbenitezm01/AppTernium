import React from 'react'
import { useTable, useRowSelect, usePagination, useSortBy} from 'react-table'

//Importacion de estilos
import "./listaUsuarios.css"


const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])
    
        return (
        <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
        )
    }
)


function ListaUsuarios() {

    const data = React.useMemo(
        () => [
            { cet: 1, nombre: "Pedro", contra: "*********", email: "[Espacio En Blanco]@ternium.mx"},
            { cet: 2, nombre: "Fernanda", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 3, nombre: "Sebastian", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 4, nombre: "Mike", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 5, nombre: "Alfonso", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 6, nombre: "Pedro", contra: "*********", email: "[Espacio En Blanco]@ternium.mx"},
            { cet: 7, nombre: "Fernanda", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 8, nombre: "Sebastian", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 9, nombre: "Mike", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 10, nombre: "Alfonso", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 11, nombre: "Pedro", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 12, nombre: "Fernanda", contra: "*********", email: "[Espacio En Blanco]@ternium.mx"},
            { cet: 13, nombre: "Sebastian", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 14, nombre: "Mike", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            { cet: 15, nombre: "Alfonso", contra: "*********", email: "[Espacio En Blanco]@ternium.mx" },
            
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'CET',
                accessor: 'cet', // accessor is the "key" in the data
                sortType: 'basic'

            },
            {
                Header: 'Nombre',
                accessor: 'nombre',
                sortType: 'alphanumeric'
            },
            {
                Header: 'Contraseña',
                accessor: 'contra'
            },
            {
                Header: 'E-mail',
                accessor: 'email'
            },
        ],
        []
    )

    const tableInstance = useTable(
        {columns, data},
         useSortBy,
         usePagination,
         useRowSelect,
         hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        pageCount,
        page,
        state: { pageIndex, pageSize, selectedRowIds},
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,
        selectedFlatRows,
    } = tableInstance


    return (
        <div className="listaUsuarios-bg">
            {/* Te dice las paginas
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
            */}
            <table {...getTableProps()}>
                <thead>
                    {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {// Render the header
                                                column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                      ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                      : ''}
                                                  </span> 
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
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
            | Go to page:{' '}
            <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
        </span>{' '}
        <select
            value={pageSize}
            onChange={e => {
                setPageSize(Number(e.target.value))
            }}
        >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
            ))}
        </select>
        {/* Te dice los ids
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        */}
        </div>
        </div>

    )
}
export default ListaUsuarios