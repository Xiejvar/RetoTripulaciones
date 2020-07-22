import React,{ Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class ModalLogin extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <Modal show={this.props.show} >
                <Modal.Header >
                    <Modal.Title>Gracias por tu colaboración</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                        <p>Las valoraciones se han enviado correctamente</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.history.goBack}>Volver al restaurante</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}