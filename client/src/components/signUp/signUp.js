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
            password: '',
            validation: {
                name: false,
                surname: false,
                age: false,
                email: false,
                password: false
            }
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

    regUserPassConfirm(e){
        this.setState({
            ...this.state,
            confirmPass: e.target.value
        })
    }

    regUserDay(e){
        if(e.target.value.length === 2)
            this.setState({
                ...this.state,
                day: e.target.value
            })
    }

    regUserMonth(e){
        if(e.target.value.length === 2)
            this.setState({
                ...this.state,
                month: e.target.value
            })
    }

    regUserYear(e){
        if(e.target.value.length === 4)
            this.setState({
                ...this.state,
                year: e.target.value
            })
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
                birth: user.day + '/' + user.month + '/' + user.year,
                email: user.email,
                password: user.password
            })
       }).then(res => res.json())
       .then(res => {
           if(res.emailSent){
               this.props.history.push(`/registrado?email=${user.email}`)
           } else {
               console.log('fallo el envio, intenta registrarte de nuevo')
           }
       })
    }
    render(){
        return(
            <div className="div-signup">
                <section className='div-exitSignup'>
                    <h3 className='crear-cuenta'>Crea tu cuenta</h3>
                    <img src='/images/Exit.svg' alt='logo salir' onClick={this.props.history.goBack} />
                </section>
                <form className='signForm' onSubmit={(e) => this.prevSubmit.bind(this)(e)}>
                    <label>Tu nombre:<span className='error-m'>*</span></label>
                    <input type='text' id='name' name='user_name' onChange={(e) => this.regUserName.bind(this)(e)}></input>

                    <label>Tus apellidos:<span className='error-m'>*</span></label>
                    <input type='text' id='lastName' name='last_name' onChange={(e) => this.regUserSurNam.bind(this)(e)}></input>
                    <div className='signupBirth'>
                        <label>Tu fecha de nacimiento:<span className='error-m'>*</span></label>
                        <input type='number' name='user_day' onChange={(e) => this.regUserDay.bind(this)(e)} className='signupBirth-day' ></input>
                        <input type='number' name='user_month' onChange={(e) => this.regUserMonth.bind(this)(e)} className='signupBirth-month' ></input>
                        <input type='number' name='user_year' onChange={(e) => this.regUserYear.bind(this)(e)} className='signupBirth-year' ></input>
                    </div>

                    <label>Correo:<span className='error-m'>*</span></label>
                    <input type='email' id='mail' name='user_email' onChange={(e) => this.regUserEmail.bind(this)(e)}></input>

                    <label>Tu contraseña:<span className='error-m'>*</span></label>
                    <input type='password'  name='user_pass' onChange={(e) => this.regUserPass.bind(this)(e)}></input>

                    <label>Confirma tu contraseña:<span className='error-m'>*</span></label>
                    <input type='password'  name='user_pass_confirm' onChange={(e) => this.regUserPassConfirm.bind(this)(e)}></input>
                    <label><span className='error-m'>*</span> Campos obligatorios</label>

                    <button type="button" onClick={this.registerUser.bind(this)} className='signup-button'>Crear cuenta</button>
                </form>
                <p className="signup-p">¿Ya tienes una cuenta?<Link to="/iniciarSesion" className="link-signup">Inicia Sesión</Link></p>
            </div>
        )
    }
}

export default SignUp
