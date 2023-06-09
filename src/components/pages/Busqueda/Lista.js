import React from 'react'
import { useEffect, useRef } from 'react'
import { useTable, useRowSelect, usePagination, useSortBy, useFilters } from 'react-table'
import { useSticky } from 'react-table-sticky'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Btn from '../../Btn';
import { Link } from "react-router-dom"
import { MdOutlineCompareArrows } from 'react-icons/md'
import { HiDownload } from 'react-icons/hi'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';




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

    const printRef = useRef();


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

    const onPrintClick = async () => {
        
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`lista_empleados.pdf`);
        
      };
    

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
                accessor: 'jefe_nombre',
                filter: 'includeString',
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
            id: 'jefe_nombre',
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
            id: 'estructura_5',
            value: filtersState.est5,
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
                <div className='table-wrapper' >
                    {<table {...getTableProps()} className='table-container table sticky' ref={printRef}>
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
                    </table>}
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
                        Página{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Ir a página:{' '}
                    </span>{' '}

                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        min='1'
                        max={pageOptions.length}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                    <select
                        type="paginationSize"
                        style={{fontSize:'0.8rem'}}
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Mostrar {pageSize}
                            </option>
                        ))}
                    </select>
                
                    {selectedFlatRows.length === 2?
                        <button className='button-comparacion-on' onClick={onCompareClick}>
                            {'Comparacion'}
                            <MdOutlineCompareArrows className='logo-comparacion'/>
                        </button>
                        :
                        <button disabled={selectedFlatRows.length !== 2}>
                            {'Comparacion'}
                            <MdOutlineCompareArrows className='logo-comparacion'/>
                        </button>
                    }
                    
                    {/*
                    <button className = "button-print-on" onClick={onPrintClick}>
                        Print
                        <HiDownload className='logo-print'/>
                    </button>
                    */}

                    
                </div>
            </div>
        </>

    )
}
export default Lista