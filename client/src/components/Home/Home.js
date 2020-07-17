import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FoodList from '../FoodList/FoodList'
import Search from '../Search/Search'

import './Home.css'
class Home extends Component {
    constructor(){
        super()
        this.state = {
            restaurantsTerr: [],
            restaurantsSafe: [],
            restaurantsClose: []
        }
    }

    componentDidMount(){
        this.putRestaur()
    }

    async putRestaur(){
        let res = await fetch('http://localhost:1024/foodListTerraza')
        let dataTerr = await res.json()

        let res2 = await fetch('http://localhost:1024/foodListSeguro')
        let dataSeg = await res2.json()
        
        // let res3 = await fetch('http://localhost:1024/foodListCercaDeMi')
        // let dataCerca = await res3.json()

        this.setState({
            ...this.state,
            restaurantsClose: dataSeg,
            restaurantsSafe: dataSeg,
            restaurantsTerr: dataTerr
        })
    }

    getRestaurantsTerr(){
        let array = this.state.restaurantsTerr
        this.setState({
            ...this.state,
            restaurantsTerr: undefined
        })
        return array
    }

    getRestaurantsSafe(){
        let array = this.state.restaurantsSafe
        this.setState({
            ...this.state,
            restaurantsSafe: undefined
        })
        return array
    }

    getRestaurantsClos(){
        let array = this.state.restaurantsSafe
        this.setState({
            ...this.state,
            restaurantsClose: undefined
        })
        return array
    }

    submitingSearch(e){
        e.preventDefault()
        this.props.history.push('/map')
    }

    render(){
        return(
            <div className='home'>
                <Header />
                <h2 className='home-title'>Encuentra restaurantes donde sentirte seguro</h2>
                <form className='home-searchForm' onSubmit={this.submitingSearch.bind(this)}>
                    <Search history={this.props.history}/>
                </form>
                <FoodList getResta={this.state.restaurantsSafe !== undefined}  addResta={this.getRestaurantsSafe.bind(this)} title={'Los mas seguros segun los usuarios'} history={this.props.history}/>
                <FoodList getResta={this.state.restaurantsTerr !== undefined}  addResta={this.getRestaurantsTerr.bind(this)} title={'Terrazas'} history={this.props.history}/>
                <FoodList getResta={this.state.restaurantsClose !== undefined}  addResta={this.getRestaurantsClos.bind(this)} title={'Cerca de ti'} history={this.props.history}/>
                <article className='home-info'>
                    <h2 className='home-info-titles'>Toda la información para ayudarte a cuidar a los tuyos</h2>
                    <section className='home-info-imagenes'>
                        <img src='images/escuditos.svg' alt='logo-seguridad' />
                        <img src='images/escuditos.svg' alt='logo-seguridad' />
                        <img src='images/escuditos.svg' alt='logo-seguridad' />
                        <img src='images/escuditos.svg' alt='logo-seguridad' />
                        <img src='images/escuditos.svg' alt='logo-seguridad' />
                        <h5 className='home-info-titles-h5'>Los usuarios valoran si los restaurantes toman las medidas de higiene necesarias</h5>
                    </section>
                    <section className='home-info-imagenes'>
                        <img src='images/informe.png' alt='logo-informe' />
                        <h5 className='home-info-titles-h5'>Te informamos de los restaurantes que han recibido sanciones recientemente</h5>
                    </section>
                    <section className='home-info-imagenes'>
                        <img src='images/virus.png' alt='logo-virus' />
                        <h5 className='home-info-titles-h5'>Actualizamos semanalmente el número de contagiados por COVID-19 en el barrio del restaurante que te interese</h5>
                    </section>
                </article>
                <Footer />
            </div>
        )
    }
}

export default Home