import React,{ Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class ModalLogin extends Component{
    constructor(props){
        super(props)

    }
    handleClose(){
        this.props.handleClose(false)
    }
    render(){
        return(
            <Modal show={this.props.show} >
                <Modal.Header >
                    <Modal.Title>Inicio de sesion erroneo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Usuario o contraseña incorrectos, intente de nuevo.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}