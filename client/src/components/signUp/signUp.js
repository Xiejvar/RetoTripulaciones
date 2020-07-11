import React,{Component} from 'react';
import './signUp.css';
import {Link} from 'react-router-dom'

class SignUp extends Component{
    render(){
        return(
            <div className="div-signup">
                <form method='POST' class='signForm' action='http://localhost:9000/signUp'>
                    <label for='name'>Nombre</label>
                    <input type='text' id='name' name='name'></input>

                    <label for='lastName'>Apellidos</label>
                    <input type='text' id='lastName' name='lastName'></input>

                    <label for='age'>Edad</label>
                    <input type='text' id='age' name='age'></input>

                    <label for='mail'>Correo</label>
                    <input type='text' id='mail' name='mail'></input>

                    <label for='pass'>Contraseña</label>
                    <input type='text' id='pass' name='pass'></input>

                    <button type="submit">Registrarse</button>
                </form>
                <p className="signup-p">¿Ya tienes una cuenta?<Link to="/iniciarSesion" className="link-signup">Inicia Sesión</Link></p>
            </div>
        )
    }
}

export default SignUp
