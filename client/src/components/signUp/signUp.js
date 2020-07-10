import React,{ Component } from 'react';
import './signUp.css';
import { Link } from 'react-router-dom'

class SignUp extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            surname: '',
            age: '',
            email: '',
            password: ''
        }
    }

    prevSubmit(e){
        e.preventDefault()
    }

    regUserName(e){
        if(e.target.value.length > 4){
            this.setState({
                ...this.state,
                name: e.target.value
            })
        }
    }
    regUserSurNam(e){
        if(e.target.value.length > 4){
            this.setState({
                ...this.state,
                surname: e.target.value
            })
        }
    }
    regUserAge(e){
        this.setState({
            ...this.state,
            age: e.target.value
        })
    }
    regUserEmail(e){
        if(e.target.value.length > 4){
            this.setState({
                ...this.state,
                email: e.target.value
            })
        }
    }
    regUserPass(e){
        if(e.target.value.length > 4){
            this.setState({
                ...this.state,
                password: e.target.value
            })
        }
    }
    registerUser(){
        let user = this.state
       fetch('http://localhost:1024/signUp', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/json'
           },
           body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                age: user.age,
                email: user.email,
                password: user.password
            })
       }).then(res => res.json())
       .then(res => {
           console.log(res)
           if(res.emailSent){
               this.props.history.push('/registrado')
           } else {
               console.log('fallo el envio, intenta registrarte de nuevo')
           }
       })
    }
    render(){
        return(
            <div className="div-signup">
                <form className='signForm' onSubmit={(e) => this.prevSubmit.bind(this)(e)}>
                    <label>Usuario:</label>
                    <input type='text' id='name' name='user_name' onChange={(e) => this.regUserName.bind(this)(e)}></input>

                    <label>Apellidos:</label>
                    <input type='text' id='lastName' name='last_name' onChange={(e) => this.regUserSurNam.bind(this)(e)}></input>

                    <label>Edad:</label>
                    <input type='number' id='age' name='user_age' onChange={(e) => this.regUserAge.bind(this)(e)}></input>

                    <label>Correo:</label>
                    <input type='email' id='mail' name='user_email' onChange={(e) => this.regUserEmail.bind(this)(e)}></input>

                    <label>Contraseña:</label>
                    <input type='password' id='pass' name='user_pass' onChange={(e) => this.regUserPass.bind(this)(e)}></input>

                    <button type="button" onClick={this.registerUser.bind(this)}>Registrarse</button>
                </form>
                <p className="signup-p">¿Ya tienes una cuenta?<Link to="/iniciarSesion" className="link-signup">Inicia Sesión</Link></p>
            </div>
        )
    }
}

export default SignUp
