import React, { Component } from 'react';
import './EmailEnviado.css';

class EmailEnviado extends Component{
    constructor(){
        super()
        this.state = {
            email: ''
        }
    }
    componentDidMount(){
        const search = this.props.location.search
        const params = new URLSearchParams(search)
        let email = params.get('email')
        this.setState({
            ...this.state,
            email: email,
        })
    }

    reSendEmail(){
        fetch('http://localhost:1024/resend',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email
             })
        }).then(res => res.json())
        .then(res => {
            console.log(res)
        })   
    }
    render(){
        return(
            <section className='emailEnviado'>
                <h2 className='emailEnviado-title'>¡Confirma tu email!</h2>
                <p className='emailEnviado-parrafo'>Hemos enviado un correo electrónico a {this.state.email} para que puedas activar tu cuenta.</p>
                <img src='images/emailSentPending.svg' alt='Email enviado' className='emailEnviado-img'/>
                <p onClick={this.reSendEmail.bind(this)} className='emailEnviado-deNuevo'>Enviar email de nuevo</p>
                <p className='emailEnviado-spam'>¿No has recibido el email? Comprueba tu badeja de spam.</p>
            </section>
        )
    }
}

export default EmailEnviado