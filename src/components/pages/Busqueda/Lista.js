import React from 'react'
import { useTable, useRowSelect, usePagination, useSortBy} from 'react-table'

//Importacion de estilos
import './Lista.css'


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


function Lista() {

    const data = React.useMemo(
        () => [
            { cet: 1, nombre: "Pedro", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 2, nombre: "Fernanda", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 3, nombre: "Sebastian", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 4, nombre: "Mike", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 5, nombre: "Alfonso", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 6, nombre: "Pedro", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 7, nombre: "Fernanda", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 8, nombre: "Sebastian", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 9, nombre: "Mike", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 10, nombre: "Alfonso", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 11, nombre: "Pedro", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 12, nombre: "Fernanda", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 13, nombre: "Sebastian", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 14, nombre: "Mike", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            { cet: 15, nombre: "Alfonso", est3: "blanco", est4: "negro", puesto: "manager", jefe: "tomas", antiguedad: "6", performance: "super", calif: "97", potencial: "SS", keyT: "Yes" },
            
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
        <div className="lista-bg">
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
export default Lista