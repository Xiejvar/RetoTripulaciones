import React, { Component } from 'react';
import './Search.css'
import Filters from '../Filters/Filters'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            filter: false,
            arrFilt: undefined
        }
    }

    componentDidUpdate(){
        if(this.props.selectedFil){
            this.setState({
                ...this.state,
                arrFilt: this.props.getFilters()
            })
        }
    }

    searchValue(e){
        this.props.searchValue(e.target.value)
    }

    putFilters(e){
        e.preventDefault()
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

    valvalid(val){
        this.props.filtss(val)
        this.setState({...this.state, filter: false})
    }

    getAllFilts(){
        let filts = this.state.arrFilt
        this.setState({
            ...this.state,
            arrFilt: undefined
        })
        return filts
    }

    render(){
        return(
            <>
                <section className='section-search'>
                    <input type='search' id='search' name='search_made' placeholder='Busca restaurante, tipos de comida...' className='home-search' onChange={this.searchValue.bind(this)} />
                    <button className='button-loop' type='submit'></button>
                    <button className='button-filter' onClick={this.putFilters.bind(this)}></button>
                </section>
                {this.state.filter ? <Filters vals={this.valvalid.bind(this)} close={this.closePopUp.bind(this)} setFilts={this.state.arrFilt !== undefined}  getFilts={this.getAllFilts.bind(this)}/> : ''}
            </>
        )
    }
}

export default Search