import React, { Component } from 'react';
import './EmailEnviado.css';

class EmailEnviado extends Component{
    render(){
        return(
            <section className='emailEnviado'>
                <img src='images/emailSent.png' alt='Email enviado' className='emailEnviado-img'/>
                <h2 className='emailEnviado-title'>Mira tu correo para confirmar tu usuario</h2>
            </section>
        )
    }
}

export default EmailEnviado