import React from 'react'
import './Food.css'

class Food extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <section className='food-section'>
                {/* <img src={this.props.restaurants.image}></img> */}
                <p>{this.props.restaurants.tipo_local}</p>
                <p>{this.props.restaurants.nombre}</p>
                <p>{this.props.restaurants.direccion}</p>
            </section>
        )
    }
}



export default Food