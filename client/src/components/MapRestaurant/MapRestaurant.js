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

    goToRestaurant(){
        this.props.history.push(`/restaurant/${this.props.item.id_local}`)
    }

    putImage(){
        let num = Math.floor(Math.random() * 14) + 1
        if(num === 13 || num === 5){
            return `/images/rest${num}.jpeg`
        }else {
            return `/images/rest${num}.jpg`
        }
    }

    render(){
        return(
            <article className='restaurantMapSliderArticle' onClick={this.goToRestaurant.bind(this)}>
                <img src={this.putImage()} alt={this.props.item.name} />
                <section className='restaurantMapInfo'>
                    <p className='type_food'>{this.props.item.desc_epigrafe}</p>
                    <p className='name_food'>{this.props.item.nombre_local}</p>
                    <article className='shieldsitosart'>
                        {this.state.shields.map((e,i)=> <img src='/images/escuditoCeleste.svg' alt='valoraciones' className='shields-rest' key={i}/>)}
                    </article>
                    <p className='restaurant_address'>{this.props.item.calle}</p>
                </section>
            </article>
        )
    }
}
export default MapRestaurant