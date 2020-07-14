import React, { Component } from 'react';
import './Search.css'

class Search extends Component {
    render(){
        return(
            <input type='search' id='search' name='search_made' placeholder='Busca restaurante, tipos de comida...' className='home-search'/>
        )
    }
}

export default Search