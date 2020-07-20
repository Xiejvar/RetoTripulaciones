import React, { Component } from 'react';
import './Search.css'

class Search extends Component {
    constructor(props){
        super(props)
    }

    searchValue(e){
        this.props.searchValue(e.target.value)
    }

    render(){
        return(
            <input type='search' id='search' name='search_made' placeholder='Busca restaurante, tipos de comida...' className='home-search' onChange={this.searchValue.bind(this)} />
        )
    }
}

export default Search