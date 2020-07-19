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
                    <Modal.Title>Los cambios se han efectuado</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Se han guardado tus datos correctamente</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}