import React, { Component } from 'react';
import './NotFound.css'

class NotFound extends Component{
    constructor(){
        super()

    }

    hideModal(){
        console.log('hola')
        this.props.show(false)
    }
    render(){
        return(
            <section className='notfound'>
                <article className='notfound-article'>
                    <img src='/images/notfound1.png' alt='notfound' className='notfound-image' />
                    <article className='notfound-pcontainer'>
                        <p className='notfound-p'>La búsqueda no obtuvo ningún resultado.</p>
                        <p className='notfound-p'>Comprueba que las palabras están escritas correctamente, o prueba a realizar otra búsqueda</p>
                        <p className='notfound-plink' onClick={this.hideModal.bind(this)}>Volver a la página de búsqueda</p>
                    </article>
                </article>
            </section>
        )
    }
}

export default NotFound