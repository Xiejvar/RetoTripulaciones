import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component{
    render(){
        return(
            <footer className='footer'>
                <ul className='footer-list'>
                    <li>Preguntas Frecuentes</li>
                    <li>Declaración de Privacidad y Cookies</li>
                    <li>Condiciones de uso</li>
                </ul>
                <p className='footer-p'>2020 EATSAFE - Todos los derechos reservados</p>
            </footer>
        )
    }
}
export default Footer