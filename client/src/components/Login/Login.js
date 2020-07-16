import React,{ Component } from 'react';
import LoginFacebook from '../Facebook/Facebook'
import LoginGoogle from '../Google/GoogleLogin'
import { Link } from 'react-router-dom'
import './Login.css';
import VerificationContext from '../../contexts/verificationToken'

class Login extends Component {
    static contextType = VerificationContext
    constructor(){
        super()
        this.state = {
            user: '',
            pass: ''
        }
    }

    loginUserName(e){
        this.setState({
            ...this.state,
            user: e.target.value
        })
    }

    loginPass(e){
        this.setState({
            ...this.state,
            pass: e.target.value
        })
    }

    sessionLogin(){
        let user = this.state
        fetch('http://localhost:1024/login', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/json'
           },
           body: JSON.stringify({
                name: user.user,
                pass: user.pass
            })
       }).then(res => res.json())
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
           }
       })
    }

    render(){
        return(
            <section className="section-login">
                <img src='/images/Exit.svg' alt='exit' className='crossImage' onClick={this.props.history.goBack}/>
                <div className="section-login-title">
                    <h2>Inicia Sesión</h2>
                </div>
                <form className="login-form">
                    <div>
                    <label>Tu correo:</label>
                    <input type="text" id="usuario" name="user_name" required onChange={(e) => this.loginUserName.bind(this)(e)}/>
                    </div>
                    <div>
                    <label>Tu contraseña:</label>
                    <input type="password" id="password" name="password" required onChange={(e) => this.loginPass.bind(this)(e)}/>
                    </div>
                    <Link to="/recuperaPass" className="login-recuperaPass">¿No recuerdas la contraseña?</Link>
                    <button type="button" onClick={this.sessionLogin.bind(this)}>Iniciar Sesión</button>
                </form>
                <span className='span-medio'>O </span>
                <section className="section-loginRedes">
                    <LoginFacebook /> 
                    <LoginGoogle />
                </section>
            </section>
        )
    }
}

export default Login