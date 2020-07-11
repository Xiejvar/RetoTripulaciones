import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './IniciadoSesion.css'

class IniciadoSesion extends Component{
    render(){
        return(
            <section className="iniciadosesion">
                <Link to="/iniciarSesion" className="iniciadosesion-button"><button>Iniciar Sesion</button></Link>
                <Link to="/registrarSesion" className="iniciadosesion-button"><button>Crear Cuenta</button></Link>
                <p>Si continuas aceptas nuestros términos y condiciones y nuestra política de privacidad</p>
            </section>
        )
    }
}

export default IniciadoSesion