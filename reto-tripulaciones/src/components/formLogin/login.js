import React,{ Component } from 'react';
import './login.css';
class Login extends Component {
    render(){
        return(
            <form method="POST">
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
        )
    }
}

export default Login