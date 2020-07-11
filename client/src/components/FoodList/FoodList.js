import React, { Component } from 'react';
import Food from '../Food/Food'

class FoodList extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <section className='foodList'>
                <h3>{this.props.title}</h3>
                {Array.map(ele => <Food restaurants={ele} />)}
            </section>  
        )
    }
}

export default FoodList