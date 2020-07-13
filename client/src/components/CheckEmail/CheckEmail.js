import React,{ Component } from 'react';

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
                this.props.history.push('/')
            }else {
                this.props.push('/cuentaInicioSesion')
            }
        })
    }
    render(){
        return(
            <h1>Usuario no ha sido confirmado</h1>
        )
    }
}

export default CheckEmail