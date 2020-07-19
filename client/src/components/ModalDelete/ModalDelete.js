import React,{ Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class ModalLogin extends Component{
    constructor(props){
        super(props)

    }
    goToHome(){
        this.props.history.push('/')
    }
    render(){
        return(
            <Modal show={this.props.show} >
                <Modal.Header >
                    <Modal.Title>Usuario Eliminado</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>El usuario ya no existe, por favor clica en cerrar para volver a la pantalla de inicio.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.goToHome.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}