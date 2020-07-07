import React,{ Component } from 'react';
import LoginFacebook from '../Facebook/Facebook'
import LoginGoogle from '../Google/GoogleLogin'
import './Login.css';
class Login extends Component {
    render(){
        return(
            <section className="section-login">
                <form method="POST" action="/login">
                    <div>
                    <label for="usuario">Usuario:</label>
                    <input type="text" id="usuario" name="user_name" required />
                    </div>
                    <div>
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />
                    </div>
                    <button>Entrar</button>
                </form>
                <span className='span-medio'>O ingresa con:</span>
                <LoginFacebook /> 
                <LoginGoogle />
            </section>
        )
    }
}

export default Login