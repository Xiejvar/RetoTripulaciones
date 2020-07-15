import React from 'react'
import './Food.css'

class Food extends React.Component{
    constructor(props) {
        super(props);
    }

    goToRestaurant(){
        this.props.history.push(`/restaurant/${this.props.restaurants.id_local}`)
    }
    
    render(){
        return(
            <section className='food-section' onClick={this.goToRestaurant.bind(this)}>
                <img src='images/restaurant.jpg' alt={this.props.restaurants.nombre} className='food-section-img' />
                <p className='food-section-tipo'>{this.props.restaurants.tipo_local}</p>
                <p className='food-section-name'>{this.props.restaurants.nombre}</p>
                <p className='food-section-address'>{this.props.restaurants.direccion}</p>
            </section>
        )
    }
}

export default Food