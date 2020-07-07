import React,{ Component } from 'react';
import LoginFacebook from '../Facebook/Facebook'
import LoginGoogle from '../Google/GoogleLogin'
import {Link} from 'react-router-dom'
import './Login.css';
class Login extends Component {
    render(){
        return(
            <section className="section-login">
                <div className="section-login-title">
                    <h2>Inicia Sesión</h2>
                    <p>Puedes iniciar sesión con tu cuenta de Eatsafe para acceder a nuestros servicios</p>
                </div>
                <form method="POST" action="/login" className="login-form">
                    <div>
                    <label for="usuario">Tu correo:</label>
                    <input type="text" id="usuario" name="user_name" required />
                    </div>
                    <div>
                    <label for="password">Tu contraseña:</label>
                    <input type="password" id="password" name="password" required />
                    </div>
                    <button>Entrar</button>
                </form>
                <span className='span-medio'>O inicia sesión en un clic:</span>
                <section className="section-loginRedes">
                    <LoginFacebook /> 
                    <LoginGoogle />
                </section>
                <Link to="/recuperaPass" className="login-recuperaPass">¿No recuerdas la contraseña?</Link>
            </section>
        )
    }
}

export default Login