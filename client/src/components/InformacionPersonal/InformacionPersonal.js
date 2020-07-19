import React, { Component } from 'react'
import VerificationContext from '../../contexts/verificationToken'
import './InformacionPersonal.css'
import { validateName, validateSurName, validateBirth, validateEmail, validatePassword } from '../Validation/Validation'
import ModalUpdate from '../ModalUpdate/ModalUpdate'
import ModalDelete from '../ModalDelete/ModalDelete'
class InformacionPersonal extends Component{
    static contextType = VerificationContext

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
            validateAgainPassword: false,
            show: false,
            showEliminated: false
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
        if(e.target.value === '' &&  this.state.month.length === 0 && this.state.year.length === 0)
            this.setState({
                ...this.state,
                age: ''
            })
    }

    regUserMonth(e){
        this.setState({
            ...this.state,
            month: e.target.value,
            age: this.state.day + '/' + e.target.value+ '/' + this.state.year
        })
        if(e.target.value === '' &&  this.state.day.length === 0 && this.state.year.length === 0)
            this.setState({
                ...this.state,
                age: ''
            })
    }

    regUserYear(e){
        this.setState({
            ...this.state,
            year: e.target.value,
            age: this.state.day + '/' + this.state.month + '/' + e.target.value
        })
        if(e.target.value === '' &&  this.state.day.length === 0 && this.state.month.length === 0)
            this.setState({
                ...this.state,
                age: ''
            })
    }
    registerUser(){
        let user = this.state
        if(!this.state.validationName){
            user.name=''
        }
        if(!this.state.validationSurname){
            user.surname=''
        }
        if(!this.state.validationAge){
            user.age=''
        }
        if(!this.state.validationEmail){
            user.email=''
        }
        if(!this.state. validationPassword){
            user.password=''
        }
        if(!this.state.validateAgainPassword){
            user.password=''
        }
        fetch('http://localhost:1024/informPersonal', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                        name: user.name,
                        surname: user.surname,
                        birth: user.age,
                        email: user.email,
                        password: user.password,
                        token: this.context.tok
                    })
            }).then(res => res.json())
            .then(res => {
                if(res.valid){
                    this.setState({
                        ...this.state,
                        show: true
                    })
               }
            })
    }

    eliminateUser(){
       fetch('http://localhost:1024/eliminate', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/json'
           },
           body: JSON.stringify({
                toke: this.context.tok
            })
       }).then(res => res.json())
       .then(res => {
           if(res.elimin){
               this.setState({
                   ...this.state,
                   showEliminated: true
               })
           }
       })
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

    setShow(){
        this.setState({
            ...this.state,
            show: false
        })
    }

    render(){
        return(
            <form className='accountForm' onSubmit={(e) => this.prevSubmit.bind(this)(e)}>
                <ModalUpdate show={this.state.show} handleClose={this.setShow.bind(this)}/>
                <ModalDelete show={this.state.showEliminated} history={this.props.history}/>
                <div className='accountForm-diver'>
                    <h2 className='accountInfo'>Informacion Personal</h2>
                    <img src='/images/Exit.svg' alt='cross-logo'  className='account-personal-cross' onClick={this.props.history.goBack}/>
                </div>
                <label>Tu nombre:</label>
                <input type='text' id='name' name='user_name' onChange={(e) => this.regUserName.bind(this)(e)}></input>
                {!this.state.validationName && this.state.name.length > 0 ? <p className='error-message'>El nombre debe comenzar por una letra mayúscula y tener un largo minimo de 5 caracteres</p>: ''}
                <label>Tus apellidos:</label>
                <input type='text' id='lastName' name='last_name' onChange={(e) => this.regUserSurNam.bind(this)(e)}></input>
                {!this.state.validationSurname && this.state.surname.length > 0 ? <p className='error-message'>El apellido debe comenzar por una letra mayúscula y un largo mínimo de 4 caracteres</p>: ''}
                <div className='accountupBirth'>
                    <label>Tu fecha de nacimiento:</label>
                    <input type='number' name='user_day' onChange={(e) => this.regUserDay.bind(this)(e)} className='accountupBirth-day' onKeyPress={this.onlyTwoNumberDay.bind(this)}></input>
                    <input type='number' name='user_month' onChange={(e) => this.regUserMonth.bind(this)(e)} className='accountupBirth-month'  onKeyPress={this.onlyTwoNumberMonth.bind(this)}></input>
                    <input type='number' name='user_year' onChange={(e) => this.regUserYear.bind(this)(e)} className='accountupBirth-year' onKeyPress={this.onlyFourNumber.bind(this)}></input>
                </div>
                {!validateBirth(this.state.age) && this.state.age.length > 0 ? <p className='error-message'>Inserta una fecha valida</p>: ''}
                <label>Correo:</label>
                <input type='email' id='mail' name='user_email' onChange={(e) => this.regUserEmail.bind(this)(e)}></input>
                {!this.state.validationEmail && this.state.email.length > 0 ? <p className='error-message'>Inserta un Correo valido</p>: ''}
                <label>Tu contraseña:</label>
                <input type='password'  name='user_pass' onChange={(e) => this.regUserPass.bind(this)(e)}></input>
                {!this.state.validationPassword && this.state.password.length > 0 ? <p className='error-message'>La contraseña debe contener al menos una mayuscula, un numero y un largo mínimo de 8 caracteres</p>: ''}
                <label>Confirma tu contraseña:</label>
                <input type='password'  name='user_pass_confirm' onChange={(e) => this.regUserPassConfirm.bind(this)(e)}></input>
                {!this.state.validateAgainPassword && this.state.confirmPass.length > 0 ? <p className='error-message'>La contraseña debe coincidir con la de arriba</p>: ''}
                <button type="button" onClick={this.registerUser.bind(this)} className='accountup-button'>Guardar Cambios</button>
                <button type="button" onClick={this.eliminateUser.bind(this)} className='accountup-delete'>Eliminar Cuenta</button>
            </form>
        )
    }
}

export default InformacionPersonal