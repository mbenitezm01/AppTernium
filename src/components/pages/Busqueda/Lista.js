import React from 'react'
import { useEffect, useRef } from 'react'
import { useTable, useRowSelect, usePagination, useSortBy, useFilters } from 'react-table'
import { useSticky } from 'react-table-sticky'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Btn from '../../Btn';
import { Link } from "react-router-dom"

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
                <input type="checkbox" ref={resolvedRef} {...rest} onClick={(e) => e.stopPropagation()} />
            </>
        )
    }
)





function Lista({ data, filtersState, handleSubmit }) {

    const navigate = useNavigate();

    const onRowClick = (cet) => {
        navigate(`/ficha/${cet}`)
    }

    const onCompareClick = () => {
        if (selectedFlatRows.length == 2){
            let id1 = selectedFlatRows[0].cells[1].value;
            let id2 = selectedFlatRows[1].cells[1].value
            navigate(`/comparacion?ficha1=${id1}&ficha2=${id2}`)

        }
    }


    /*
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
    */

    const columns = React.useMemo(
        () => [
            {
                Header: 'CET',
                accessor: 'cet', // accessor is the "key" in the data
                sortType: 'basic',
                filter: 'exactText',
                sortable: true,
            },
            {
                Header: 'Nombre',
                accessor: 'nombre',
                sortType: 'alphanumeric',
                filter: 'includeString',
                sortable: true,
            },
            {
                Header: 'Estructura 3',
                accessor: 'estructura_3',
                filter: 'exactText',
                sortable: true,
            },
            {
                Header: 'Estructura 4',
                accessor: 'estructura_4',
                filter: 'exactText',
                sortable: true,
            },
            {
                Header: 'Estructura 5',
                accessor: 'estructura_5',
                filter: 'exactText',
                sortable: true,
            },
            {
                Header: 'Puesto',
                accessor: 'puesto',
                filter: 'exactText',
                sortable: true,
            },
            {
                Header: 'Jefe',
                accessor: 'jefe_cet',
                filter: 'exactText',
                sortable: true,
            },
            {
                Header: 'Antigüedad',
                accessor: 'antiguedad',
                filter: 'between',
                sortable: true,
            },
            {
                Header: 'Performance',
                accessor: 'performance',
                filter: 'between',
                sortable: true,
            },
            {
                id: 'key_talent',
                Header: 'Key Talent',
                accessor: 'key_talent',
                sortable: true,
                Cell: ({ value }) => value ? <AiFillCheckCircle className='lista-key' /> : '',
                sortType: (rowA, rowB, columnId) => {
                    const a = rowA.original[columnId];
                    const b = rowB.original[columnId];
                    return a === b ? 0 : (a ? -1 : 1);
                }
            },
        ],
        []
    )

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            autoResetPage: false,
            manualFilters: false,
            filterTypes: React.useMemo(
                () => ({
                    num: (rows, id, filterValue) => {
                        return rows.filter((row) => {
                            return filterValue === '' || String(row.values[id]) === filterValue
                        })
                    },
                    range: (rows, id, filterValue) => {
                        return rows.filter((row) => {
                            return filterValue === '' || String(row.values[id]) === filterValue
                        })
                    },
                }),
                []
            ),
        },

        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        useSticky,
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
        },


    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        pageOptions,
        pageCount,
        page,
        state: { pageIndex, pageSize, selectedRowIds },
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,
        selectedFlatRows,
        setFilter,
        setAllFilters,
    } = tableInstance


    function changeFilters() {
        //setFilter('nombre', filtersState.name);

        setAllFilters([{
            id: 'nombre',
            value: filtersState.name,
        },
        {
            id: 'cet',
            value: filtersState.cet,
        },
        {
            id: 'jefe_cet',
            value: filtersState.jefe,
        },
        {
            id: 'antiguedad',
            value: [filtersState.antMin, filtersState.antMax],
        },
        {
            id: 'estructura_3',
            value: filtersState.est3,
        },
        {
            id: 'estructura_4',
            value: filtersState.est4,
        },
        {
            id: 'puesto',
            value: filtersState.puesto,
        },
        {
            id: 'performance',
            value: [filtersState.perfMin, filtersState.perfMax],
        },
        {
            id: 'key_talent',
            value: filtersState.key,
        },
        ])
    }

    useEffect(() => {
        handleSubmit.current = changeFilters;
    }, [filtersState]);

    return (
        <>
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
                <div className='table-wrapper'>
                    <table {...getTableProps()} className='table-container table sticky'>
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
                                                    { column.sortable &&(

                                                        <span
                                                        className={`table-sorting-indicator ${column.isSorted ? 'active' : ''
                                                    } ${column.isSortedDesc ? 'down' : 'up'}`}
                                                    ></span>
                                                )}
                                                </th>
                                            ))}
                                    </tr>
                                ))}
                        </thead>
                        {/* Apply the table body props */}
                        <tbody {...getTableBodyProps()}>
                            {// Loop over the table rows
                                page.map((row, i) => {
                                    // Prepare the row for display
                                    prepareRow(row)
                                    return (
                                        // Apply the row props
                                        <tr {...row.getRowProps()} onClick={() => onRowClick(row.original.cet)} style={{ cursor: 'pointer' }}>
                                            {// Loop over the rows cells
                                                row.cells.map(cell => {
                                                    // Apply the cell props
                                                    return (
                                                        <td {...cell.getCellProps()} title={cell.value}>
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
                <div className='pagination'>
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
                
            {selectedFlatRows.length === 2?
                <Btn text={'Comparacion'} icon={'compare'} onClick={onCompareClick}/> :
                <Btn state={true} text={'Comparacion'} icon={'compare'} onClick={onCompareClick}/>
            }
            
            {/*
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
        </>

    )
}
export default Lista