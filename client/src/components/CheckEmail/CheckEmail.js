import React,{ Component } from 'react';
import './CheckEmail.css'
import VerificationContext from '../../contexts/verificationToken'

class CheckEmail extends Component{
    static contextType = VerificationContext
    componentDidMount(){
        this.confirmEmail()
    }
    confirmEmail(){
        const search = this.props.location.search
        const params = new URLSearchParams(search)
        let tok = params.get('tok')
        tok = encodeURIComponent(tok)
        fetch(`http://localhost:1024/checkEmail?tok=${tok}`)
        .then(res => res.json())
        .then(res => {
            if(res.valid){
                sessionStorage.setItem('token', res.tok)
                sessionStorage.setItem('secret', res.sec)
               let user = {
                   token: res.tok,
                   secret: res.sec
                }
                this.context.handleVerification(user)
            }else {
                // this.props.history.push('/cuentaInicioSesion')
            }
        })
    }

    goToHome(){
        this.props.history.push('/')
    }
    render(){
        return(
            <section className='verificada'>
                <h2 className='verificada-title'>¡Verificada!</h2>
                <p className='verificada-news'>¡Enhorabuena! Has verificado tu cuenta con exito</p>
                <img src='/images/emailSent.svg' alt='Email enviado' className='emailEnviado-img'/>
                <p onClick={this.goToHome.bind(this)} className='verificada-home'>Ir a la pantalla Principal</p>
            </section>
        )
    }
}

export default CheckEmail