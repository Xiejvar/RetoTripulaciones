import React,{ Component } from 'react';
import './AccountLoged.css';
class AccountLoged extends Component{
    render(){
        return(
            <section className='account'>
                <section className='account-personal'>
                    <img src='images/cross.svg' alt='cross-logo'  className='account-personal-cross' onClick={this.props.history.goBack}/>
                    <img src='images/account.png' alt='account-logo'  className='account-personal-logo'/>
                    <p className='account-personal-name'>Alexandra Lupiañez</p>
                </section>
                <section className='account-ratings'>
                    <ul className='account-ratings-ul'>
                        <li className='account-ratings-ul-first'>Información personal</li>
                        <li className='account-ratings-ul-secondary'>Mis favoritos</li>
                        <li className='account-ratings-ul-third'>Mis valoraciones</li>
                    </ul>
                </section>
                <section className='account-web'>
                    <ul className='account-web-ul'>
                        <li>Preguntas frecuentes</li>
                        <li>Contacto</li>
                    </ul>
                </section>
                <button className='account-button'>Cerrar Sesión</button>
            </section>
        )
    }
}

export default AccountLoged