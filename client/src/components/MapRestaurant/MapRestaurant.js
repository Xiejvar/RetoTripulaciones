import React, { Component } from 'react';
import './MapRestaurant.css'

class MapRestaurant extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <article className='restaurantMapSliderArticle'>
                <img src='/images/restaurant.jpg' alt={this.props.item.name} />
                <section className='restaurantMapInfo'>
                    <p>Bar Restaurante</p>
                    <p>Nombre del restaurante</p>
                    <p>C/PEZ,18</p>
                </section>
            </article>
        )
    }
}
export default MapRestaurant