import React, { Component } from 'react';

class FoodList extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <section className='foodList'>
                <h3>{this.props.title}</h3>
                {}
            </section>  
        )
    }
}

export default FoodList