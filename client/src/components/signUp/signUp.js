import React,{ Component } from 'react';
import './signUp.css';
import { Link } from 'react-router-dom'
import { validateName, validateSurName, validateBirth, validateEmail, validatePassword } from '../Validation/Validation'
class SignUp extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            surname: '',
            age: '',
            email: '',
            day: '',
            month: '',
            year: '',
            password: '',
            confirmPass: '',
            validationName: false,
            validationSurname: false,
            validationAge: false,
            validationEmail: false,
            validationPassword: false,
            validateAgainPassword: false
        }
    }

    prevSubmit(e){
        e.preventDefault()
    }

    regUserName(e){
        if(validateName(e.target.value))
            this.setState({
                ...this.state,
                name: e.target.value,
                validationName: true
            })
        else
            this.setState({
                ...this.state,
                name: e.target.value,
                validationName: false
            })
    }
    regUserSurNam(e){
        if(validateSurName(e.target.value))
            this.setState({
                ...this.state,
                surname: e.target.value,
                validationSurname: true
            })
        else
            this.setState({
                ...this.state,
                validationSurname: false
            })
    }

    regUserEmail(e){
        if(validateEmail(e.target.value)){
            this.setState({
                ...this.state,
                email: e.target.value,
                validationEmail: true
            })
        } else {
            this.setState({
                ...this.state,
                validationEmail: false,
                email: e.target.value
            })
        }
    }
    regUserPass(e){
        if(validatePassword(e.target.value)){
            this.setState({
                ...this.state,
                password: e.target.value,
                validationPassword: true
            })
        } else{
            this.setState({
                ...this.state,
                password: e.target.value,
                validationPassword: false
            })
        }
    }

    regUserPassConfirm(e){
        if(e.target.value === this.state.password)
            this.setState({
                ...this.state,
                confirmPass: e.target.value,
                validateAgainPassword: true
            })
        else
            this.setState({
                ...this.state,
                confirmPass: e.target.value,
                validateAgainPassword: false
            })
    }

    regUserDay(e){
        this.setState({
            ...this.state,
            day: e.target.value,
            age: e.target.value + '/' + this.state.month + '/' + this.state.year
        })
    }

    regUserMonth(e){
        this.setState({
            ...this.state,
            month: e.target.value,
            age: this.state.day + '/' + e.target.value+ '/' + this.state.year
        })
    }

    regUserYear(e){
        this.setState({
            ...this.state,
            year: e.target.value,
            age: this.state.day + '/' + this.state.month + '/' + e.target.value
        })
    }
    registerUser(){
        let user = this.state
        let age = user.day + '/' + user.month + '/' + user.year
        let validationAge = validateBirth(age)
        if(this.state.validationEmail && this.state.validationName && this.state.validationPassword && this.state.validationSurname && validationAge){
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
    }

    onlyTwoNumberDay(evt){
        let value = this.state.day
        if(/^\d{2}$/.test(value)){
            evt.preventDefault()
        } else if(/^[a-zA-Z]/.test(value)){
            evt.preventDefault()
        }
    }

    onlyTwoNumberMonth(evt){
        let value = this.state.month
        if(/^\d{2}$/.test(value)){
            evt.preventDefault()
        } else if(/^[a-zA-Z]/.test(value)){
            evt.preventDefault()
        }
    }

    onlyFourNumber(evt){
        let value = this.state.year
        if(/^\d{4}$/.test(value)){
            evt.preventDefault()
        }else if(/^[A-Za-z]/.test(value)){
            evt.preventDefault()
        }
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
                    <input type='text' id='name' name='user_name' onChange={(e) => this.regUserName.bind(this)(e)} className={!this.state.validationName && this.state.name.length > 0 ? 'inputErr' : ''}></input>
                    {!this.state.validationName && this.state.name.length > 0 ? <p className='error-message'>El nombre debe comenzar por una letra mayúscula y tener un largo minimo de 5 caracteres</p>: ''}
                    <label>Tus apellidos:<span className='error-m'>*</span></label>
                    <input type='text' id='lastName' name='last_name' onChange={(e) => this.regUserSurNam.bind(this)(e)}></input>
                    {!this.state.validationSurname && this.state.surname.length > 0 ? <p className='error-message'>El apellido debe comenzar por una letra mayúscula y un largo mínimo de 4 caracteres</p>: ''}
                    <div className='signupBirth'>
                        <label>Tu fecha de nacimiento:<span className='error-m'>*</span></label>
                        <input type='number' name='user_day' onChange={(e) => this.regUserDay.bind(this)(e)} className='signupBirth-day' onKeyPress={this.onlyTwoNumberDay.bind(this)}></input>
                        <input type='number' name='user_month' onChange={(e) => this.regUserMonth.bind(this)(e)} className='signupBirth-month'  onKeyPress={this.onlyTwoNumberMonth.bind(this)}></input>
                        <input type='number' name='user_year' onChange={(e) => this.regUserYear.bind(this)(e)} className='signupBirth-year' onKeyPress={this.onlyFourNumber.bind(this)}></input>
                    </div>
                    {!validateBirth(this.state.age) && this.state.age.length > 0 ? <p className='error-message'>Inserta una fecha valida</p>: ''}

                    <label>Correo:<span className='error-m'>*</span></label>
                    <input type='email' id='mail' name='user_email' onChange={(e) => this.regUserEmail.bind(this)(e)}></input>
                    {!this.state.validationEmail && this.state.email.length > 0 ? <p className='error-message'>Inserta un Correo valido</p>: ''}
                    <label>Tu contraseña:<span className='error-m'>*</span></label>
                    <input type='password'  name='user_pass' onChange={(e) => this.regUserPass.bind(this)(e)}></input>
                    {!this.state.validationPassword && this.state.password.length > 0 ? <p className='error-message'>La contraseña debe contener al menos una mayuscula, un numero y un largo mínimo de 8 caracteres</p>: ''}
                    <label>Confirma tu contraseña:<span className='error-m'>*</span></label>
                    <input type='password'  name='user_pass_confirm' onChange={(e) => this.regUserPassConfirm.bind(this)(e)}></input>
                    {!this.state.validateAgainPassword && this.state.confirmPass.length > 0 ? <p className='error-message'>La contraseña debe coincidir con la de arriba</p>: ''}
                    <label><span className='error-m'>*</span> Campos obligatorios</label>

                    <button type="button" onClick={this.registerUser.bind(this)} className='signup-button'>Crear cuenta</button>
                </form>
                <p className="signup-p">¿Ya tienes una cuenta?<Link to="/iniciarSesion" className="link-signup">Inicia Sesión</Link></p>
            </div>
        )
    }
}

export default SignUp
