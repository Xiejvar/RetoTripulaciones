import React,{Component} from 'react';
import './signUp.css';

class SignUp extends Component{
    render(){
        return(
            <div >
            <form method='POST' class='signForm' action='/signup'>
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
            </div>
        )
    }
}

export default SignUp
