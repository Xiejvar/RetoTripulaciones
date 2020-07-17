import React, { Component } from 'react';
import './RecuperaPass.css'

class RecuperaPass extends Component{
    constructor(){
        super()
        this.state = {
            email: ''
        }
    }
    getEmail(e){
        this.setState({
            ...this.state,
            email: e.target.value
        })
    }
    sendEmailPass(){
        console.log(this.state.email)
    }

    render(){
        return(
            <section className='recuperaPass'>
                <img src='/images/Exit.svg' alt='exit' className='crossImage' onClick={this.props.history.goBack}/>
                <h3>¿Has olvidado la contraseña?</h3>
                <p>Introduce tu email para restablecer la contraseña</p>
                <input type='text' name='recuperarPass' onChange={this.getEmail.bind(this)}/>
                <button onClick={this.sendEmailPass.bind(this)}>Restablecer</button>
            </section>
        )
    }
}

export default RecuperaPass