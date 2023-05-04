import { useState } from 'react'

//import { Link } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'

//Importacion de estilos
import './Sidebar.css'

function Sidebar({filterState, setFilterState, handleSubmit}){

    const handleChange = (e) => {
        setFilterState({ ...filterState, [e.target.name]: e.target.value });
    }

    const handleClick = () => {
        handleSubmit.current();
    }

    return(
        <div className='sidebar-bg'>
            <div className='title-box'>
                Filtros
            </div>
            <div className='filter-box'>
                <Form>
                    <Form.Group className='filters'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name='name' placeholder='Buscar' onChange={handleChange}/>
                    </Form.Group>


                    <Form.Group className='filters'> 
                        <Form.Label>CET</Form.Label>
                        <Form.Control name='cet' placeholder='Buscar' onChange={handleChange}/>
                    </Form.Group>


                    <Form.Group  className='filters' style={{display:'inline-block'}}>
                        <Form.Label>Antigüedad</Form.Label>
                        <Row>
                        <Col>
                        <Form.Control name='antMin' placeholder='Min' style={{width: '60px'}} onChange={handleChange}/>
                            </Col>
                            <Col>
                        <Form.Control name='antMax' placeholder='Max' style={{width: '60px'}} onChange={handleChange}/>
                            </Col>
                        </Row>
                    </Form.Group>


                    <Form.Group  className='filters' style={{display:'inline-block'}}>
                        <Form.Label>Calificacion</Form.Label>
                        <Row>
                        <Col>
                        <Form.Control name='califMin' placeholder='Min' style={{width: '60px'}} onChange={handleChange}/>
                            </Col>
                            <Col>
                        <Form.Control name='califMax' placeholder='Max' style={{width: '60px'}} onChange={handleChange}/>
                            </Col>
                        </Row>
                    </Form.Group>

                    
                    <Form.Group className='filters'>
                        <Form.Label>Estructura 3</Form.Label>
                        <Form.Select name='est3' onChange={handleChange}>
                            <option>Open this select menu</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Estructura 4</Form.Label>
                        <Form.Select name='est4' onChange={handleChange}>
                            <option>Open this select menu</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Performance</Form.Label>
                        <Form.Select name='perf' onChange={handleChange}>
                            <option>Open this select menu</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Jefe</Form.Label>
                        <Form.Select onChange={handleChange}>
                            <option>Open this select menu</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
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
                        <Form.Select onChange={handleChange}>
                            <option>Open this select menu</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Key Talent</Form.Label>
                        <Form.Check name='key' onChange={handleChange}/>
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