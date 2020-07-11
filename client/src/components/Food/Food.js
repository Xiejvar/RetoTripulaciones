import React from 'react'
import './Food.css'

class Food extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <section className='food-section'>
                <img src='images/restaurant.jpg' alt={this.props.restaurants.nombre} className='food-section-img'></img>
                <p>{this.props.restaurants.tipo_local}</p>
                <p>{this.props.restaurants.nombre}</p>
                <p>{this.props.restaurants.direccion}</p>
            </section>
        )
    }
}



export default Food