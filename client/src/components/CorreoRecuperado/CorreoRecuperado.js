import React, { Component } from 'react';
import './CorreoRecuperado.css';

class CorreoRecuperado extends Component{
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

    render(){
        return(
            <section className='emailsentRecuperado'>
                <div>
                    <h2>Correo enviado</h2>
                    <img src='/images/Exit.svg' alt='exit' className='crossImage' onClick={this.props.history.goBack}/>
                </div>
                <p className='emailsentRecuperado-consulta'>Consulta la bandeja de entrada de {this.state.email}. Te hemos enviado instrucciones para restablecer contraseña. Si no has recibido el email, comprueba la bandeja de spam.</p>
                <button onClick={this.props.history.push('/')}>De acuerdo</button>
                <p className='emailsentRecuperado-instrucciones'>¿No has recibido instrucciones?</p>
                <p className='emailsentRecuperado-resend'>Vuelve a intentarlo</p>
            </section>
        )
        
    }   
}

export default CorreoRecuperado
