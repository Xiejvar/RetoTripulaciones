import React, { Component } from 'react'
import VerificationContext from '../../contexts/verificationToken'
import './InformacionPersonal.css'

class InformacionPersonal extends Component{
    static contextType = VerificationContext

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

    componentDidMount(){
        console.log(this.context.tok)
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
       fetch('http://localhost:1024/informPersonal', {
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
           console.log(res)
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
           console.log(res)
       })
    }

    render(){
        return(
            <form className='accountForm' onSubmit={(e) => this.prevSubmit.bind(this)(e)}>
                <div className='accountForm-diver'>
                    <h2 className='accountInfo'>Informacion Personal</h2>
                    <img src='/images/Exit.svg' alt='cross-logo'  className='account-personal-cross' onClick={this.props.history.goBack}/>
                </div>
                <label>Tu nombre:</label>
                <input type='text' id='name' name='user_name' onChange={(e) => this.regUserName.bind(this)(e)}></input>

                <label>Tus apellidos:</label>
                <input type='text' id='lastName' name='last_name' onChange={(e) => this.regUserSurNam.bind(this)(e)}></input>
                <div className='accountupBirth'>
                    <label>Tu fecha de nacimiento:</label>
                    <input type='number' name='user_day' onChange={(e) => this.regUserDay.bind(this)(e)} className='accountupBirth-day' ></input>
                    <input type='number' name='user_month' onChange={(e) => this.regUserMonth.bind(this)(e)} className='accountupBirth-month' ></input>
                    <input type='number' name='user_year' onChange={(e) => this.regUserYear.bind(this)(e)} className='accountupBirth-year' ></input>
                </div>

                <label>Correo:</label>
                <input type='email' id='mail' name='user_email' onChange={(e) => this.regUserEmail.bind(this)(e)}></input>

                <label>Tu contraseña:</label>
                <input type='password'  name='user_pass' onChange={(e) => this.regUserPass.bind(this)(e)}></input>

                <label>Confirma tu contraseña:</label>
                <input type='password'  name='user_pass_confirm' onChange={(e) => this.regUserPassConfirm.bind(this)(e)}></input>

                <button type="button" onClick={this.registerUser.bind(this)} className='accountup-button'>Guardar Cambios</button>
                <button type="button" onClick={this.eliminateUser.bind(this)} className='accountup-delete'>Eliminar Cuenta</button>
            </form>
        )
    }
}

export default InformacionPersonal