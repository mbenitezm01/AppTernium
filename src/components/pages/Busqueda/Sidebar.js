//import { Link } from "react-router-dom"
import { Button, Form, Row, Col } from 'react-bootstrap'

//Importacion de estilos
import './Sidebar.css'

function Sidebar(){
    return(
        <div className='sidebar-bg'>
            <div className='title-box'>
                Filtros
            </div>
            <div className='filter-box'>
                <Form>
                    <Form.Group className='filters'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="nombre" placeholder="Buscar" />
                    </Form.Group>


                    <Form.Group className='filters'> 
                        <Form.Label>CET    </Form.Label>
                        <Form.Control type="cet" placeholder="Buscar" />
                    </Form.Group>


                    <Form.Group  className='filters' style={{display:'inline-block'}}>
                        <Form.Label>Antigüedad</Form.Label>
                        <Row style={{display:'flex'}}>
                        <Col style={{marginRight: '20px'}}>
                        <Form.Control type="antiguedad" placeholder="Min" style={{width: '50px'}}/>
                            </Col>
                            <Col>
                        <Form.Control type="antiguedad" placeholder="Max" style={{width: '50px'}}/>
                            </Col>
                        </Row>
                    </Form.Group>


                    <Form.Group  className='filters' style={{display:'inline-block'}}>
                        <Form.Label>Calificacion</Form.Label>
                        <Row style={{display:'flex'}}>
                        <Col style={{marginRight: '20px'}}>
                        <Form.Control type="antiguedad" placeholder="Min" style={{width: '50px'}}/>
                            </Col>
                            <Col>
                        <Form.Control type="antiguedad" placeholder="Max" style={{width: '50px'}}/>
                            </Col>
                        </Row>
                    </Form.Group>

                    
                    <Form.Group className='filters'>
                        <Form.Label>Estructura 3</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Estructura 4</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Performance</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Jefe</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Potencial</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Puesto</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className='filters'>
                        <Form.Label>Key Talent</Form.Label>
                        <Form.Check type="checkbox" placeholder="Password" />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
           

            </div>
        </div>
    )
}
export default Sidebar