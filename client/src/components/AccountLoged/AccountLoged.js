import React,{ Component } from 'react';
import './AccountLoged.css';

import VerificationContext from '../../contexts/verificationToken'

class AccountLoged extends Component{
    static contextType = VerificationContext

    constructor(props){
        super(props)
        this.state = {
            name: '',
        }
    }
    componentDidMount(){
        if(this.context.tok.token === null || this.context.tok.token === undefined){
            this.props.history.push('/cuentaInicioSesion')
            console.log('lleguee')
        }
        this.searchUser()
    }


    searchUser(){
        fetch('http://localhost:1024/findUser',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                token: this.context.tok
         })
        }).then(res => res.json())
        .then(data => {
            if(data.valid){
                this.setState({
                    ...this.state,
                    name: data.name + ' ' + data.surname
                })
            } else {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('secret')
                this.props.history.push('/cuentaInicioSesion')
            }
        })
    }

    logOut(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('secret')
        let cont = {
            token: null,
            secret: null
        }

        fetch('http://localhost:1024/logoutUser',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                token: this.context.tok
         })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
        })
        this.context.handleVerification(cont)
        this.props.history.push('/')
    }

    render(){
        return(
            <section className='account'>
                <section className='account-personal'>
                    <img src='images/cross.svg' alt='cross-logo'  className='account-personal-cross' onClick={this.props.history.goBack}/>
                    <img src='images/account.png' alt='account-logo'  className='account-personal-logo'/>
                    <p className='account-personal-name'>{this.state.name}</p>
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
                <button className='account-button' onClick={this.logOut.bind(this)}>Cerrar Sesión</button>
            </section>
        )
    }
}

export default AccountLoged