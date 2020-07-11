import React from 'react'




class Food extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <section>
                <img src={this.props.restaurants.image}></img>
                <p>{this.props.restaurants.local}</p>
                <p>{this.props.restaurants.name}</p>
                <p>{this.props.restaurants.address}</p>
            </section>
        )
    }
}



export default Food