import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FoodList from '../FoodList/FoodList'

class Home extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    componentDidMount(){
        fetch('http://localhost:1024/foodList')
        .then(res => res.json())
        .then(res => this.setState({
            ...this.state,
            restaurants: res
        }))
    }

    render(){
        return(
            <div>
                <Header />
                <h2>Encuentra restaurantes donde sentirte seguro</h2>
                <input type='search' id='search' name='search_made' placeholder='Busca restaurante, tipos de comida...' />
                <FoodList />
                <FoodList />
                <FoodList />
                <Footer />
            </div>
        )
    }
}

export default Home