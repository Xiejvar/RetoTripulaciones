import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FoodList from '../FoodList/FoodList'
import Search from '../Search/Search'
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import './Home.css'
import RestaurantContext from '../../contexts/findRestaurants'

class Home extends Component {
    static contextType = RestaurantContext
    constructor(){
        super()
        this.state = {
            restaurantsTerr: undefined,
            restaurantsSafe: undefined,
            restaurantsClose: undefined,
            showTerr: false,
            showSafe: false,
            showClose: false,
            loader: true,
            foodlistLength: [...Array(3)],
            restaurantsSearch: [],
            filters: undefined,
            value: undefined,
            rangeValue: undefined
        }
    }

    componentDidMount(){
        this.putRestaur()
    }

    componentDidUpdate(prevP,prevS){
        if(this.state.showTerr && this.state.showSafe && this.state.showClose && this.state.loader){
            this.setState({
                ...this.state,
                loader: false
            })
        }
        if(prevS.filters !== this.state.filters || prevS.rangeValue !== this.state.rangeValue){
            this.fetchValue()
        }
    }

    async putRestaur(){
        let res = await fetch('http://localhost:1024/foodListTerraza')
        let dataTerr = await res.json()
        let res2 = await fetch('http://localhost:1024/foodListSeguro')
        let dataSeg = await res2.json()
        this.setState({
            ...this.state,
            showSafe: true,
            showTerr: true,
            restaurantsSafe: dataSeg,
            restaurantsTerr: dataTerr
        })
        this.getPosition()
    }

   async getPosition(){
        let lat,lon;
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude
                lon = position.coords.longitude
                fetch(`http://localhost:1024/cercaDeMI/${lat}/${lon}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.valid)
                        this.setState({
                            ...this.state,
                            showClose: true,
                            restaurantsClose: data.nearRestaurants
                        })
                    else
                        this.setState({
                            ...this.state,
                            restaurantsClose: [],
                            showClose: true
                        })
                })
            })
        }else{
            this.setState({
                ...this.state,
                restaurantsClose: [],
                showClose: true
            })
        }
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
        let array = this.state.restaurantsClose
        this.setState({
            ...this.state,
            restaurantsClose: undefined
        })
        return array
    }

    submitingSearch(e){
        e.preventDefault()
        this.fetchValue()
    }

    async fetchValue(){
        let val = this.state.value;
        let filter = this.state.filters;
        let range= this.state.rangeValue;
        if(val == undefined && filter == undefined && range == undefined)
            console.log(val,filter)
        else
            console.log(val)
            fetch('http://localhost:1024/searcher', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                        name : val,
                        filters: filter,
                        rangeValue: range
                    })
            }).then(res => res.json())
            .then(datos => {
                if(datos.valid){
                    this.context.handleRestaurants(datos.response)
                    this.props.history.push('/map')
                }
            })
    }

    getValue(value){
        this.setState({...this.state, value})
    }

    addFilters(value){
        this.setState({...this.state, filters: value.fin, rangeValue: value.rang})
    }

    render(){
        return(
            <div className='home'>
                <Header />
                <h2 className='home-title'>Encuentra restaurantes donde sentirte seguro</h2>
                
                <form className='home-searchForm' onSubmit={this.submitingSearch.bind(this)}>
                    <Search filtss={this.addFilters.bind(this)} searchValue={this.getValue.bind(this)} history={this.props.history} />
                </form>
                {this.state.showTerr && this.state.showSafe && this.state.showClose ? '' : <Loader color='#11215f' type='Oval'/>}
                {this.state.loader && this.state.showSafe ? '' : <FoodList getResta={this.state.restaurantsSafe !== undefined}  addResta={this.getRestaurantsSafe.bind(this)} title={'Los mas seguros segun los usuarios'} history={this.props.history}/>}
                {this.state.loader && this.state.showTerr ? '' : <FoodList getResta={this.state.restaurantsTerr !== undefined}  addResta={this.getRestaurantsTerr.bind(this)} title={'Terrazas'} history={this.props.history}/>}
                {this.state.loader ? '' : <FoodList getResta={this.state.restaurantsClose !== undefined}  addResta={this.getRestaurantsClos.bind(this)} title={'Cerca de ti'} history={this.props.history}/>}
                <article className='home-info'>
                    <h2 className='home-info-titles'>Toda la información para ayudarte a cuidar a los tuyos</h2>
                    <section className='home-info-imagenes'>
                        <img src='images/escuditosHome.svg' alt='logo-seguridad' />
                        <img src='images/escuditosHome.svg' alt='logo-seguridad' />
                        <img src='images/escuditosHome.svg' alt='logo-seguridad' />
                        <img src='images/escuditosHome.svg' alt='logo-seguridad' />
                        <img src='images/escuditosHome.svg' alt='logo-seguridad' />
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