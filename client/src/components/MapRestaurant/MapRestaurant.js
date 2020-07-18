import React, { Component } from 'react';
import './MapRestaurant.css'

class MapRestaurant extends Component{
    constructor(props){
        super(props)
        this.state = {
            shields: []
        }
    }
    componentDidMount(){
        this.setState({
            ...this.state,
            shields: [...Array(parseInt(this.props.item.valoracion_global))]
        })
    }
    render(){
        return(
            <article className='restaurantMapSliderArticle'>
                <img src='/images/restaurant.jpg' alt={this.props.item.name} />
                <section className='restaurantMapInfo'>
                    <p className='type_food'>{this.props.item.desc_epigrafe}</p>
                    <p className='name_food'>{this.props.item.nombre_local}</p>
                    <article className='shieldsitosart'>
                        {this.state.shields.map(e => <img src='/images/escuditoCeleste.svg' alt='valoraciones' className='shields-rest'/>)}
                    </article>
                    <p>{this.props.item.calle}</p>
                </section>
            </article>
        )
    }
}
export default MapRestaurant