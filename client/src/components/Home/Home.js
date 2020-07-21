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
            restaurantsTerr: [],
            restaurantsSafe: [],
            restaurantsClose: [],
            showTerr: false,
            showSafe: false,
            showClose: false,
            loader: true,
            foodlistLength: [...Array(3)],
            restaurantsSearch: []
        }
    }

    componentDidMount(){
        this.putRestaur()
    }

    componentDidUpdate(){
        if(this.state.showTerr && this.state.showSafe && this.state.showClose && this.state.loader){
            this.setState({
                loader: false
            })
        }
    }

    async putRestaur(){
        let res = await fetch('http://localhost:1024/foodListTerraza')
        let dataTerr = await res.json()
        console.log(dataTerr)
        let res2 = await fetch('http://localhost:1024/foodListSeguro')
        let dataSeg = await res2.json()
        console.log(dataSeg)
        this.setState({
            ...this.state,
            restaurantsSafe: dataSeg,
            restaurantsTerr: dataTerr,
            showSafe: true,
            showTerr: true
        })
        this.getPosition()
    }

   async getPosition(){
        let lat,lon;
        if('geolocation' in navigator){
            navigator.geolocation.watchPosition((position) => {
                lat = position.coords.latitude
                lon = position.coords.longitude
                console.log(lat,lon,'hola')
                fetch(`http://localhost:1024/cercaDeMI/${lat}/${lon}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.valid)
                        this.setState({
                            ...this.state,
                            restaurantsClose: data.nearRestaurants,
                            showClose: true,
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
        this.fetchValue(this.state.value)
    }

    async fetchValue(val){
        
        let res = await fetch(`http://localhost:1024/searcher?name=${val}`)
        let datos = await res.json()

        if(datos.valid){
            this.context.handleRestaurants(datos.response)
            this.props.history.push('/map')
        }
    }

    getValue(value){
        this.setState({...this.state, value})
    }


    render(){
        return(
            <div className='home'>
                <Header />
                <h2 className='home-title'>Encuentra restaurantes donde sentirte seguro</h2>
                
                <form className='home-searchForm' onSubmit={this.submitingSearch.bind(this)}>
                    <Search searchValue={this.getValue.bind(this)} history={this.props.history}/>
                </form>
                {this.state.showTerr && this.state.showSafe && this.state.showClose ? '' : <Loader color='#11215f' type='Oval'/>}
                {this.state.loader && this.state.showSafe ? '' : <FoodList getResta={this.state.restaurantsSafe !== undefined}  addResta={this.getRestaurantsSafe.bind(this)} title={'Los mas seguros segun los usuarios'} history={this.props.history}/>}
                {this.state.loader && this.state.showTerr ? '' : <FoodList getResta={this.state.restaurantsTerr !== undefined}  addResta={this.getRestaurantsTerr.bind(this)} title={'Terrazas'} history={this.props.history}/>}
                {this.state.loader  ? '' : <FoodList getResta={this.state.restaurantsClose !== undefined}  addResta={this.getRestaurantsClos.bind(this)} title={'Cerca de ti'} history={this.props.history}/>}
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