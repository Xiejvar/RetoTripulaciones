import React, { Component } from 'react';
import './Search.css'
import Filters from '../Filters/Filters'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            filter: false
        }
    }

    searchValue(e){
        this.props.searchValue(e.target.value)
    }

    putFilters(){
        this.setState({
            ...this.state,
            filter: true
        })
    }

    closePopUp(val){
        this.setState({
            ...this.state,
            filter: val
        })
    }

    render(){
        return(
            <>
                <section className='section-search'>
                    <input type='search' id='search' name='search_made' placeholder='Busca restaurante, tipos de comida...' className='home-search' onChange={this.searchValue.bind(this)} />
                    <button className='button-loop' type='submit'></button>
                    <button className='button-filter' onClick={this.putFilters.bind(this)}></button>
                </section>
                {this.state.filter ? <Filters close={this.closePopUp.bind(this)}/> : ''}
            </>
        )
    }
}

export default Search