import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './IniciadoSesion.css'

class IniciadoSesion extends Component{
    constructor(){
        super()

    }

    moveBack(){
        this.props.history.push('/')
    }

    render(){
        return(
            <section className="iniciadosesion">
                <section className='exit-section'>
                    <p className='iniciadoSesion-bienvenido'>Bienvenido a:</p>
                    <img src='/images/Exit.svg' alt='logo salir' onClick={this.moveBack.bind(this)} className='cross-exit' />
                </section>
                <h2 className='iniciadoSesion-logo' id='logo'><span className='iniciadoSesion-logo-darkblue'>eat</span><span className='iniciadoSesion-logo-lightblue'>safe</span></h2>
                <Link to="/iniciarSesion" className="iniciadosesion-button">Iniciar Sesión</Link>
                <Link to="/registrarSesion" className="iniciadosesion-button">Crear Cuenta</Link>
                <p className='iniciadoSesion-terminos'>Registrandote aceptas <a href='#logo'>nuestras condiciones de uso</a> y <a href='#logo'>política de privacidad</a></p>
                <img src='images/iniciadoSesion.png' alt='logo-iniciadoSesion' />
            </section>
        )
    }
}

export default IniciadoSesion