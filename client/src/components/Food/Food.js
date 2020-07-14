import React from 'react'
import './Food.css'

class Food extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <section className='food-section'>
                <img src='images/restaurant.jpg' alt={this.props.restaurants.nombre} className='food-section-img' />
                <p className='food-section-tipo'>{this.props.restaurants.tipo_local}</p>
                <p className='food-section-name'>{this.props.restaurants.nombre}</p>
                <p className='food-section-address'>{this.props.restaurants.direccion}</p>
            </section>
        )
    }
}

export default Food