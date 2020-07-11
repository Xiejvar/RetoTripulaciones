import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

class Home extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <h1>Hola es el home</h1>
                <Footer />
            </div>
        )
    }
}

export default Home