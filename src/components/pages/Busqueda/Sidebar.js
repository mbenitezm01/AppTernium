//import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'

//Importacion de estilos
import './Sidebar.css'

function Sidebar({ filterState, setFilterState, handleSubmit, data }) {

    const [est3Unique, setEst3Unique] = useState();
    const [est4Unique, setEst4Unique] = useState();
    const [est5Unique, setEst5Unique] = useState();
    const [performanceUnique, setPerformanceUnique] = useState();
    const [jefeUnique, setJefeUnique] = useState();
    const [puestoUnique, setPuestoUnique] = useState();

    useEffect(() => {
        setEst3Unique(Array.from(new Set(data.map(({ estructura_3 }) => estructura_3))))
        setEst4Unique(Array.from(new Set(data.map(({ estructura_4 }) => estructura_4))))
        setEst5Unique(Array.from(new Set(data.map(({ estructura_5 }) => estructura_5))))
        setPerformanceUnique(Array.from(new Set(data.map(({ performance }) => performance))))
        setJefeUnique(Array.from(new Set(data.map(({ jefe_cet }) => jefe_cet))))
        setPuestoUnique(Array.from(new Set(data.map(({ puesto }) => puesto))))
    }, [data]);

    const handleChange = (e) => {
        setFilterState({ ...filterState, [e.target.name]: e.target.value });
    }

    const handleChangeNum = (e) => {
        console.log(Number(e.target.value))
        if (isNaN(Number(e.target.value))) {
            
            if(filterState[e.target.name] !== undefined){
                e.target.value = filterState[e.target.name]
            }
            else{
                e.target.value = '';
            }
            
        }
        else {

            if (e.target.value !== '') {
                setFilterState({
                    ...filterState, [e.target.name]: Number(e.target.value)
                });
            }
            else {
                setFilterState({
                    ...filterState, [e.target.name]: undefined
                });
            }
        }
    }

    const handleChangeCheck = (e) => {
        setFilterState({ ...filterState, [e.target.name]: e.target.checked });
    }

    const handleClick = () => {
        handleSubmit.current();
    }

    const returnUnique = (varName) => {
        let options = null;
        if (varName !== undefined && varName.length > 0) {
            options = varName.map((data, index) => {
                return (
                    <option key={index}value={data}>{data}</option>
                );
            }
            )
            return options;
        }
    }

    return (
        <div className='sidebar-bg'>
            <div className='title-box'>
                Filtros
            </div>
            <div className='filter-box'>
                <Form>
                    <Form.Group className='filters'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name='name' placeholder='Buscar' onChange={handleChange} />
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>CET</Form.Label>
                        <Form.Control name='cet' placeholder='Buscar' onChange={handleChangeNum} />
                    </Form.Group>


                    <Form.Group className='filters' style={{ display: 'inline-block' }}>
                        <Form.Label>Antigüedad</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control name='antMin' placeholder='Min' style={{ width: '60px' }} onChange={handleChangeNum} />
                            </Col>
                            <Col>
                                <Form.Control name='antMax' placeholder='Max' style={{ width: '60px' }} onChange={handleChangeNum} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className='filters' style={{ display: 'inline-block' }}>
                        <Form.Label>Performance</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control name='perfMin' placeholder='Min' style={{ width: '60px' }} onChange={handleChangeNum} />
                            </Col>
                            <Col>
                                <Form.Control name='perfMax' placeholder='Max' style={{ width: '60px' }} onChange={handleChangeNum} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className='filters'>
                        <Form.Label>Estructura 3</Form.Label>
                        <Form.Select name='est3' onChange={handleChange}>
                            <option value=''>Estructura 3</option>
                            {returnUnique(est3Unique)}
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Estructura 4</Form.Label>
                        <Form.Select name='est4' onChange={handleChange}>
                            <option value=''>Estructura 4</option>
                            {returnUnique(est4Unique)}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='filters'>
                        <Form.Label>Estructura 5</Form.Label>
                        <Form.Select name='est5' onChange={handleChange}>
                            <option value=''>Estructura 5</option>
                            {returnUnique(est5Unique)}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='filters'>
                        <Form.Label>Jefe</Form.Label>
                        <Form.Select onChange={handleChange}>
                            <option value=''>Jefe</option>
                            {returnUnique(jefeUnique)}
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Potencial</Form.Label>
                        <Form.Select onChange={handleChange}>
                            <option>Open this select menu</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Puesto</Form.Label>
                        <Form.Select name='puesto' onChange={handleChange}>
                            <option value=''>Puesto</option>
                            {returnUnique(puestoUnique)}
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Key Talent</Form.Label>
                        <Form.Check name='key' onChange={handleChangeCheck} />
                    </Form.Group>


                    <Button variant='primary' onClick={handleClick} className='submit-btn'>
                        Submit
                    </Button>
                </Form>


            </div>
        </div>
    )
}
export default Sidebar