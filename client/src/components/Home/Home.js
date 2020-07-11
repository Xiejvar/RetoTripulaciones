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


    getRestaurants(){
        let array = this.state.restaurants
        this.setState({
            ...this.state,
            restaurants: undefined
        })
        return array
    }

    render(){
        return(
            <div>
                <Header />
                <h2>Encuentra restaurantes donde sentirte seguro</h2>
                <input type='search' id='search' name='search_made' placeholder='Busca restaurante, tipos de comida...' />
                <FoodList getResta={this.state.restaurants !== undefined}  addResta={this.getRestaurants.bind(this)} title={'Los locales mas seguros'}/>
                <FoodList getResta={this.state.restaurants !== undefined}  addResta={this.getRestaurants.bind(this)} title={'Terrazas'}/>
                <FoodList getResta={this.state.restaurants !== undefined}  addResta={this.getRestaurants.bind(this)} title={'Cerca de ti'}/>
                <article className='home-info'>
                    <h2>Toda la información para ayudarte a cuidar a los tuyos</h2>
                </article>
                <Footer />
            </div>
        )
    }
}

export default Home